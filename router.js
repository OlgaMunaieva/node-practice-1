const express = require("express");
const { createFile, getFiles, getFile } = require("./files");

const router = express.Router();

router.post("/", createFile);
router.get("/", getFiles);
router.get("/:fileName", getFile);

module.exports = router;
