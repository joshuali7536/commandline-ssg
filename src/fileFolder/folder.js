const fs = require("fs");
const path = require("path");
const file = require("./file");

function loopThroughAllFiles(options, otherFolderPath = "") {
  // this is a recursive function
  /**
   * loop throught all the folder contents
   * if a file, send the call to parse the file, append the index.html file
   * if a folder, loop that folder.
   */
  const folderPath = path.join(process.cwd(), options.input, otherFolderPath);

  fs.readdirSync(folderPath).forEach((filename) => {
    const stats = fs.statSync(path.join(folderPath, filename));
    if (stats.isFile()) {
      options.input = path.join(folderPath, filename);
      file.parseFile(options);

      let fileBaseName = "";
      if (path.extname(filename) == ".txt")
        fileBaseName = path.basename(filename, ".txt");
      else if (path.extname(filename) == ".md")
        fileBaseName = path.basename(filename, ".md");
      else {
        console.log("Only .txt or .md files are accepted");
        process.exit(1);
      }

      const toReturn = `<h1><a href="${
        path.join(".\\", fileBaseName) + ".html"
      }">${fileBaseName}</a></h1>`;
      const filePath = path.join("./", options.output, "index.html");
      fs.appendFileSync(filePath, toReturn, function (err) {
        if (err) throw err;
        console.log("HTML file successfully completed");
      });
    } else {
      loopThroughAllFiles(options, otherFolderPath + "\\" + filename);
    }
    //console.log(filename);
  });
}

function createDestination(destination) {
  /**
   * delete if destination already exist
   * create destination folder
   */

  try {
    fs.rmdirSync(
      path.join(process.cwd(), destination),
      { recursive: true },
      (err) => {
        if (err) {
          throw err;
        }
        console.log("directory removed!");
      }
    );
  } catch (err) {
    console.error(err);
  }
  fs.mkdirSync(
    path.join(process.cwd(), destination),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("Folder added!!!");
    }
  );
}

module.exports = { createDestination, loopThroughAllFiles };
