const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;


const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {

    res.json({
        message: "Protected route accessed",
        user: req.user
    });

});

const adminOnly = require("./middleware/adminMiddleware");

app.get("/api/admin", protect, adminOnly, (req, res) => {

    res.json({
        message: "Welcome Admin",
        user: req.user
    });

});

app.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});