const express = require("express");
const uploadCheck = require("../middlewares/upload-check");
const uploadSingle = require("../middlewares/upload-single");
const uploadMulti = require("../middlewares/upload-multi");
const {fileAuth} = require("../middlewares/auth");
const fs = require("fs");

const router = express.Router();

router.post("/", [fileAuth, uploadCheck, uploadSingle], (req, res) => {
  res.send(req.file);
});

router.post("/multi", [uploadCheck, uploadMulti], (req, res) => {
  res.send(req.files);
});

router.get("/", (req, res) => {
  res.send("File manager module...");
});

router.post("/download", fileAuth, (req, res) => {
  const fileDir = "./uploaded-files/photos/image-1.png";

  res.download(fileDir);
});

router.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const fileDir = `./uploaded-files/photos/${filename}`;

  if (!fs.existsSync(fileDir)) {
    return res.status(400).send({ error: "File not found!" });
  }

  res.download(fileDir);
});

router.get("/dbimage/:imageID", (req, res) => {
  const { imageID } = req.params;

  // --- Load from DB
  let filename = "";
  switch (imageID) {
    case "1": {
      filename = "image-1.png";
      break;
    }
    case "2": {
      filename = "image-2.png";
      break;
    }
    default: {
      filename = "";
      break;
    }
  }

  const fileDir = `./uploaded-files/photos/${filename}`;

  if (!fs.existsSync(fileDir)) {
    return res.status(400).send({ error: "File not found!" });
  }

  res.download(fileDir);
});

module.exports = router;
