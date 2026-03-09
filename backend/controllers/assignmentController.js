const Assignment = require("../models/Assignment");

// Lấy tất cả bài tập
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("createdBy", "name email")
      .sort("-createdAt");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy 1 bài tập
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!assignment)
      return res.status(404).json({ message: "Không tìm thấy bài tập" });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo bài tập
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật bài tập
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa bài tập
exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa bài tập" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
