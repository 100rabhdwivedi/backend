import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/db.js'

dotenv.config()
connectDB()
let port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
})
