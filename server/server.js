import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import session from "express-session";
import googleAuthRoute from "./routes/googleAuthRoute.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoute.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import protect from "./middleware/authMiddleware.js";
import adminOnly from "./middleware/adminMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://task-management-collaboration-tool-seven.vercel.app",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", googleAuthRoute);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});