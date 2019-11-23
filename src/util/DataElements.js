const ObjectID = require("bson-objectid")

export {Adventure}

function Adventure(title='newAdventure', author='anonymous') {
    this._id  = ObjectID().toHexString()
    this.meta = 
        {
            title: title,
            creationDate: new Date(),
            author: author
        }
    this.story = new Chapter()
    this.data  = {
        characters: [],
        locations:  [],
        items:      []
    }
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

function Scene(title='new scene', text='lorem ipsum ...', content=[]) {
    this.title = title
    this.text = text
    this.content = content
}

export { characterLabel, Character}

const characterLabel = '👤'//'💂🏻‍♂'

function Character(name='new character', text='a new npc enters the world', hitPoints=0) {
    this._id = ObjectID().toHexString()
    this.name = name
    this.text = text
    this.hitPoints = hitPoints
}

export { locationLabel, Location}

const locationLabel = '🏰'

function Location(name='new location', text='this is a strange site') {
    this._id = ObjectID().toHexString()
    this.name = name
    this.text = text
}

export { itemLabel, Item }

const itemLabel = '🗝️️️'

function Item(name='new item', text='this is a rare item') {
    this._id = ObjectID().toHexString()
    this.name = name
    this.text = text
}