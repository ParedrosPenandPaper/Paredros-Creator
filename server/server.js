'use strict'

const express = require('express')
const app = express()
const port = 80;

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://paredros-creator-db:27017'
const dbName = 'paredrosCreatorDb'
const collName = 'adventures'

app.use(express.static(__dirname + '/dist'))

app.get('/mongo', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true})
    .then(client => {
        let db = client.db(dbName)
        let coll = db.collection(collName)
        let adventures = coll.find({}).toArray
        res.status(200).send(adventures)
    })
    .catch(err => res.status(400).send('failed: ' + err))
})

app.listen(port, () => {
    console.log('paredros creator running on port ' + port)
})
