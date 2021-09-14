#! /usr/bin/env node

const { program } = require("commander");
const fileFolder = require("./fileFolder/index");

program.version('0.0.1', '-v, --version','shows the current version of the commandline-ssg tool');

program
    .option("-i, --input <type>", "enter the file/folder name to generate its HTML files")
    .option("-o, --output <type>", "to enter the output folder", "dist")
    .option("-s, --stylesheet <type>", "to enter the stylesheet URL/file", "")
    .action((options) =>{
        fileFolder(options)
    });

program.parse(process.argv);