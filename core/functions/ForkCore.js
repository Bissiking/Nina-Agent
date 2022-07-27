// CONST
const { fork } = require("child_process");
const fs = require("fs");
const { WriteDocs } = require("./SysCore");
const { Logs } = require("../logs/index");
const Mod = 'ForkCore';

// Function
function WriteChildData(apps, idChild, statut) {
    // Remplissage des informations dans le fichier JSON
    var dataFork = {
            id: apps,
            node_number: idChild,
            statut: statut,
            date_statut: new Date(),
        }
        // Conversion
    const forkinfoJSON = JSON.stringify(dataFork);
    const forkinfoObject = JSON.parse(forkinfoJSON);
    // Converting js object into JSON string
    // and writting to data.json file
    const dataJSON = JSON.stringify(forkinfoObject);
    // Ecriture du fichier
    WriteDocs("./data", "./data/fork_data");
    fs.writeFileSync("./data/fork_data/" + apps + "_child.json", dataJSON);
}

function ChildOn(child, Mod, apps, idChild) {
    child.on('spawn', function() {
        // Indication que le module est allumé dans la console
        WriteChildData(apps, idChild, 1);
        Logs(Mod, 'info', 'Lancement du module ": ' + apps + '"');
    });
}

function ChildStop(child, Mod, apps, idChild) {
    child.on("close", function(code) {
        Logs(Mod, 'info', 'Arrêt du module ": ' + apps + '" || Code: ' + code);
        WriteChildData(apps, idChild, 0);
    });
}

// function ForkReboot(apps, data) {
//     // Checkup du nombre de test effectué
//     setTimeout(function() {
//         Fork(apps);
//     }, 15000);
// }

function ForkCore(apps) {
    // Création de la variable child
    const child = fork('core/' + apps + '/index.js');
    // UPDATE OR CREATE JSON
    let idChild = child.pid
    WriteChildData(apps, idChild, 1);
    child.on('spawn', function() {
        // Indication que le module est allumé dans la console
        Logs(Mod, 'info', 'Lancement de "Core: ' + apps + '"');
    });
    // En cas de fermeture du NODE ---
    child.on("close", function(code) {
        Logs(Mod, 'warn', 'Arrêt de "Core: ' + apps + '"');
        WriteChildData(apps, idChild, 0);
        // ForkReboot(apps);
    });
}

function ForkStart(apps) {
    // Création de la variable child
    const child = fork('modules/' + apps + '/index.js');
    // UPDATE OR CREATE JSON
    let idChild = child.pid
    ChildOn(child, "info", apps, idChild);
    // En cas de fermeture du NODE ---
    ChildStop(child, "info", apps, idChild);
}

module.exports = { ForkCore, ForkStart }