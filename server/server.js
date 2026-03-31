import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});