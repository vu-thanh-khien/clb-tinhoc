const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "attempting", "solved"],
      default: "not_started",
    },
    score: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    lastCode: { type: String, default: "" },
    solveTime: { type: Number, default: 0 },
    completedAt: { type: Date },
    submittedAt: [{ type: Date }],
  },
  { timestamps: true },
);

progressSchema.index({ user: 1, contest: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
