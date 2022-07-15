// CONST
const { fork } = require("child_process");
const fs = require("fs");

const { Logs } = require("../logs/index");
const Mod = 'CORE: (FORK)';

// FUNCTION
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
    fs.writeFileSync("./data/fork_data/" + apps + "_child.json", dataJSON);
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

function ForkAll() {
    // LISTING DES MODULES ET LANCEMENT
    const dir = 'modules/';
    fs.readdir(dir, (err, files) => {
        let countDATA = Object.keys(files).length;
        for (let i = 0; i < countDATA; i++) {
            const file = files[i];
            // Création de la variable child
            const child = fork('modules/' + apps + '/index.js');
            // UPDATE OR CREATE JSON
            let idChild = child.pid
            WriteChildData(apps, idChild, 1);
            child.on('spawn', function() {
                // Indication que le module est allumé dans la console
                Logs(Mod, 'info', 'Lancement du module ": ' + apps + '"');
            });
            // En cas de fermeture du NODE ---
            child.on("close", function(code) {
                Logs(Mod, 'warn', 'Arrêt du module ": ' + apps + '" || Code: ' + code);
                WriteChildData(apps, idChild, 0);
                // ForkReboot(apps);
            });
        }
    });
}

function ForkManuel(apps) {
    // Création de la variable child
    const child = fork('modules/' + apps + '/index.js');
    // UPDATE OR CREATE JSON
    let idChild = child.pid
    WriteChildData(apps, idChild, 1);
    child.on('spawn', function() {
        // Indication que le module est allumé dans la console
        Logs(Mod, 'info', 'Lancement du module ": ' + apps + '"');
    });
    // En cas de fermeture du NODE ---
    child.on("close", function(code) {
        Logs(Mod, 'info', 'Arrêt du module ": ' + apps + '" || Code: ' + code);
        WriteChildData(apps, idChild, 0);
        // ForkReboot(apps);
    });
}

module.exports = { ForkCore, ForkManuel, ForkAll }