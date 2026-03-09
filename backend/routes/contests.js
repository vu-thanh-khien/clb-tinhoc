const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");
const auth = require("../middleware/auth");

// GET /api/contests - Lấy tất cả contests
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find().sort({ createdAt: -1 });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contests/:id - Lấy chi tiết contest
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/contests - Tạo contest mới (cần auth)
router.post("/", auth, async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json(contest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
