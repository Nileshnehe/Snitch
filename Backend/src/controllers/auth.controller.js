import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"


async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET,
        { expiresIn: "7d" })


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contactNumber: user.contactNumber,
            fullName: user.fullName,
            role: user.role

        }
    })
}

export const register = async (req, res) => {
    console.log("Received body:", req.body);
    const { email, contactNumber, password, fullName, isSeller } = req.body;

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


        const user = await userModel.create({
            email,
            contactNumber,
            password,
            fullName,
            role: isSeller ? "seller" : "buyer"
        })

        sendTokenResponse(user, res, "User register successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    await sendTokenResponse(user, res, "User logged in successfully")
}

export const googleCallback = async (req, res) => {
    console.log(req.user)

    const { id, displayName, emails, photos } = req.user
    const email = emails[0].value
    const photo = photos[0].value

    let user = await userModel.findOne({ email })

    if (!user) {
        user = await userModel.create({
            email,
            googleId: id,
            fullName: displayName
        })
    }
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    // res.cookie("token", token)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(process.env.CLIENT_URL || "http://localhost:5173/")
}


export const getMe = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contactNumber: user.contactNumber,
            fullname: user.fullName,
            role: user.role
        }
    })
}