const fs = require("fs");
const file = require("./file");
const folder = require("./folder");
const path = require("path");
const config = require("./config");


function fileFolder(options) {
    /**
     * create the destination folder
     * if file, directly send the call to parse the text
     * if folder, create the index file, send the call to loop through the folder
     */
    if (options.config) {
        console.log("Entered config");
        //config.readConfig(options.config);

        if (fs.existsSync(options.config)) {
            var config = JSON.parse(fs.readFileSync(options.config));

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
        else {
            console.error("no such config file");
            process.exit(1);
        }


    }

    folder.createDestination(options.output);

    if (fs.existsSync(options.input)) {

        const stats = fs.statSync(options.input);
        if (stats.isFile()) {
            options.input = process.cwd() + '\\' + options.input;
            file.parseFile(options);
        }
        else {

            const indexFilePath = path.join(process.cwd(), options.output, 'index.html');
            const toReturn = `<!doctype html><html lang="${options.lang}"><head><meta charset="utf-8"><title>Index file</title><link rel="stylesheet" href="${options.stylesheet}"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>`;

            fs.writeFileSync(indexFilePath, toReturn, function (err) {
                if (err) throw err;
                console.log("HTML file created!")
            });
            folder.loopThroughAllFiles(options);

            const endingReturn = `</body></html>`;
            fs.appendFileSync(indexFilePath, endingReturn, function (err) {
                if (err) throw err;
                console.log("HTML file successfullly completed");
            })

        }

    }
    else {
        console.error("no such file/folder");
        process.exit(1);
    }
}

module.exports = fileFolder;