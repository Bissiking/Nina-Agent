const { exec } = require("child_process");
const { Fork } = require("./core/fork/index");
const fs = require('fs');

function AgentStart() {
    exec('npm i', (error, stdout, stderr) => {
        if (error) {
            console.error('Echec du lancement de la commande');
            console.error(`exec error: ${error}`);
            return;
        } else {
            // Using fs.exists() method
            if (fs.existsSync('./data/data.conf')) {
                console.log(exists ? 'Found' : 'Not Found!');
            } else {
                setTimeout(() => {
                    Fork('api');
                }, 5000);
            };
        }
    });
}

// Lancement du coeur
AgentStart();