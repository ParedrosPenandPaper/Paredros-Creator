<template>
    <div class="tree-renderer-container">
        <svg class="canvas" width="100%" height="100%">
            <g class="tree">
                <g class="links"></g>
                <g class="chapters"></g>
                <g class="scenes"></g>
                <g class="labels"></g>
            </g>
            <g class="adventure"></g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import * as math from '../../util/Vectormath.js'

    export default {
        computed: {
            adventure() {
                return this.$store.state.adventureObject[1]
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.renderTree()
            })
        },
        methods: {
            renderTree() {
                // clear svg
                d3.selectAll("svg g.chapters > *").remove()
                d3.selectAll("svg g.links > *").remove()
                d3.selectAll("svg g.scenes > *").remove()
                d3.selectAll("svg g.labels > *").remove()

                // length constants
                const svgWidth = d3.select('div.tree-renderer-container').style('width').replace('px', '')
                const svgHeight = d3.select('div.tree-renderer-container').style('height').replace('px', '')
                const chapterRadius = 14
                const sceneRadius = chapterRadius / 2
                const treeScaleFactor = 1
                const vueComponent = this

                d3.select('svg').attr('width', svgWidth)
                d3.select('svg').attr('height', svgHeight)

                // das Datenformat doch trennen wegen render reasons bzw funktionen schreiben die Teile extrahieren
                var root = d3.hierarchy(this.adventure)
                var treeLayout = d3.tree()
                treeLayout.size([svgWidth, svgHeight - 4*chapterRadius])
                treeLayout(root)

                scaleTreeHeight(root.descendants(), treeScaleFactor)

                d3.select('svg g.chapters')
                    .selectAll('circle.chapter')
                    .data(root.descendants())
                    .enter()
                    .append('circle')
                    .classed('chapter', true)
                    .attr('cx', function(d) {return d.x})
                    .attr('cy', function(d) {return d.y})
                    .attr('r', chapterRadius)

                let chapterNodes = d3.selectAll('svg g.chapters circle.chapter').data()
                for (let parentNode of chapterNodes){
                    if(parentNode.children){
                        for (let childNode of parentNode.children){
                            drawScenes(parentNode, childNode)
                        }
                    }
                }

                positionTree()

                addEventHandlers()

                //
                //
                //

                function scaleTreeHeight(nodes, scaleFactor){
                    for (let node of nodes){
                        node.y = node.y * scaleFactor
                    }                
                }

                function drawScenes(parent, child){
                    let paths = child.data.paths
                    if (paths){
                        if(paths.length > 0){
                            if(paths.length % 2 == 0){
                                for(let i = 1; i <= paths.length; i++){
                                    let path = paths[i - 1]
                                    drawPath(child, path, parent, i)
                                }
                            }
                            else{
                                for(let i = 0; i < paths.length; i++){
                                    let path = paths[i]
                                    drawPath(child, path, parent, i)
                                }
                            }
                        }
                        else{
                            drawPath(child, null, parent, 0)
                        }
                    }
                }

                function drawPath(child, path, parent, pathIndex){
                    const sourceV = {x: parent.x, y: parent.y}
                    const targetV = {x: child.x, y: child.y}

                    const distanceVector = math.vSub(targetV, sourceV)
                    const distance = math.length(distanceVector)
                    const vStep = math.vScale(distanceVector, 1/3)
                    
                    let pathString = pathGeometryCubicBezier(sourceV, targetV, pathIndex)

                    let svgLink =  d3.select('svg g.links')
                                        .append('path')
                                            .attr('d', pathString)
                                            .node()

                    let svgScenes = d3.select('svg g.scenes')
                    drawEvenDistributedScenes(svgScenes, svgLink, path)

                    function pathGeometryCubicBezier(sourceV, targetV, pathIndex){
                        if(pathIndex == 0) pathString = `M ${sourceV.x} ${sourceV.y} L ${targetV.x} ${targetV.y}`
                        
                        else{
                            if (pathIndex % 2 == 0) pathIndex = -(pathIndex-1)
                            
                            let vC = math.vScale(math.vOrthNorm(vStep), pathIndex*0.2*distance)
                            let C1 = math.vAdd(math.vAdd(sourceV, vStep), vC)
                            let C2 = math.vAdd(math.vAdd(sourceV, math.vScale(vStep, 2)), vC)

                            pathString = `M ${sourceV.x} ${sourceV.y} C ${C1.x} ${C1.y}, ${C2.x} ${C2.y}, ${targetV.x} ${targetV.y}`
                        }

                        return pathString                    
                    }

                    function drawEvenDistributedScenes(svgScenes, svgLink, path){
                        if(path){
                            const pathLength = svgLink.getTotalLength()
                            const step = pathLength / (path.length + 1)

                            for(let j = 1; j <= path.length; j++){
                                let sceneCoords = svgLink.getPointAtLength( step * j )

                                let circle = svgScenes.append('circle')
                                    .attr('cx', sceneCoords.x)
                                    .attr('cy', sceneCoords.y)
                                    .attr('r', sceneRadius)
                                    .node()

                                circle["__data__"] = { path: path, index: j-1, x: sceneCoords.x, y: sceneCoords.y }
                            }
                        }
                    }
                }

                function positionTree(){
                    d3.select('svg g.tree').attr('transform', `translate(0,${2*chapterRadius})`)
                }

                function addEventHandlers(){
                    let tmp

                    d3.selectAll('svg g.chapters circle')
                        .on('dragenter', function () {
                            d3.select(this)
                                .attr('r', 25)
                                .style("fill", "red")
                        })
                        .on('dragleave', function () {
                            d3.select(this)
                                .attr('r', 14)
                                .style('fill', 'steelblue')
                        })
                        .on('mouseenter', function () {
                            let chapter = d3.select(this)

                            tmp = d3.select('svg g.labels')
                                .append('text')
                                .classed('label', true)
                                .text(chapter.datum().data.title)
                                    .attr('x', chapter.datum().x + chapterRadius + 2)
                                    .attr('dy', chapter.datum().y)
                                    .attr('font-familiy', 'Segoe UI')
                                    .node()
                        })
                        .on('mouseleave', function () {
                            d3.select(tmp).remove()
                        })
                        .on('click', function () {
                            vueComponent.$store.commit('addChapterAfter', d3.select(this).data()[0].data)
                            vueComponent.renderTree()
                    })

                    
                    d3.selectAll('svg g.scenes circle')
                        .on('mouseenter', function () {
                            let sceneNode = d3.select(this)
                            let data = sceneNode.data()[0]

                            tmp = d3.select('svg g.labels')
                                .append('text')
                                .classed('label', true)
                                .text(data.path[data.index].title)
                                    .attr('x', data.x + sceneRadius + 2)
                                    .attr('dy', data.y)
                                    .attr('font-familiy', 'Segoe UI')
                                    .node()
                        })
                        .on('mouseleave', function () {
                            d3.select(tmp).remove()
                        })
                        .on('click', function () {
                            vueComponent.$store.commit('addSceneAfter', d3.select(this).data()[0])
                            vueComponent.renderTree()
                        })
                }
            }
        }
    }

</script>

<style scoped>
    .tree-renderer-container{
        width: 100%;
        height: 100%;
    }

    .canvas{
    }
    .chapters {
        fill: steelblue;
        stroke: black;
    }

    .links {
        fill: none;
        stroke: #ccc;
        stroke-width: 3px;
    }

    .scenes {
        fill: #ccc;
        stroke: black;
    }

    .labels {
        background-color: white;
        font-family: 'Segoe UI';
    }

</style>