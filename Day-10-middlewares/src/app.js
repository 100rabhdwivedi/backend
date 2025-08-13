const express = require('express')
const indexRouter = require("./routes/indexRouter")
const app = express()

app.use((req,res,next)=>{
    console.log("This is a app level middleware");
    next();
})

app.use("/",indexRouter)

module.exports = app