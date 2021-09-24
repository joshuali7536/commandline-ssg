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

function parseFile(filename, destination, stylesheet){
    /**
     * Checks if the file is txt or md
     * Parses the file and generates html if the extension is supported
     * Logs an error message if file format is invalid
     */
    if(path.extname(filename) == '.txt'){
        parseTxttoHTML(filename, destination, stylesheet);
    }
    else if(path.extname(filename) == '.md'){
        parseMdToHTML(filename, destination, stylesheet);
    }
    else{
        console.log(`"${path.basename(filename)}" is not a supported format. Please use a .txt or .md file!`)
    }
}

function parseMdToHTML(filename, destination, stylesheet){
    /**
     * create new html file at the destination
     * Parse the data from md file and add it to the html file
     */

     fs.readFile(filename, 'utf-8',  function(err, data){

        if(err){
            console.error(err);
        }
        else{
            const paras = data.split(/\r?\n/);

            let htmlBody = '', title = '';

            //Paragraphs and headings
            paras.forEach(para => {
                para = para.trim();

                if(para[0] == '#'){
                    let level = (para.match(/#/g)||[]).length;

                    htmlBody += level <= 6 ? `<h${level}>${para.slice(level).trim()}</h${level}>` : `<p>${para}</p>`;
                    title = title == '' && level == 1 ? para.slice(level).trim() : title;
                }
                else if(para){
                    htmlBody += `<p>${para}</p>`;
                }
            })

            //Bold
            htmlBody = htmlBody
                .replace(/__(\S[\s\S]*?)__/gim, '<strong>$1</strong>')
                .replace(/\*\*(\S[\s\S]*?)\*\*/gim, '<strong>$1</strong>');

            const toReturn = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>${stylesheet ? `<link rel="stylesheet" href="${stylesheet}">` : ''}<meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${htmlBody}</body></html>`;
            const newFilePath = path.join(process.cwd(), destination, path.basename(filename, '.md')) + ".html";

            fs.writeFile(newFilePath, toReturn, function (err){
                if(err) throw err;
            });
        }    
    }) 
}

function parseTxttoHTML(filename, destination, stylesheet){

    /**
     * Create new html file at the destination
     * Parse the data from txt file and add it to the html file
     */
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



module.exports = {parseFile};