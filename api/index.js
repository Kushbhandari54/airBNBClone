// @ts-nocheck
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const imageUploader = require("./routes/imageUploader");
const places = require("./routes/places");
const fs = require("fs");
const users = require("./routes/user");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

const main = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connection Successfull", mongoose.connection.db.databaseName);
  } catch (e) {
    console.log(e, "Something went wrong!");
  }
};

main();

app.use(
  cors({
    // credentials: true,
    // origin: "http://localhost:5173/",
  })
);

app.get("/api/v1/test", (req, res) => {
  res.status(200).json("Tested Ok");
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/api/v1/upload",
  photosMiddleware.array("photos", 100),
  (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { filename, path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];

      const newPath = filename + "." + ext;

      fs.renameSync(path, "uploads/" + newPath);
      uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles);
  }
);

app.use("/api/v1", users);
app.use("/api/v1", imageUploader);
app.use("/api/v1", places);

app.listen(process.env.PORT);
