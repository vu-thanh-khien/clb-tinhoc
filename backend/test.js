const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "CLB Tin hoc API", status: "OK" });
});

// API routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API working!", users: 150 });
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server on http://localhost:${PORT}`);
});
