export { chapterLabel, Chapter }

const chapterLabel = 'CH';
function Chapter(title, children, content, paths, text) {
    this.title = title
    this.children = children
    this.content = content
    this.paths = paths
    this.text = text
}

export { sceneLabel, Scene }

const sceneLabel = 'SC';
function Scene(title, text) {
    this.title = title
    this.text = text
}
