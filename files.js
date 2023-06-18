const fs = require("fs/promises");
const path = require("path");

const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (req, res, next) => {
  const { fileName, content } = req.body;
  const { error } = dataValidator(req.body);
  if (error) {
    res.status(400).json({
      message: `please specify parameter ${error.details[0].context.label}`,
    });
    return;
  }
  const { extension, result } = checkExtension(fileName);
  if (!result) {
    res.status(400).json({
      message: `sorry, this application does not support files with ${extension} extension`,
    });
    return;
  }
  try {
    await fs.writeFile(
      path.join(__dirname, "./files", fileName),
      content,
      "utf-8"
    );
    res.status(201).json({ message: "File was created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

const getFiles = async (req, res, next) => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));
    if (data.length === 0) {
      res.status(404).json({ message: "there are no files in this directory" });
      return;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFile = async (req, res, next) => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));

    const { fileName } = req.params;
    if (!data.includes(fileName)) {
      res
        .status(404)
        .json({ message: `file ${fileName} wasn't found in this directory` });
      return;
    }
    const fileContent = await fs.readFile(
      path.join(__dirname, "./files", fileName),
      "utf-8"
    );
    const extension = path.extname(fileName);
    const name = path.basename(
      path.join(__dirname, "./files", fileName),
      extension
    );
    const resultObj = {
      name,
      extension,
      content: fileContent,
    };
    res.json(resultObj);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createFile,
  getFiles,
  getFile,
};
