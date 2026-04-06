const User = require("../models/User");

// UPDATE PROFILE + RESUME
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    if (req.file) {
      const rawResumeUrl = req.file?.secure_url || req.file?.path || req.file?.url;
      const normalizedResumeUrl = rawResumeUrl?.includes("/image/upload/")
        ? rawResumeUrl.replace("/image/upload/", "/raw/upload/")
        : rawResumeUrl;
      user.resume = normalizedResumeUrl;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};