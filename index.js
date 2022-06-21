const { exec } = require("child_process");
const { Fork } = require("./core/fork/index");
const { CreateDocsData, CreateDocsCerts, CreateCerts } = require("./core/https/index");
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
                        console.log('Création des certificats HTTPS');
                        CreateCerts(Agent);
                    }
                }, 5000);
                setTimeout(() => {
                    Fork('api');
                }, 5000);
            } else {
                CreateDocsCerts();
                setTimeout(() => {
                    AgentStart();
                }, 30000);

            };
        }
    });
}

// Lancement du coeur
AgentStart();