const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const mongoose = require("mongoose");

// GET /api/leaderboard
router.get("/", async (req, res) => {
  try {
    const { period = "all", type = "score", limit = 50 } = req.query;
    const matchStage = { status: "solved" };

    if (period === "week") {
      matchStage.updatedAt = {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };
    } else if (period === "month") {
      matchStage.updatedAt = {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };
    }

    const sortField = type === "solved" ? "solvedCount" : "totalScore";

    const leaderboard = await Progress.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$user",
          totalScore: { $sum: "$score" },
          solvedCount: { $sum: 1 },
          totalAttempts: { $sum: "$attempts" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          avatar: "$user.avatar",
          totalScore: 1,
          solvedCount: 1,
          accuracy: {
            $multiply: [{ $divide: ["$solvedCount", "$totalAttempts"] }, 100],
          },
        },
      },
      { $sort: { [sortField]: -1 } },
      { $limit: parseInt(limit) },
    ]);

    res.json({
      leaderboard: leaderboard.map((item, index) => ({
        rank: index + 1,
        ...item,
      })),
      period,
      type,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
