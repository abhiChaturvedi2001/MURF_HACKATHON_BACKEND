const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const audioRoutes = require("./routes/audioRoutes");
const { connectDb } = require("./config/db");

const app = express();

// need to pass option in cors
const options = {
  origin: "https://frontend-murf.vercel.app",
  credentials: true
};

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadsDir = path.join(__dirname, "uploads");
function cleanUploadsFolderCompletely() {
  fs.rm(uploadsDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error("Failed to delete uploads folder:", err);
    } else {
      console.log("Uploads folder deleted.");
    }
  });
}
setInterval(cleanUploadsFolderCompletely, 1000 * 60 * 60);
app.use("/api/v0", audioRoutes);

const port = process.env.PORT

// DO NOT start server here
connectDb()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(port);
    })
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = app;

