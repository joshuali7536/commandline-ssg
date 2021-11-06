#! /usr/bin/env node

const { program } = require("commander");
const fileFolder = require("./fileFolder/index");
const pjson = require("./../package.json");

program.version(
  pjson.version,
  "-v, --version",
  "shows the current version of the commandline-ssg tool"
);

program
  .option(
    "-i, --input <type>",
    "enter the file/folder name to generate its HTML files"
  )
  .option("-o, --output <type>", "enter the output folder", "dist")
  .option("-s, --stylesheet <type>", "enter the stylesheet URL/file", "")
  .option("-l, --lang <type>", "enter the language of the document", "en-CA")
  .option(
    "-c, --config <type>",
    "enter a JSON config file to generate HTML files from it"
  )
  .action((options) => {
    fileFolder(options);
  });

program.parse(process.argv);
