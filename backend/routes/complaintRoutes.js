import express from "express";
import { getSingleComplaints, getAllComplaints,submitComplaint,markResolved,closeComplaint } from "../controllers/complaintController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", submitComplaint);

router.get("/", authMiddleware, getAllComplaints);
router.get("/:id", authMiddleware, getSingleComplaints);
router.put("/:id/resolve", authMiddleware, markResolved);
router.put("/:id/close", authMiddleware, closeComplaint);

export default router;
