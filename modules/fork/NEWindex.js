// CONST
const { fork } = require("child_process");
const fs = require("fs");
const path = 'modules/agent-website';
const gitPullOrClone = require('git-pull-or-clone');
// VAR
var AutoStart,
    RebootTest = 0;

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
    fs.writeFileSync("./data/fork/" + apps + "_child.json", dataJSON);
}

function ForkInit(data) {
    if (fs.existsSync(path)) {
        const modules = require('./modules.json');
        // ROOTEUR  
        var count = Object.keys(modules).length; // Nombre de TBL
        var modulesTBL = Object.keys(modules); // CHEPLU
        for (var i = 0; i < count; i++) {
            let apps = modulesTBL[i]; // Nom du TBL
            let modData = modules[modulesTBL[i]]; // Information du TBL
            if (modData.actived == true) {
                // Création de la variable child
                const child = fork(modData.root);
                // Indication que le module est allumé dans la console
                console.log("Module " + apps + " initialisé || Node:" + child.pid);
                // UPDATE OR CREATE JSON
                let idChild = child.pid
                WriteChildData(apps, idChild, 1);
                const jData = [data];
                child.send({ 'data': jData });
                // En cas de fermeture du NODE ---
                child.on("close", function(code) {
                    console.log("Alerte - Module arrêté || Code: " + code);
                    WriteChildData(apps, idChild, 0);
                });
            }
        }
    } else {
        console.log('Téléchargement du module HTTP');
        gitPullOrClone('https://github.com/Bissiking/agent-website.git', './modules', (err) => {
            if (err) throw err
            console.log('SUCCESS!');
        });
        console.log("Création du routeur");
        // Création du JSON modules
        var dataFork = {
                "website": {
                    "root": "./modules/website/index.js",
                    "actived": true
                }
            }
            // Conversion
        const forkinfoJSON = JSON.stringify(dataFork);
        const forkinfoObject = JSON.parse(forkinfoJSON);
        // Converting js object into JSON string
        // and writting to data.json file
        const dataJSON = JSON.stringify(forkinfoObject);
        // Ecriture du fichier
        fs.writeFileSync("modules/fork/modules.json", dataJSON);
        setTimeout(() => {
            ForkInit();
        }, 1000);
    }
}


https: //github.com/Bissiking/agent-website.git


    module.exports = ForkInit;