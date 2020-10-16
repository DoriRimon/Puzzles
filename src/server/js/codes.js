const fs = require("fs");

const codes = {};

export default function getCode(botName) {
    return codes[botName];
}

fs.readdir("./src/server/js/bots/", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        console.log(file)
        fileName = file.split(".")[0];
        fs.readFile(`./src/server/js/bots/${file}`, 'UTF-8', (err, code) => {
            if (err) throw err;
            codes[fileName] = code;
          });
        
    });
})