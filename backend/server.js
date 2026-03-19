require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const connectDB = require("./config/database");

const app = express();

// ======================
// 🔌 CONNECT DATABASE
// ======================
connectDB();

// ======================
// 🌐 CORS
// ======================
app.use(
  cors({
    origin: true, // có thể thay bằng domain frontend sau
    credentials: true,
  }),
);

// ======================
// 📦 MIDDLEWARE
// ======================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================
// 🖼️ STATIC FILE (UPLOAD ẢNH)
// ======================
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ======================
// 📌 ROUTES
// ======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/news", require("./routes/news"));

// ======================
// ❤️ HEALTH CHECK
// ======================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// ======================
// 🏠 ROOT
// ======================
app.get("/", (req, res) => {
  res.send("🚀 CLB Tin học Backend đang hoạt động");
});

// ======================
// 🚨 HANDLE 404
// ======================
app.use((req, res) => {
  res.status(404).json({ message: "API không tồn tại" });
});

// ======================
// ❗ ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Lỗi server",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ======================
// 🚀 START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
