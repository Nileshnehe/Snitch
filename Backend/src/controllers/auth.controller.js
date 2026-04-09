import userModel from "../models/user.model.js";

export const register = async (req, res) => {
    const { email, contact, password, fullname } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email and contact already exists" })
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname
        })
        
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server error"});
    }


}