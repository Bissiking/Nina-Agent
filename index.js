const path = './functions/config/config.json';
const { fork } = require("child_process");
const fs = require("fs");

if (fs.existsSync(path)) {
    // Vérification de la présence du module fork
    console.log('Vérification de la présence du module fork');
    let pathFork = './modules/agent-fork';
    if (fs.existsSync(pathFork)) {
        console.log('stepOK');
    } else {
        const gitPullOrClone = require('git-pull-or-clone');
        console.log('Téléchargement et installation du module Fork');
        gitPullOrClone('https://github.com/BissiGIT/agent-fork.git', './modules', (err) => {
            console.log(err);
        });
    }
} else {
    console.log('Fichier de config non trouvé');
    const child = fork('./functions/config/index'); // HTTP MODULE
    child.on("close", function(code) {
        console.log("Alerte - Module arrêté. Redémarrage manuel nécéssaire || Code: " + code);
    });
}