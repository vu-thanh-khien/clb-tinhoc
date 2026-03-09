const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Topic = require("../models/Topic");
const Reply = require("../models/Reply");
const Category = require("../models/Category");

// GET /api/forum/categories
router.get("/categories", async (req, res) => {
  const categories = await Category.find().sort({ order: 1 });
  res.json(categories);
});

// GET /api/forum/topics
router.get("/topics", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      sort = "latest",
    } = req.query;
    const query = { status: "active" };

    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    let sortOption = { isPinned: -1, "lastReply.at": -1 };
    if (sort === "popular") sortOption = { views: -1 };
    if (sort === "unanswered") {
      sortOption = { replyCount: 1, createdAt: -1 };
      query.replyCount = 0;
    }

    const [topics, total] = await Promise.all([
      Topic.find(query)
        .populate("author", "username avatar")
        .populate("category", "name color")
        .populate("lastReply.author", "username")
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean(),
      Topic.countDocuments(query),
    ]);

    res.json({
      topics,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/forum/topics
router.post("/topics", auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const topic = new Topic({
      title,
      content,
      category,
      tags: tags?.map((t) => t.toLowerCase()) || [],
      author: req.user.id,
      lastReply: { author: req.user.id, at: new Date() },
    });

    await topic.save();
    await Category.findByIdAndUpdate(category, { $inc: { topicCount: 1 } });
    await topic.populate("author", "username avatar");

    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/forum/topics/:id
router.get("/topics/:id", async (req, res) => {
  try {
    Topic.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).exec();

    const [topic, replies] = await Promise.all([
      Topic.findById(req.params.id)
        .populate("author", "username avatar")
        .populate("category", "name"),
      Reply.find({ topic: req.params.id })
        .populate("author", "username avatar")
        .sort({ createdAt: 1 }),
    ]);

    if (!topic) return res.status(404).json({ message: "Not found" });
    res.json({ topic, replies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/forum/topics/:id/replies
router.post("/topics/:id/replies", auth, async (req, res) => {
  try {
    const { content, isSolution } = req.body;

    const reply = new Reply({
      content,
      topic: req.params.id,
      author: req.user.id,
      isSolution: isSolution || false,
    });

    await reply.save();

    await Topic.findByIdAndUpdate(req.params.id, {
      $inc: { replyCount: 1 },
      lastReply: { author: req.user.id, at: new Date() },
      ...(isSolution && { isSolved: true }),
    });

    // Real-time
    const io = req.app.get("io");
    io.to(`topic-${req.params.id}`).emit("new-reply", {
      topicId: req.params.id,
      reply: await reply.populate("author", "username avatar"),
    });

    await reply.populate("author", "username avatar");
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
