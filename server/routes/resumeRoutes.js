import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    createResume,
    deleteResume,
    getPublicResumeById,
    getResumeById,
    updateResume
} from "../controllers/resumeController.js";

import upload from "../configs/multer.js";

const resumeRouter = express.Router();

// Create Resume
resumeRouter.post("/create", protect, createResume);

// Update Resume
resumeRouter.put(
    "/update",
    upload.single("image"),
    protect,
    updateResume
);

// Delete Resume
resumeRouter.delete(
    "/delete/:resumeId",
    protect,
    deleteResume
);

// Get Resume By ID
resumeRouter.get(
    "/get/:resumeId",
    protect,
    getResumeById
);

// Get Public Resume
resumeRouter.get(
    "/public/:resumeId",
    getPublicResumeById
);

export default resumeRouter;