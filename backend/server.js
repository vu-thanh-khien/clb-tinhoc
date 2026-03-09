require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database"); // Dùng file có sẵn
const { createServer } = require("http");
const { Server } = require("socket.io");

// Connect Database (dùng file database.js của bạn)
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

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

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-topic", (topicId) => {
    socket.join(`topic-${topicId}`);
  });

  socket.on("leave-topic", (topicId) => {
    socket.leave(`topic-${topicId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
