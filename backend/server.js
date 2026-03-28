import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";
import auth from "./routes/authRoutes.js";
import complaintRoutes from './routes/complaintRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import settingRoute from './routes/settingRoute.js'
import dashboardRoutes from './routes/dashboardRoute.js'
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend is running" });
})
app.use("/api/auth",auth);
app.use('/api/complaints',complaintRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/settings', settingRoute)
app.use("/api", dashboardRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

