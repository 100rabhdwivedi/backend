import {validateUser,userModel} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res) =>{

try {
    const {username,password} = req.body

    const {error} = validateUser({username,password})
    
    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        })
    }

    const existingUser = await userModel.findOne({username})
    if(existingUser){
        return res.status(409).json({
            success:false,
            message:"Username already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await userModel.create({username,password:hashedPassword})

    const {password: _,...userWithoutpass} = newUser.toObject();

    const token =  jwt.sign({
        id:newUser._id
    },process.env.JWT_SECRET_KEY,{expiresIn:'1d'})


    return res.status(201).cookie('token',token,{ httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000 
    }).json({
        success:true,
        message:"User register successfully",
        userDetails:userWithoutpass
    })

} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
}

}

export const login = async (req,res) => {
try {
        const {username,password} = req.body

    const {error} =  validateUser({username,password})

    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        })
    }

    const user = await userModel.findOne({username})
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid username or password"
        })
    }

    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(401).json({
            success:false,
            message:"Invalid username or password"
        })
    }

    const token =  jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

    return res.status(200).cookie('token',token,{ httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000 
    }).json({
        success:true,
        message:"Login successfully"
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}