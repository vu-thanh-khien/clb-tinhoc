const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "clb-tinhoc",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage: storage });

// POST /api/upload - Upload single image
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/upload/avatar - Upload avatar
router.post("/avatar", upload.single("avatar"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
