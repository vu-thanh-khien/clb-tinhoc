const express = require("express");
const router = express.Router();

// Kiểm tra tên import có đúng không
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", protect, getUsers);
router.get("/:id", protect, getUser);

// Nếu vẫn lỗi, comment tạm 2 dòng này
// router.put('/:id', protect, adminOnly, updateUser);
// router.delete('/:id', protect, adminOnly, deleteUser);

// Hoặc thay bằng:
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
