const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    points: { type: Number, default: 100 },
    problemStatement: { type: String, required: true },
    inputFormat: String,
    outputFormat: String,
    constraints: String,
    sampleInput: String,
    sampleOutput: String,
    testCases: [
      {
        input: String,
        output: String,
        isHidden: { type: Boolean, default: false },
      },
    ],
    timeLimit: { type: Number, default: 1000 }, // ms
    memoryLimit: { type: Number, default: 256 }, // MB
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contest", contestSchema);
