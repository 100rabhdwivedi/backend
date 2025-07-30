const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title:String,
    artist:String,
    audio:String
})


const song = mongoose.Model('song',songSchema)

module.exports = song