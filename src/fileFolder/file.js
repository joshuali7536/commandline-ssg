const path = require("path");
const fs = require("fs");

function isTxtFile(file){
    /**
     * check if the file is text file or no
     */
    if(path.extname(file) == '.txt')
        return true;    
    else
        return false;    
}

function parseTxttoHTML(filename, destination, stylesheet){

    /**
     * check if the file received is text file
     * create new html file at the destination
     * parse the data and add it to the html file
     */

    if(isTxtFile(filename)){
            
        fs.readFile(filename, 'utf-8',  function(err, data){

            if(err){
                console.error(err);
            }
            else{
                data = data + '';

                // NOTE: If the parsing do not work properly, change \r\n to \n.
                const title = `${data.split("\r\n\r\n\r\n", 1)}`;

                const okokok = data.slice(data.search("\r\n\r\n\r\n") + 3);
                const html = okokok.split(/\r?\n\r?\n/)
                    .map(para =>
                    `<p>${para.replace(/\r?\n/, ' ')}</p>`
                    ).join(' ');
                
                const toReturn = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${stylesheet}"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>${title}</h1> ${html} </body></html>`;
                const newFilePath = path.join(process.cwd(), destination, path.basename(filename, '.txt')) + ".html";
                
                fs.writeFile(newFilePath, toReturn, function (err){
                    if(err) throw err;
                    //console.log("file created!")
                });

            }    
        })        

    }
    else{
        console.log(`"${path.basename(filename)}" is not a text file. Please enter a text file.`)
    }
}



module.exports = {parseTxttoHTML};