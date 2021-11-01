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

function parseFile(options){
    /**
     * Checks if the file is txt or md
     * Parses the file and generates html if the extension is supported
     * Logs an error message if file format is invalid
     */
    if(path.extname(options.input) == '.txt'){
        parseTxttoHTML(options);
    }
    else if(path.extname(options.input) == '.md'){
        parseMdToHTML(options);
    }
    else{
        console.log(`"${path.basename(options.input)}" is not a supported format. Please use a .txt or .md file!`)
        process.exit(1);
    }
}

function parseMdToHTML(options){
    /**
     * create new html file at the destination
     * Parse the data from md file and add it to the html file
     */
    const {input: filename, output: destination, stylesheet, lang} = options;
    fs.readFile(filename, 'utf-8',  function(err, data){

        if(err){
            console.error(err);
        }
        else{
          
            const title = data.match(/^# (.*$)/gim);
            const body = data
                .replace(/(^[a-z](.*)$)/gim,'<p>$1</p>')
                .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
                .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
                .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '')
                .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                .replace(/\_\_(.*)\_\_/gim, '<b>$1</b>')
                .replace(/\_(.*)\_/gim, '<i>$1</i>')
                .replace(/\*(.*)\*/gim, '<i>$1</i>')
                .replace(/\~\~(.*)\~\~/gim, '<del>$1</del>')
                .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
                .replace(/^<http(.*)$/gim, "<a href='http$1'>http$1</a>")
                .replace(/^> (.*$)/gim, '<code>$1</code>')
                
                


          
                const toReturn = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${title[0].slice(2)}</title><link rel="stylesheet" href="${stylesheet}"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>${title[0].slice(2)}</h1> ${body} </body></html>`;
                const newFilePath = path.join(process.cwd(), destination, path.basename(filename, '.md')) + ".html";
            
                fs.writeFile(newFilePath, toReturn, function (err){
                    if(err) throw err;
                    //console.log("file created!")
                });
          
        }    
    }) 
}

function parseTxttoHTML(options){

    /**
     * Create new html file at the destination
     * Parse the data from txt file and add it to the html file
     */
    const {input: filename, output: destination, stylesheet, lang} = options;
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
            
            const toReturn = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${stylesheet}"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>${title}</h1> ${html} </body></html>`;
            const newFilePath = path.join(process.cwd(), destination, path.basename(filename, '.txt')) + ".html";
            
            fs.writeFile(newFilePath, toReturn, function (err){
                if(err) throw err;
                //console.log("file created!")
            });

        }    
    }) 
}



module.exports = {parseFile};