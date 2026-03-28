import db from "../config/db.js";
import { StatusCodes } from "http-status-codes";

export const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM settings LIMIT 1");
    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Profile not found" });
    }
    res.status(StatusCodes.OK).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
  }
};

export const updateSettings = async (req, res) => {
  const { companyName, address, email, phone } = req.body;

  if (!companyName || !address || !email || !phone) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "All fields are required" });
  }

  let logoPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    if (logoPath) {
      await db.query(
        `UPDATE settings SET company_name=?, address=?, email=?, phone=?, logo=? WHERE id=1`,
        [companyName, address, email, phone, logoPath]
      );
    } else {
      await db.query(
        `UPDATE settings SET company_name=?, address=?, email=?, phone=? WHERE id=1`,
        [companyName, address, email, phone]
      );
    }
    res.status(StatusCodes.OK).json({ msg: "Profile updated successfully", logo: logoPath });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to update Profile" });
  }
};
