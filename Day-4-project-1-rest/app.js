const express = require("express");
const app = express();

app.use(express.json());

const notes = [];

// GET all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// CREATE a new note
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.json({
        message: "Note created successfully",
        note: req.body
    });
});

// DELETE a note by index
app.delete('/notes/:index',(req,res)=>{
    const index = parseInt(req.params.index)
    if(index >= 0 && index < notes.length){
        notes.splice(index,1)
        res.json({message:"Note deleted successfully",})
    }else{
        res.json({message:"Note not found"})
    }
})

// UPDATE a note's title by index
app.patch('/notes/:index',(req,res)=>{
    const index = parseInt(req.params.index)
    const {title} = req.body
    if(index >= 0 && index < notes.length){
        notes[index].title = title
        res.json({message:"Note updated successfully",note : notes[index]})
    }else{
        res.json({message:"Note not found"})
    }
})

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
