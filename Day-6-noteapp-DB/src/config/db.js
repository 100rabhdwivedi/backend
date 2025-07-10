const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect("mongodb+srv://dwivedi100rabhh:85uqfOLLzCXYTu6a@cluster0.iq6tw.mongodb.net/noteapp")
    .then(()=>{
        console.log("Database connected successfully :")
    })
}

module.exports = connectToDB