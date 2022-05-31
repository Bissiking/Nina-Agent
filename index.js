const path = './functions/config/config.json';
const { fork } = require("child_process");

if (fs.existsSync(path)) {
    console.log('ok');
    const AgentConfig = require(path);
    const data = AgentConfig.agent;
    // // FORK Module
    const ForkInit = require('./modules/fork/NEWindex');
    ForkInit(data); // HTTP MODULE
} else {
    console.log('Fichier de config non trouvé');
    // Création de la variable child
    if (fs.existsSync(path)) {
        child.on("close", function(code) {
            console.log("Alerte - Module arrêté. Redémarrage manuel nécéssaire || Code: " + code);
        });
    }




    // // FORK Module
    // const ForkInit = require('./functions/fork/index');

    // // ------------------------------------------------------ //
    // // Execute FORK Modules

    // ForkInit('http'); // DISCORD MODULE
}