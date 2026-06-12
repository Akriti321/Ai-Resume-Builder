import express from "express";

import protect
from "../middlewares/authMiddleware.js";

import {
  analyzeJD
}
from "../controllers/jdAnalyzerController.js";

const router = express.Router();

router.post(
  "/analyze",
  protect,
  analyzeJD
);

export default router;