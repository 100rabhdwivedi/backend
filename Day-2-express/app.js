const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send("This is home page :")
})

app.get('/profile',(req,res)=>{
    res.send("This is a profile page :")
})


app.listen(3000,()=>{
    console.log("Server is running port 3000")
})