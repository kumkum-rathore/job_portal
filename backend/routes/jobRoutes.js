const express = require("express");
const router = express.Router();

const { createJob, getJobs, getJobById } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create Job (Recruiter/Admin only)
router.post("/", protect, authorizeRoles("recruiter", "admin"), createJob);

// Get All Jobs (Public)
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

module.exports = router;