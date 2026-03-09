const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  icon: String,
  color: { type: String, default: "#3B82F6" },
  order: { type: Number, default: 0 },
  topicCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Category", categorySchema);
