const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Progress = require("../models/Progress");
const Contest = require("../models/Contest");
const mongoose = require("mongoose");

// GET /api/progress/dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [stats, inProgress, recentlySolved] = await Promise.all([
      Progress.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            totalSolved: {
              $sum: { $cond: [{ $eq: ["$status", "solved"] }, 1, 0] },
            },
            totalAttempting: {
              $sum: { $cond: [{ $eq: ["$status", "attempting"] }, 1, 0] },
            },
            totalScore: { $sum: "$score" },
          },
        },
      ]),

      Progress.find({ user: userId, status: "attempting" })
        .populate("contest", "title difficulty")
        .sort({ updatedAt: -1 })
        .limit(5),

      Progress.find({ user: userId, status: "solved" })
        .populate("contest", "title difficulty points")
        .sort({ completedAt: -1 })
        .limit(5),
    ]);

    res.json({
      stats: stats[0] || { totalSolved: 0, totalAttempting: 0, totalScore: 0 },
      inProgress,
      recentlySolved,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/progress/submit/:contestId
router.post("/submit/:contestId", auth, async (req, res) => {
  try {
    const { code, status, executionTime } = req.body;

    let progress = await Progress.findOne({
      user: req.user.id,
      contest: req.params.contestId,
    });

    if (!progress) {
      progress = new Progress({
        user: req.user.id,
        contest: req.params.contestId,
      });
    }

    progress.attempts += 1;
    progress.lastCode = code;
    progress.submittedAt.push(new Date());

    if (status === "solved" && progress.status !== "solved") {
      progress.status = "solved";
      progress.completedAt = new Date();
      progress.solveTime = executionTime;

      const contest = await Contest.findById(req.params.contestId);
      progress.score = Math.max(
        0,
        contest.points - (progress.attempts - 1) * 10,
      );
    } else if (status === "attempting") {
      progress.status = "attempting";
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
