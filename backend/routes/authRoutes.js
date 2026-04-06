const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
router.post("/register", registerUser);
router.post("/login", loginUser);

// Only admin access
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Only recruiter access
router.get(
  "/recruiter",
  protect,
  authorizeRoles("recruiter"),
  (req, res) => {
    res.json({ message: "Welcome Recruiter" });
  }
);

module.exports = router;