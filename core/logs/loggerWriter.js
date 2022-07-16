const fs = require("fs");

function LogWriter(logPush) {
    // Vérification de la présence des logs
    if (!fs.existsSync('./data/logs/logs.json')) {
        let logsDataStart = { "Logs": [] }
        let datainfoJSON = JSON.stringify(logsDataStart);
        let datainfoObject = JSON.parse(datainfoJSON);
        // Converting js object into JSON string
        // and writting to data.json file
        let dataJSON = JSON.stringify(datainfoObject);
        // Ecriture des logs
        fs.writeFileSync("./data/logs/logs.json", dataJSON);
    }

    // Récupération du fichier LOGS
    let logsData = fs.readFileSync("./data/logs/logs.json");
    // Mise en OBJ
    var logobj = JSON.parse(logsData);
    // PUSH TO VARIABLE
    logobj['Logs'].push(logPush);
    // Mise en Strg
    jsonStr = JSON.stringify(logobj);
    // Ecriture des logs
    fs.writeFileSync("./data/logs/logs.json", jsonStr);
}

module.exports = { LogWriter }