import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log('Connected to DB');
        
    } catch (error) {
        console.log('Connection failed to DB',error.message);
        
    }
}

export default connectDB