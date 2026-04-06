const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS (Updated with Search & Filter)
exports.getJobs = async (req, res) => {
  try {
    const { keyword, location } = req.query;

    // Empty query object
    let query = {};

    // 1. Agar keyword hai, to Title ya Company ya Description mein search karo
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // 2. Agar location hai, to use filter mein add karo
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Jobs find karo aur recruiter ki details populate karo
    const jobs = await Job.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); // Latest jobs pehle dikhengi

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE JOB
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};