const path = './functions/config/config.json';
const { fork } = require("child_process");
const fs = require("fs");

if (fs.existsSync(path)) {
    // Création de la variable child
    const AgentConfig = require(path);
    const data = AgentConfig.agent;
    // // FORK Module
    const ForkInit = require('./functions/config/index');
    ForkInit(data); // HTTP MODULE
    child.on("close", function(code) {
        console.log("Alerte - Module arrêté. Redémarrage manuel nécéssaire || Code: " + code);
    });
} else {
    console.log('Fichier de config non trouvé');
    const ForkInit = require('./functions/config/index');
    ForkInit(data); // HTTP MODULE
    child.on("close", function(code) {
        console.log("Alerte - Module arrêté. Redémarrage manuel nécéssaire || Code: " + code);
    });
}