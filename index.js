const { exec } = require("child_process");
const { Fork } = require("./core/fork/index");
const { CreateDocsData, CreateDocsCerts } = require("./core/https/index");
const fs = require('fs');

function AgentStart() {
    exec('npm i', (error, stdout, stderr) => {
        if (error) {
            console.error('Echec du lancement de la commande');
            console.error(`exec error: ${error}`);
            return;
        } else {
            CreateDocsData();
            if (fs.existsSync('./core/https/certs')) {
                setTimeout(() => {
                    if (!fs.existsSync('./data/agent_data/agent.json')) {
                        const Agent = './data/agent_data/agent.json';
                        CreateCerts(Agent);
                    }
                }, 3600000);
                setTimeout(() => {
                    Fork('api');
                }, 5000);
            } else {
                CreateDocsCerts();
                console.log('Création des certificats HTTPS');
                setTimeout(() => {
                    AgentStart();
                }, 30000);

            };
        }
    });
}

// Lancement du coeur
AgentStart();