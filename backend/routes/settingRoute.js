import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "logo_" + Date.now() + ext); 
  }
});

const upload = multer({ storage });

router.get("/", getSettings);

router.put("/", authMiddleware, upload.single("logo"), updateSettings);

export default router;
