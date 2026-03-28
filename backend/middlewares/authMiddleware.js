import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = {
      userid: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    if (decoded.role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Admin access only" });
    }

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
};

export default authMiddleware;
