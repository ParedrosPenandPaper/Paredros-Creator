export {blankAdventure}

function blankAdventure() {
    return [{adventure: 'newAdventure'}, new Chapter()]
}

export { chapterLabel, Chapter }

const chapterLabel = 'CH';
function Chapter() {
    this.title = '';
    this.children = [];
    this.content = [];
    this.paths = [];
    this.text = ''
}

export { sceneLabel, Scene }

const sceneLabel = 'SC';
function Scene() {
    this.title = '';
    this.text = ''
}