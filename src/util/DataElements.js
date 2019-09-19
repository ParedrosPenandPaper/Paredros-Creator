export {blankAdventure}

function blankAdventure() {
    return [{adventure: 'newAdventure'}, new Chapter()]
}

export { chapterLabel, Chapter }

const chapterLabel = 'CH';
function Chapter(title='new chapter', children=[], content=[], paths=[], text='lorem ipsum ...') {
    this.title = title
    this.children = children
    this.content = content
    this.paths = paths
    this.text = text
}

export { sceneLabel, Scene }

const sceneLabel = 'SC';

function Scene(title='new scene', text='lorem ipsum ...') {
    this.title = title
    this.text = text
}
