import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password
        } = req.body || {}

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }


        const user = await User.findOne({
            email
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            fullname,
            email,
            password: hashedPassword
        })
        const {
            password: _,
            ...userWithoutPassword
        } = user.toObject()
        return res.status(201).json({
            success: true,
            message: "User registered",
            user: userWithoutPassword
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}

export const login = async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body || {}

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        email = email.toLowerCase().trim();

        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const token = await jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        })
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            samesite: "strict",
            maxAge: 24 * 60 * 60 * 1000 * 2
        }).json({
            success: true,
            message: "Login successful"
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0
        }).json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}