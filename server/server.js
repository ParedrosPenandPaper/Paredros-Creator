'use strict'

const express = require('express')
// const hostname = '192.168.0.3'
const port = 80;

const app = express()
app.use(express.static('../dist'))

app.listen(port, console.log('paredros creator running on port 80'))
