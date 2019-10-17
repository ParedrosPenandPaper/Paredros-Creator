'use strict'

const express = require('express')
const app = express()
const port = 80;

app.use(express.static(__dirname + '/dist'))

app.get('/getTestAdventure', (req, res) => {
    res.redirect('https://paredros-backend/getTestAdventure')
})

app.listen(port, () => {
    console.log('paredros creator running on port ' + port)
})
