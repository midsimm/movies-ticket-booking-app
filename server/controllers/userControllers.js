const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User does not exist. Please register first.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(200).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in user",
            error: error.message,
        });
    }
}