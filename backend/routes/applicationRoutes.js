const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus, // Ek hi line mein import karlo
  getResume,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const upload = require("../middleware/uploadMiddleware");

// 1. Apply job (Candidate only)
// Dhyan rakhein: Frontend par 'data.append("resume", file)' hona chahiye
router.post("/:jobId", protect, authorizeRoles("candidate"), upload.single("resume"), applyJob);

// 2. Candidate: see applied jobs
router.get("/my", protect, authorizeRoles("candidate"), getMyApplications);

// Resume proxy route for recruiter PDF viewing
router.get("/resume/:applicationId", protect, authorizeRoles("recruiter", "admin"), getResume);

// 3. Recruiter: see applicants for a specific job
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("recruiter", "admin"),
  getApplicantsForJob
);

// 4. Update status (Recruiter only) 
// 🚨 UPDATE YAHAN HAI: Path ko "/status/:id" kardo
router.put(
  "/status/:id", 
  protect,
  authorizeRoles("recruiter", "admin"),
  updateApplicationStatus
);

module.exports = router;