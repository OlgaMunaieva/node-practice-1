const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };
  const { error } = dataValidator(file);
  if (error) {
    console.log(
      chalk.red(`please specify parameter ${error.details[0].context.label}`)
    );
    return;
  }
  const { extension, result } = checkExtension(fileName);
  if (!result) {
    console.log(
      chalk.red(
        `sorry, this application does not support files with ${extension} extension`
      )
    );
    return;
  }
  try {
    await fs.writeFile(
      path.join(__dirname, "./files", fileName),
      content,
      "utf-8"
    );
    console.log(chalk.green("File was created successfully"));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));
    if (data.length === 0) {
      console.log(chalk.red("there are no files in this directory"));
      return;
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getFile = async (fileName) => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));
    if (!data.includes(fileName)) {
      console.log(chalk.red(`file ${fileName} wasn't found in this directory`));
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
    console.log(resultObj);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createFile,
  getFiles,
  getFile,
};
