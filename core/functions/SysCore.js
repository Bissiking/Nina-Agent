// const { exec } = require("child_process");
const fs = require('fs');
const { Logs } = require("./LogCore");
const Mod = 'SysCore';

// FUNCTIONS
function WriteDocs(Docs, DocsTwo) { // Ecriture du dossier data
    if(!fs.existsSync(Docs)){
        fs.mkdirSync(Docs);
    }
    if (DocsTwo != undefined && !fs.existsSync(DocsTwo)) {
        fs.mkdirSync(DocsTwo);
    }
}

module.exports = { WriteDocs }
