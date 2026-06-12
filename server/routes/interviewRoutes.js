import express from "express";
import protect from "../middlewares/authMiddleware.js";

import {
  generateInterviewQuestions
} from "../controllers/interviewController.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/generate",
  protect,
  generateInterviewQuestions
);

export default interviewRouter;