import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";   
// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Register User
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate Token
        const token = generateToken(newUser._id);

        // Remove password from response
        newUser.password = undefined;

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser
        });

    } catch (error) {

        return res.status(400).json({
            message: "Server Error",
            error: error.message
        });

    }
};

// Login User
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        // Generate Token
        const token = generateToken(user._id);

        // Remove password
        user.password = undefined;

        return res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        return res.status(400).json({
            message: "Server Error",
            error: error.message
        });

    }
};

// Get User By ID
export const getUserById = async (req, res) => {

    try {

        const userId = req.userId;
        //check is user exists 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        //return useer
        user.password = undefined;  
        return res.status(200).json(user);

    } catch (error) {

        return res.status(400).json({
            message: "Server Error",
            error: error.message
        });

    }
};

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        //return resumes
        const resumes=await Resume.find({ userId });
        return res.status(200).json({resumes});
    }
    catch (error) {
        return res.status(400).json({
            message: "Server Error",
            error: error.message
        });
    }
};