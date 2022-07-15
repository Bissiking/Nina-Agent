const fs = require("fs");

function LogWriter(logPush) {
    // Récupération du fichier LOGS
    let logsData = fs.readFileSync("./data/logs/logs.json");
    // Mise en OBJ
    var logobj = JSON.parse(logsData);
    // PUSH TO VARIABLE
    logobj['logs'].push(logPush);
    // Mise en Strg
    jsonStr = JSON.stringify(logobj);
    // Ecriture des logs
    fs.writeFileSync("./data/logs/logs.json", jsonStr);
}

module.exports = { LogWriter }