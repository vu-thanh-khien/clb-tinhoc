const User = require("../models/User");

// Lấy tất cả users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy 1 user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export
module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
