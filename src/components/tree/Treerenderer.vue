<template>
    <div class="tree-renderer-container">
        <svg class="canvas" viewBox="0 0 100 137,4882918">
            <g transform="translate(30,80)">
                <g class="links"></g>
                <g class="chapters"></g>
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
                // das Datenformat doch trennen wegen render reasons bzw funktionen schreiben die Teile extrahieren
                var root = d3.hierarchy(this.adventure)
                var treeLayout = d3.tree()
                treeLayout.size([100,600])
                treeLayout(root)


                d3.select('svg g.chapters')
                    .selectAll('circle.chapter')
                    .data(root.descendants())
                    .enter()
                    .append('circle')
                    .classed('chapter', true)
                    .attr('cx', function(d) {return d.x})
                    .attr('cy', function(d) {return d.y})
                    .attr('r', 14)


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


                d3.select('svg g.chapters')
                    .selectAll('circle')
                    .on('dragover', function () {
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
</script>

<style scoped>
    .tree-renderer-container{
        width: 100%;
        height: 100%;
    }

    .canvas{
        width:90%;
        height:90%;

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