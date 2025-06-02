const express = require("express");
const { uploadPDf, getFileName } = require("../controller/audioController");
const upload = require("../middleware/multerMiddleware");
const router = express.Router();

router.post("/upload", upload.single('pdf'), uploadPDf);
router.get("/getFile", getFileName);

module.exports = router;