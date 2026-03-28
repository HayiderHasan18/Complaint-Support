
import express from "express";
import { getDashboardData } from "../controllers/dashboardControler.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getReportsData } from "../controllers/reportController.js";
const router = express.Router();
router.get("/dashboard", authMiddleware, getDashboardData);
router.get("/reports", authMiddleware, getReportsData);

export default router;


