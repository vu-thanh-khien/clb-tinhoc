const express = require("express");
const router = express.Router();
const {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", protect, getAssignments);
router.get("/:id", protect, getAssignment);
router.post("/", protect, adminOnly, createAssignment);
router.put("/:id", protect, adminOnly, updateAssignment);
router.delete("/:id", protect, adminOnly, deleteAssignment);

module.exports = router;
