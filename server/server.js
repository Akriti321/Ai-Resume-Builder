import "./config/env.js";

import express from "express";
import cors from "cors";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import { APIResource } from "openai/core/resource.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();

const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use('/api/ai',aiRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});