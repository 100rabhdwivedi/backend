const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const connectToDB = require('./config/db')
const noteModel = require('./models/note.model')

dotenv.config()
connectToDB()
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get('/notes', async(req, res)=>{
    let notes = await noteModel.find()
    
    if(!notes.length) return res.status(404).json({message: "Empty collection"})
    res.status(200).json({notes})
})

app.post('/notes', async(req, res)=>{
    let {title,description} = req.body

    if(!title || !description)
        return res.status(400).json({error:"Missing parameter :"})
    
        let notes = await noteModel.create({title, description})
        res.status(201).json({message:"Note created succeessfully :",notes})

})

app.patch('/notes/:id',async (req, res)=>{
    let {id} = req.params
    let {title} = req.body
    console.log(id);
    
    let note = await noteModel.findByIdAndUpdate(id,{title},{new : true})
    if(!note) return res.status(400).json({error:"Invalid id "})
    res.status(200).json({message:"Updated successfully :",note})
})

app.delete('/notes/:id',async (req, res)=>{
    let {id} = req.params
    let note = await noteModel.findByIdAndDelete(id)
    res.status(200).json({message:"Deleted successfully :",note})
})


module.exports =   app ;