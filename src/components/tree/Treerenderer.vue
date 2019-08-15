<template>
    <div class="tree-renderer-container">
        <svg class="canvas" width="100%" height="100%">
            <g class="tree">
                <g class="links"></g>
                <g class="chapters"></g>
                <g class="scenes"></g>
            </g>
            <g class="adventure"></g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

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
                // length constants
                const svgWidth = d3.select('div.tree-renderer-container').style('width').replace('px', '')
                const svgHeight = d3.select('div.tree-renderer-container').style('height').replace('px', '')
                const chapterRadius = 14
                const sceneRadius = chapterRadius / 2
                const treeScaleFactor = 0.60

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

                    const distanceVector = vSub(targetV, sourceV)
                    const distance = length(distanceVector)
                    const vStep = vScale(distanceVector, 1/3)
                    
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
                            
                            let vC = vScale(vOrthNorm(vStep), pathIndex*0.2*distance)
                            let C1 = vAdd(vAdd(sourceV, vStep), vC)
                            let C2 = vAdd(vAdd(sourceV, vScale(vStep, 2)), vC)

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

                                svgScenes.append('circle')
                                    .attr('cx', sceneCoords.x)
                                    .attr('cy', sceneCoords.y)
                                    .attr('r', sceneRadius)
                            }
                        }
                    }
                }

                function positionTree(){
                    d3.select('svg g.tree').attr('transform', `translate(0,${2*chapterRadius})`)
                }

                function addEventHandlers(){
                    d3.selectAll('svg g.chapters circle')
                        .on('dragenter', function () {
                            d3.select(this)
                                .attr('r', 25)
                                .style("fill", "red")
                        })
                        .on('dragleave', function () {
                            d3.select(this)
                                .attr('r', 14)
                                .style("fill", "steelblue")
                        })
                }
            }
        }
    }

    function vOrthNorm(v){
        let hyp = length(v)
        return {
            x: -(v.y/hyp),
            y: v.x/hyp
        }
    }

    function vScale(v, s){
        return {x: v.x*s, y: v.y*s}
    }

    function vAdd(v1, v2){
        return {x: v1.x+v2.x, y: v1.y+v2.y}
    }

    function vSub(v1, v2){
        return {x: v1.x-v2.x, y: v1.y-v2.y}
    }

    function length(v){
        return Math.sqrt(v.x**2 + v.y**2)
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

</style>