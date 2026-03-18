const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", NewsSchema);

// Lấy tất cả bài viết
router.get("/", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// Thêm bài viết
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNews = new News({
      title,
      content,
    });

    await newNews.save();

    res.json(newNews);
  } catch (err) {
    res.status(500).json({ error: "Không tạo được bài viết" });
  }
});

module.exports = router;
