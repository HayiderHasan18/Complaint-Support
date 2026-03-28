import express from "express";
import { register, login,changePassword , checkUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.put("/change-password", authMiddleware, changePassword);
router.get("/check", authMiddleware, checkUser);

export default router;
