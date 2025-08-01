const { storeSong, getSongs } = require('../controllers/song.controller')
const multer = require('multer')
const router = require('express').Router()

const upload = multer({storage:multer.memoryStorage()});

router.post('/',upload.single("audio"),storeSong)
router.get('/',getSongs)

module.exports = router