// START SCRIPT
console.log("Démarrage de l'agent");
// CONST
const fs = require('fs');
const path = './functions/config/config.json';
const { fork } = require("child_process");

if (fs.existsSync(path)) {
    console.log('ok');
} else {
    console.log('Fichier de config non trouvé');
    // Création de la variable child
    const child = fork('./functions/config/index.js');
    // Indication que le module est allumé dans la console
    console.log("Lancement du module de configuration");
    // En cas de fermeture du NODE ---
    child.on("close", function(code) {
        console.log("Alerte - Module arrêté. Redémarrage manuel nécéssaire || Code: " + code);
    });
}




// // FORK Module
// const ForkInit = require('./functions/fork/index');

// // ------------------------------------------------------ //
// // Execute FORK Modules

// ForkInit('http'); // DISCORD MODULE