const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [{ type: String, lowercase: true }],
    views: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastReply: {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      at: { type: Date, default: Date.now },
    },
    isPinned: { type: Boolean, default: false },
    isSolved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "closed", "deleted"],
      default: "active",
    },
  },
  { timestamps: true },
);

topicSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Topic", topicSchema);
