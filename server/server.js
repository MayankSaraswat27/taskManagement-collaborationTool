import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoute.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";   // ✅ ADD THIS

import protect from "./middleware/authMiddleware.js";
import adminOnly from "./middleware/adminMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);   // ✅ ADD THIS

app.get("/api/protected", protect, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

app.get("/api/admin", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome Admin", user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});