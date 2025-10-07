const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    try {
        const userExists = await UserModel.findOne({ email: email});
        if (userExists) {
            return res.status(200).json({
                success: true,
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;

        const user = await UserModel.create({
            name: name,
            email: email,
            password: password,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message,
        });
    }
}