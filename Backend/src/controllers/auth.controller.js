import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET,
        { expiresIn: "7d" })


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role

        }
    })
}

export const register = async (req, res) => {
    console.log("Received body:", req.body);
    const { email, contactNumber, password, fullname, isSeller } = req.body;
    
    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contactNumber },
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email and contact already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            contactNumber,
            password: hashedPassword,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })

        sendTokenResponse(user, res, "User register successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}