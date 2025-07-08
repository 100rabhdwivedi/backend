const express = require('express')
const connectToDB = require('./src/db/db.js')

connectToDB()
const app = express()

app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
})