const express = require("express");
const router = express.Router();

const { updateProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Update profile + upload resume
router.put("/profile", protect, upload.single("resume"), updateProfile);

module.exports = router;