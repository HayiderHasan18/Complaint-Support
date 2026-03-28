import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username ||!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }
  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password must be at least 8 characters" });
  }

  try {
    
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Admin already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users 
       (username,email, password, role) 
       VALUES (?, ?, ?, 'admin')`,
      [username, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email and password are required" });
  }

  try {
    const [users] = await db.query(
      "SELECT id, username, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid email or password" });
    }

    const user = users[0];

    if (user.role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userid;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const [rows] = await db.query(
    "SELECT password FROM users WHERE id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Current password incorrect" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashed, userId]
  );

  res.json({ msg: "Password updated successfully" });
};

export const checkUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: "Valid admin",
    user: req.user,
  });
};
