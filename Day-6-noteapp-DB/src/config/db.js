const mongoose = require('mongoose')
console.log(process.env.MONGODB_URI);

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected successfully :")
    }).catch((err)=>{
        console.log("Database not connected :",err.message)
    })
}

module.exports = connectToDB