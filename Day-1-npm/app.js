// var catMe = require('cat-me')
// console.log(catMe())

const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.end("Home page :")
    }else if (req.url == '/profile'){
        res.end("Profille page :")
    }else{
        res.end("Page not found :")
    }
})

server.listen(4000,()=>{
    console.log("Server running on 3000 port")
})