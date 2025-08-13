const express = require('express')

const router = express.Router()

router.use((req,res,next)=>{
    console.log("This is router level middleware");
    next();
})

router.get("/",(req,res)=>{
    res.json({
        message:"Welcome to index route"
    })
})

module.exports = router