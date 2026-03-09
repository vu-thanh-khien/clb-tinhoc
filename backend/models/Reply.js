const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isSolution: { type: Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Reply", replySchema);
