'use strict'

const express = require('express')
const app = express()
const port = 80;

app.use(express.static('../dist'))

app.listen(port, () => {
    console.log('paredros creator running on port 80')
})
