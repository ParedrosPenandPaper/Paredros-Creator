var ObjectID = require("bson-objectid")

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

const chapterLabel = '📜';
function Chapter(title='new chapter', children=[], content=[], paths=[], text='lorem ipsum ...') {
    this.title = title
    this.children = children
    this.content = content
    this.paths = paths
    this.text = text
}

export { sceneLabel, Scene }

const sceneLabel = '📃';

function Scene(title='new scene', text='lorem ipsum ...') {
    this.title = title
    this.text = text
}

export { characterLabel, Character}

const characterLabel = '💂🏻‍♂'

function Character(name='new character', text='a new npc enters the world', hitPoints=0) {
    this.objectID = ObjectID().toHexString()
    this.name = name
    this.text = text
    this.hitPoints = hitPoints
}

export { locationLabel, Location}

const locationLabel = '🏰'

function Location(name='new location', text='this is a strange site') {
    this.objectID = ObjectID().toHexString()
    this.name = name
    this.text = text
}

export { itemLabel, Item }

const itemLabel = '🔨'

function Item(name='new item', text='this is a rare item') {
    this.objectID = ObjectID().toHexString()
    this.name = name
    this.text = text
}