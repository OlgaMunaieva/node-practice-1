const checkExtension = (fileName) => {
  const EXTENSIONS = ["js", "json", "html", "css", "txt"];
  const arrFile = fileName.split(".");
  const extension = arrFile.pop();
  return {
    extension: extension,
    result: EXTENSIONS.includes(extension),
  };
};

module.exports = checkExtension;
