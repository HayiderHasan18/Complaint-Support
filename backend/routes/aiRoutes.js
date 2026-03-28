import express from "express";
import {
  analyzeComplaintController,
	aiChatController,
  adminChatController,
	aiChatHistoryController,
} from "../controllers/aiController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/analyze-complaint", analyzeComplaintController);


router.post("/chat", aiChatController);


router.post("/admin/chat", authMiddleware, adminChatController);

router.get("/chat-history", authMiddleware, aiChatHistoryController);

export default router;
