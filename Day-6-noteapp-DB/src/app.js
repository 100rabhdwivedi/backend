const express = require('express')
const morgan = require('morgan')
const connectToDB = require('./config/db')

connectToDB()
const app = express()



app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json("Index page")
})

module.exports =   app ;