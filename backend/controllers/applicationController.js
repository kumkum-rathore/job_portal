const axios = require("axios");
const Application = require("../models/Application");
const Job = require("../models/Job");
const sendEmail = require("../config/email");

const normalizeResumeUrl = (url) => {
  if (!url) return url;
  if (url.includes("/image/upload/")) {
    return url.replace("/image/upload/", "/raw/upload/");
  }
  return url;
};

// Resume proxy route so browser gets correct PDF headers from our backend
exports.getResume = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to view this resume" });
    }

    const fileUrl = normalizeResumeUrl(application.resume);
    if (!fileUrl) {
      return res.status(404).json({ message: "Resume URL missing" });
    }

    const response = await axios.get(fileUrl, { responseType: "stream" });
    res.setHeader("Content-Type", response.headers["content-type"] || "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
    response.data.pipe(res);
  } catch (error) {
    console.error("Resume proxy error:", error.message);
    res.status(500).json({ message: "Unable to fetch resume" });
  }
};

// 1. APPLY FOR A JOB
exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Job check aur Recruiter detail nikalna
    const job = await Job.findById(jobId).populate("createdBy");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Pehle hi apply toh nahi kiya?
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Resume check (Multer check)
    if (!req.file) {
      return res.status(400).json({ message: "Please upload your resume" });
    }

    console.log("Uploaded file:", req.file); // Debug log

    const rawResumeUrl = req.file?.secure_url || req.file?.path || req.file?.url;
    const normalizedResumeUrl = normalizeResumeUrl(rawResumeUrl);

    // Application create karna
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      full_name: req.body.full_name,
      email: req.user.email,
      experience: req.body.experience,
      resume: normalizedResumeUrl,
      cover_letter: req.body.cover_letter,
    });

    // 🔥 RECRUITER KO EMAIL BHEJNA
    try {
      await sendEmail(
        job.createdBy.email,
        "New Job Application Received",
        `Hello ${job.createdBy.name}, you have received a new application for the post of "${job.title}" from ${req.body.full_name}.`
      );
    } catch (emailErr) {
      console.log("Email sending failed:", emailErr); // Email fail hone par application crash nahi honi chahiye
    }

    res.status(201).json({
      message: "Application submitted successfully! 🚀",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. CANDIDATE: GET MY APPLIED JOBS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "title company location salary")
      .lean();

    const normalizedApplications = applications.map((application) => ({
      ...application,
      resume: normalizeResumeUrl(application.resume),
    }));

    res.json(normalizedApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. RECRUITER: GET ALL APPLICANTS FOR A SPECIFIC JOB
exports.getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Pehle check karo ki ye job isi recruiter ne post ki hai ya nahi
    const job = await Job.findById(jobId);
    if (!job || job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access to applicants" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort("-createdAt")
      .lean();

    const normalizedApplications = applications.map((application) => ({
      ...application,
      resume: normalizeResumeUrl(application.resume),
    }));

    res.json(normalizedApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. UPDATE APPLICATION STATUS (ACCEPT/REJECT)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔒 Security Check: Kya ye recruiter is job ka malik hai?
    if (application.job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    // 📩 Optional: Candidate ko email bhejna status update ka
    // await sendEmail(application.email, "Application Update", `Your application for ${application.job.title} has been ${status}.`);

    res.json({
      message: `Application marked as ${status} successfully`,
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};