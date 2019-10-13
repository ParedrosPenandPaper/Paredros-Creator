export {blankAdventure}

function blankAdventure(title='newAdventure', author='anonymous') {
    return [
        // TODO: outsource into own class
        {
            adventure: title,
            creationDate: new Date(),
            author: author
        }, 
        new Chapter()
    ]
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

export { characterLabel, Character}

const characterLabel = 'NPC'

function Character(name='new character', text='a new npc enters the world') {
    this.name = name
    this.text = text
}