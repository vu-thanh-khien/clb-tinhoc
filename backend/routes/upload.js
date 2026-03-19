const express = require("express");
const router = express.Router();
const multer = require("multer");

// cấu hình lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API upload
router.post("/", upload.single("image"), (req, res) => {
  const url = `https://clb-tinhoc-api.onrender.com/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
