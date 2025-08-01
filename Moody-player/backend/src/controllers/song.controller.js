const uploadFile = require('../service/storage.service')
const songModel = require('../models/song.model')

module.exports.storeSong = async (req, res) => {
    try {

        const fileData = await uploadFile(req.file)
        const song = await songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
        })

        res.status(201).json({
            song: song,
            message: "Song stores successfully :"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getSongs = async (req, res) => {
    try {

        const {mood} = req.query; 
        const songs = await songModel.find({mood}); 
        console.log(songs);
        
        res.status(200).json({
            message: "Songs fetched successfully",
            songs,
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({
            error: "Failed to fetch songs"
        });

    }

}