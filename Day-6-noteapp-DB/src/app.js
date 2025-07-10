const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const connectToDB = require('./config/db')

dotenv.config()
connectToDB()
const app = express()



app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json("Index page")
})

module.exports =   app ;