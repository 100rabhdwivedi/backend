import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to database");
    } catch (error) {
        console.log("Connection failed to database", error);
    }
}

export default connectDB