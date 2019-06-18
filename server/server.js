'use strict'

const express = require('express')
const app = express()
const port = 80;

const MongoClient = require('mongodb').MongoClient
const dbConn = 'mongodb://paredros-creator-db:27017/paredrosCreatorDb'

app.use(express.static(__dirname + '/dist'))

app.get('/mongo', (req, res) => {
    MongoClient.connect(dbConn, {useNewUrlParser: true})
    .then(db => {
        res.status(200).send('db request received: ' + db)
    })
    /*
        db.collection('adventures').find({})
        .then(result => {
            db.close()
            res.status(200).send(result)
        })
        .catch(err => {
            db.close()
            res.status(400).send(err)
        })
    })
    .catch(err => {
        db.close()
        res.status(400).send(err)
    })*/
})

app.listen(port, () => {
    console.log('paredros creator running on port ' + port)
})
