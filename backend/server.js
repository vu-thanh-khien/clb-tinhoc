require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/upload", require("./routes/upload"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    db:
      require("mongoose").connection.readyState === 1
        ? "connected"
        : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
