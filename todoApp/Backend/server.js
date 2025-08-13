import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/db.js'
dotenv.config()

let PORT = process.env.PORT || 3000
connectDB()

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})