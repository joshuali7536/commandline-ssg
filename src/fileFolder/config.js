const fs = require("fs");
const file = require("./file");
const folder = require("./folder");
const path = require("path");

function readConfig(file){
    if (fs.existsSync(options.config)){
        var config = JSON.parse(fs.readFileSync(options.config));
        console.log(config.input);
        console.log(config.lang);
        console.log(config.output);
        console.log(config.stylesheet);
    }
    else {
        console.error("no such config file");
        process.exit(1);
    }
}

module.exports = {readConfig};