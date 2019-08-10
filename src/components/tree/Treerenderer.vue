<template>
    <div class="tree-renderer-container">
        <svg class="canvas" width="100%" height="100%">
            <g class="tree">
                <g class="links"></g>
                <g class="chapters"></g>
                <g class="paths"></g>
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

                d3.select('svg').attr('width', svgWidth)
                d3.select('svg').attr('height', svgHeight)

                // das Datenformat doch trennen wegen render reasons bzw funktionen schreiben die Teile extrahieren
                var root = d3.hierarchy(this.adventure)
                var treeLayout = d3.tree()
                treeLayout.size([svgWidth, svgHeight - 4*chapterRadius])
                treeLayout(root)


                d3.select('svg g.chapters')
                    .selectAll('circle.chapter')
                    .data(root.descendants())
                    .enter()
                    .append('circle')
                    .classed('chapter', true)
                    .attr('cx', function(d) {return d.x})
                    .attr('cy', function(d) {return d.y})
                    .attr('r', chapterRadius)


                d3.select('svg g.links')
                    .selectAll('line.link')
                    .data(root.links())
                    .enter()
                    .append('line')
                    .classed('link', true)
                    .attr('x1', function(d) {return d.source.x;})
                    .attr('y1', function(d) {return d.source.y;})
                    .attr('x2', function(d) {return d.target.x;})
                    .attr('y2', function(d) {return d.target.y;});

                d3.select('svg g.tree').attr('transform', `translate(0,${2*chapterRadius})`)

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

                drawScenes(parent, child){
                    if (child.scenes){
                        for(i = 0; i < child.scenes.length; i++){
                            let path = child.scenes[i]
                            drawPath(child, path, parent, i)
                        }
                    }
                }

                drawPath(child, path, parent, i){
                    const sourceV = {x: parent.x, y: parent.y}
                    const targetV = {x: child.x, y: child.y}
                    const distanceVector = vSub(targetV, sourceV)
                    const vStep = vScale(distanceVector, 1/3)
                    const distance = length(distanceVector)
                    let pathString;

                    if(i == 0) pathString = `M ${sourceX} ${sourceY} L ${targetX} ${TargetY}`
                    
                    else{
                        if (i % 2 == 0) i = -(i-1)
                        
                        vC = vScale(vOrthNorm(vStep), i*0.2*distance)
                        let C1 = sourceV + vStep + vC
                        let C2 = sourceV + vScale(vStep, 2) + vC

                        pathString = `M ${sourceX} ${sourceY} C ${C1.x} ${C1.y}, ${C2.x} ${C2.y}, ${targetX} ${TargetY}`
                    }

                    d3.select('svg g.scenes')
                        .append('path')
                            .attr('d', pathString)

                    let svg = d3.select('svg g.paths')
                    for(j = 0; j < path.length; i++){

                    }
                }
            }
        }
    }

    vOrthNorm(v){
        hyp = length(v)
        return {
            x: -(v.y/hyp),
            y: v.x/hyp
        }
    }

    vScale(v, s){
        return {x: v.x*s, y: v.y*s}
    }

    vAdd(v1, v2){
        return {x: v1.x+v2.x, y: v1.y+v2.y}
    }

    vSub(v1, v2){
        return {x: v1.x-v2.x, y: v1.y-v2.y}
    }

    distance(p1, p2){
        vDist = {x: (p1.x-p2.x), y:(p1.y-p2.y)}
        return length(vDist)
    }

    length(v){
        return Math.sqrt(vDist.x**2 + vDist.y**2)
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
        stroke-width: 1px;
    }
</style>