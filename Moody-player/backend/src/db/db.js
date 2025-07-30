const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to database")
    })
    .catch((err)=>{
        console.log("Connection failed to database",err)
    })
}

module.exports = connectDB;