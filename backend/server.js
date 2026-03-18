require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/database");

const app = express();

// Connect Database
connectDB();

// CORS configuration
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/news", require("./routes/news"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("CLB Tin học Backend đang hoạt động 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
