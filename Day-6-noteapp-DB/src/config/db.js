const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected successfully :")
    }).catch((err)=>{
        console.log("Database not connected :",err)
    })
}

module.exports = connectToDB