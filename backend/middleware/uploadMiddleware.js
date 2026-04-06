const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw", // PDF resume should be uploaded as a raw file
    access_mode: 'public',
  },
});

const upload = multer({ storage });

module.exports = upload;