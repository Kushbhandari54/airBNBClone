const express = require("express");
const path = require("path");
const imageDownloader = require("image-downloader");

const router = express.Router();

router.route("/upload-by-link").post(async (req, res) => {
  try {
    const { link } = req.body;
    const newName = 'photo'+ Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: path.join(__dirname, "..", "uploads", newName),
    });
    res.json(newName);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong!",
    });
    console.log("Something went wrong", e);
  }
});

module.exports = router;
