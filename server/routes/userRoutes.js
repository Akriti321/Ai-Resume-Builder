import express from "express";

import {
    getUserResumes,
    registerUser,
    loginUser,
    getUserById
} from "../controllers/userController.js";

import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", registerUser);

// Login
userRouter.post("/login", loginUser);

// Get User Data
userRouter.get("/data", protect, getUserById);

userRouter.get("/resume", protect, getUserResumes) 
export default userRouter;