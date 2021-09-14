const fs = require("fs");
const path = require("path")
const file = require("./file");

function loopThroughAllFiles(options, otherFolderPath= ""){ // this is a recursive function
    /**
     * loop throught all the folder contents
     * if a file, send the call to parse the file, append the index.html file
     * if a folder, loop that folder.
     */
    const folderPath = process.cwd() + '\\' + options.input+ '\\' + otherFolderPath;
    fs.readdirSync(folderPath).forEach(filename => {
        const stats = fs.statSync(folderPath +"\\"+ filename);
        if(stats.isFile()){
            file.parseTxttoHTML(folderPath +"\\"+ filename, options.output, options.stylesheet);
            const toReturn = `<h1><a href="${process.cwd() + '\\' + options.output +'\\' + path.basename(filename, '.txt') + ".html"}">${path.basename(filename, '.txt')}</a></h1>`;
            const filePath = process.cwd() + '\\' + options.output +'\\' + 'index.html';
            fs.appendFileSync(filePath, toReturn, function(err) {
                if(err) throw err;
                console.log("HTML file successfullly completed");
            })
        }
        else{
            loopThroughAllFiles(options, otherFolderPath + '\\' + filename);
        }
        //console.log(filename);
    });
}

function createDestination(destination){
    /**
     * delete if destination already exist
     * create destination folder
     */

    try{
        fs.rmSync(path.join(process.cwd(), destination), {recursive: true}, (err) =>{
            if(err){
                throw err;
            }
            console.log("directory removed!");
        })
    }
    catch(err){
        
    }
    fs.mkdirSync(path.join(process.cwd(), destination), {recursive: true}, (err) =>{
        if(err){
            throw err;
        }
        console.log("Folder added!!!")
    })

}

module.exports = {createDestination, loopThroughAllFiles};