const fs = require("fs");
const file = require("./file");
const folder = require("./folder");
const path = require("path");

function resetOptions(options) {
    /**
     * resets all options to defaults
     */
    options.input = "";
    options.output = "dist";
    options.stylesheet = "";
    options.lang = "en-CA";
}

function readConfig(options) {
    /**
     * reads options from config json file
     * overwrites existing options
     */
    if (fs.existsSync(options.config)) {
        if (path.extname(options.config) == '.json') {
            resetOptions(options);
            var config;
            try {
                config = JSON.parse(fs.readFileSync(options.config));
            } catch (error) {
                console.error("config file is not a properly formatted JSON");
                process.exit(1);
            }
            

            if (config.input) {
                console.log(config.input);
                options.input = config.input;
            }
            if (config.output) {
                console.log(config.output);
                options.output = config.output;
            }
            if (config.lang) {
                console.log(config.lang);
                options.lang = config.lang;
            }
            if (config.stylesheet) {
                console.log(config.stylesheet);
                options.stylesheet = config.stylesheet;
            }
        }
        else{
            console.error("config file is not a JSON");
            process.exit(1);
        }
    }
    else {
        console.error("no such config file");
        process.exit(1);
    }
}

module.exports = { readConfig };