const express = require('express')
const app = express()
const cors = require('cors')

const songRouter = require('./Routes/song.route')

app.use(cors())
app.use(express.json())
app.use('/api/songs', songRouter)

module.exports = app