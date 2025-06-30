// var catMe = require('cat-me')
// console.log(catMe())

const http = require('http')
const server = http.createServer((req,res)=>{
    res.end("Server created")
})

server.listen(3000,()=>{
    console.log("Server running on 3000 port")
})