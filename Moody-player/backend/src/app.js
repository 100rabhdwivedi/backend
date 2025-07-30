const express = require('express')
const app = express()

const songRouter = require('./Routes/song.route')

app.use(express.json())

app.use('/api/songs', songRouter)

module.exports = app