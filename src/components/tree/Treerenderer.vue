<template>
    <div class="tree-renderer-container">
        <svg class="canvas" width="100%" height="100%">
            <g class="tree">
                <g class="links"></g>
                <g class="chapters" ondragover="return false"></g>
                <g class="scenes" ondragover="return false"></g>
                <g class="labels"></g>
            </g>
            <g class="adventure"></g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import * as math from '../../util/Vectormath.js'
    import * as DataElements from "../../util/DataElements";

    export default {
        computed: {
            adventure() {
                return this.$store.state.adventureObject.story
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
                const svgHeight = d3.select('div.tree-renderer-container').style('height').replace('px', '') - 3 //no clue why these -3 is neede but neccessary to fit....
                const chapterRadius = 20
                const sceneRadius = chapterRadius / 2
                const treeScaleFactor = 1
                const vueComponent = this

                d3.select('svg').attr('width', svgWidth)
                d3.select('svg').attr('height', svgHeight)

                // das Datenformat doch trennen wegen render reasons bzw funktionen schreiben die Teile extrahieren
                var root = d3.hierarchy(this.adventure)
                var treeLayout = d3.tree()
                treeLayout.size([svgWidth, svgHeight - 4*chapterRadius - 32]) // 2em abziehen damit der Knödel nicht drüberhängt
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
                        for(let mapping of vueComponent.$store.state.guiState.collapsedLinks){ // 

                            if(mapping.parent.data === parent.data && mapping.child.data === child.data && mapping.collapsed === true){
                                let collapsedLinkNode = d3.select('svg g.links')
                                    .append('path')
                                        .attr('d', `M ${parent.x} ${parent.y} L ${child.x} ${child.y}`)
                                        .on('click', handleCollapse)
                                        .node()
                                collapsedLinkNode['__data__'] = { parent: parent, child: child }
                            }
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
                                            .style('display', function() {
                                                for(let mapping of vueComponent.$store.state.guiState.collapsedLinks){
                                                    if(mapping.parent.data === parent.data && mapping.child.data === child.data && mapping.collapsed === true) return 'none'
                                                }
                                                return 'inline'
                                            })
                                            .on('click', handleCollapse)
                                            .node()

                    svgLink['__data__'] = { parent: parent, child: child}

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

                            svgLink['__data__']['svgScenes'] = []

                            for(let j = 1; j <= path.length; j++){
                                let sceneCoords = svgLink.getPointAtLength( step * j )

                                let svgScene = svgScenes.append('circle')
                                    .attr('cx', sceneCoords.x)
                                    .attr('cy', sceneCoords.y)
                                    .attr('r', sceneRadius)
                                    .style('display', d3.select(svgLink).style('display'))
                                    .node()

                                svgScene['__data__'] = { path: path, index: j-1, x: sceneCoords.x, y: sceneCoords.y }
                                svgLink['__data__']['svgScenes'].push(svgScene)
                            }
                        }
                    }
                }

                function positionTree(){
                    d3.select('svg g.tree').attr('transform', `translate(0,${3.0*chapterRadius})`)
                }

                function addEventHandlers(){
                    let labelSelection

                    d3.select(window)
                        .on('dragend', function () {
                            vueComponent.$store.commit('resetDragSelection')
                        })

                    // regular events chapter
                    d3.selectAll('svg g.chapters circle')
                        // show title on hover
                        .on('mouseenter', function () {
                            let chapter = d3.select(this)

                            labelSelection = d3.select('svg g.labels')
                                .append('text')
                                .classed('label', true)
                                .text(chapter.datum().data.title)
                                    .attr('x', chapter.datum().x + chapterRadius + 2)
                                    .attr('dy', chapter.datum().y)
                                    .attr('font-familiy', 'Segoe UI')
                                    .node()
                        })
                        .on('mouseleave', function () {
                            d3.select(labelSelection).remove()
                        })
                        // show the context menu for data content elements
                        .on('contextmenu', function () {
                            d3.event.preventDefault()
                            vueComponent.$store.commit('findContent', d3.select(this).datum().data.content)
                            vueComponent.$store.commit('showContent')
                        })
                        // scroll to corresponding editor-panel
                        .on('click', function () {
                            const chapterId = d3.select(this).datum().data.title
                            const panel = document.getElementById(chapterId)
                            const title = panel.getElementsByTagName('p')[0]

                            window.location.href = '#' + chapterId
                            title.focus()
                        })


                    // drag events chapter
                    d3.selectAll('svg g.chapters circle')
                            .on('dragenter', function () {
                                d3.select(this)
                                    .attr('r', chapterRadius*1.5)
                            })
                            .on('dragleave', function () {
                                d3.select(this)
                                    .attr('r', chapterRadius)
                            })
                            .on('drop', function () {
                                let dragSelection = vueComponent.$store.state.currentDragSelection
                                // TODO: Da es jetzt die Selection im store gibt die chapter/scene events bei zeiten refactoren
                                if (dragSelection instanceof DataElements.Chapter) {
                                    vueComponent.$store.commit('addChapterAfter', d3.select(this).datum().data)
                                }
                                if (dragSelection instanceof DataElements.Scene) {
                                    vueComponent.$store.commit('addSceneAfterChapter', d3.select(this).datum())
                                }
                                // TODO: wahrscheinlich selection Mitgeben um Referenz in den Content abzulegen
                                // TODO: diese Events sind für scenes und chapter gleich => ggf auslagern
                                if (dragSelection instanceof DataElements.Character
                                    || dragSelection instanceof DataElements.Location
                                    || dragSelection instanceof DataElements.Item){
                                    vueComponent.$store.commit('setDropTarget', d3.select(this).datum())
                                    let element = document.getElementById('editor').getBoundingClientRect()
                                    vueComponent.$store.commit('setModalPosition', element)
                                    vueComponent.$store.commit('showModal')
                                }
                                d3.select(this)
                                    .attr('r', chapterRadius)
                            })


                    // regular events scenes
                    d3.selectAll('svg g.scenes circle')
                        .on('mouseenter', function () {
                            let sceneNode = d3.select(this)
                            let data = sceneNode.data()[0]


                            labelSelection = d3.select('svg g.labels')
                                .append('text')
                                .classed('label', true)
                                .text(data.path[data.index].title)
                                    .attr('x', data.x + sceneRadius + 2)
                                    .attr('dy', data.y)
                                    .attr('font-familiy', 'Segoe UI')
                                    .node()
                        })
                        .on('contextmenu', function () {
                            d3.event.preventDefault()
                            let sceneNode = d3.select(this)
                            let data = sceneNode.data()[0]
                            vueComponent.$store.commit('findContent', data.path[data.index].content)
                            vueComponent.$store.commit('showContent')
                        })
                        .on('mouseleave', function () {
                            d3.select(labelSelection).remove()
                        })

                    // drag events scenes
                    d3.selectAll('svg g.scenes circle')
                        .on('dragenter', function () {
                            d3.select(this)
                                .attr('r', sceneRadius*1.5)
                        })
                        .on('dragleave', function () {
                            d3.select(this)
                                .attr('r', sceneRadius)
                        })
                        .on('drop', function () {
                            let dragSelection = vueComponent.$store.state.currentDragSelection
                            if (dragSelection instanceof DataElements.Scene) {
                                vueComponent.$store.commit('addSceneAfter', d3.select(this).datum())
                                vueComponent.renderTree()
                            }
                            if (dragSelection instanceof DataElements.Character
                                || dragSelection instanceof DataElements.Location
                                || dragSelection instanceof DataElements.Item){
                                vueComponent.$store.commit('setDropTarget', d3.select(this).datum())
                                let element = document.getElementById('editor').getBoundingClientRect()
                                vueComponent.$store.commit('setModalPosition', element)
                                vueComponent.$store.commit('showModal')
                            }
                            d3.select(this)
                                .attr('r', sceneRadius)
                        })
                }

                function handleCollapse () {
                        let collapsedLinks = vueComponent.$store.state.guiState.collapsedLinks
                        let linkData = d3.select(this).datum()
                        let mapping = collapsedLinks.find(element => element.parent.data === linkData.parent.data && element.child.data === linkData.child.data)
                        
                        let affectedSvgLinks = d3.selectAll('svg g.links path')
                            .filter( function(d) {
                                return d.parent.data === linkData.parent.data && d.child.data === linkData.child.data
                            })

                        if(!mapping || !mapping.collapsed){ // a expanded link has been clicked
                            // make all expanded links and scenes invisible
                            affectedSvgLinks.style('display', 'none')
                            for(let data of affectedSvgLinks.data()){
                                let affectedSvgScenes = data.svgScenes
                                if(affectedSvgScenes) affectedSvgScenes.forEach(svgScene => d3.select(svgScene).style('display', 'none'))
                            }

                            let collapsedLink = d3.select('svg g.links')
                                .append('path')
                                    .attr('d', `M ${linkData.parent.x} ${linkData.parent.y} L ${linkData.child.x} ${linkData.child.y}`)
                                    .on('click', handleCollapse)
                                    .node()
                            collapsedLink['__data__'] = linkData

                            mapping = { parent: linkData.parent, child: linkData.child, collapsed: true }
                            vueComponent.$store.commit('setCollapsedLinks', mapping)
                        }
                        else{ // a collapsed link has been clicked
                            d3.select(this).remove()

                            //redraw
                            affectedSvgLinks.style('display', 'inline')
                            for(let data of affectedSvgLinks.data()){
                                let affectedSvgScenes = data.svgScenes
                                if(affectedSvgScenes) affectedSvgScenes.forEach(svgScene => d3.select(svgScene).style('display', 'inline'))
                            }
                            
                            mapping = { parent: linkData.parent, child: linkData.child, collapsed: false }
                            vueComponent.$store.commit('setExpandedLinks', mapping)
                        }
                    }
            }
        },
        watch: {
            adventure: {
                handler() {
                    this.renderTree()
                },
                deep: true
            }
        }
    }

</script>

<style scoped>

    .tree-renderer-container{
        width: 100%;
        height: 100%;
    }

    .chapters {
        fill: #6c9dc6;
        stroke: black;
    }

    .links {
        fill: none;
        stroke: black;
        stroke-width: 2px;
        stroke-linecap: butt;

        cursor: pointer;
    }

    .scenes {
        fill: #ccc;
        stroke: black;
    }

    .labels {
        background-color: white;
    }

</style>