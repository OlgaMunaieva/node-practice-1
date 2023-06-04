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
  }

  //   console.log(result);
  //   console.log(result.error.details[0]);
};

module.exports = {
  createFile,
};
