const multer = require("multer");
const fs = require("fs"); // ✅ required
const path = require("path"); // ✅ required

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads";

    // Check if uploads folder exists, create if not
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // recursive allows nested folders
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `pdf-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
