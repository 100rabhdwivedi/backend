
import mongoose from "mongoose";
import Joi from "joi";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const userModel = mongoose.model("User", userSchema);

export const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(100).required()
    });
    return schema.validate(data);
};
