const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề"],
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
      enum: ["Scratch", "Python", "Web", "AI", "C++"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Dễ", "Trung bình", "Khó"],
      default: "Trung bình",
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Đang mở", "Đã đóng"],
      default: "Đang mở",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Assignment", assignmentSchema);
