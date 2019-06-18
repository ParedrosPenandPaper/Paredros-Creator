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
        res.status(200).json(client)
    })
})

app.listen(port, () => {
    console.log('paredros creator running on port ' + port)
})
