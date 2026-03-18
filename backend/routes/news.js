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

// Lấy danh sách bài viết
router.get("/", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// Tạo bài viết
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const news = new News({
    title,
    content,
  });

  await news.save();
  res.json(news);
});

module.exports = router;
