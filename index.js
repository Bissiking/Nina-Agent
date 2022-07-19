const { exec } = require("child_process");
const { ForkAll, ForkCore } = require("./core/fork/index");
const { Logs } = require("./core/logs/index");
const Mod = 'Noyau';
const fs = require('fs');

function AgentStart() {
    // rm -Rf node_modules/ &&
    exec(' npm i', (error, stdout, stderr) => {
        if (error) {
            Logs(Mod, 'fatal', `Echec du lancement de la commande || exec error: ${error}`)
            return;
        } else {
            if (!fs.existsSync('./data/fork_data')) {
                fs.mkdirSync('./data/fork_data');
                Logs(Mod, 'info', 'Création du dossier "fork_data"');
            }
            if (!fs.existsSync('./data/agent_data')) {
                fs.mkdirSync('./data/agent_data');
                Logs(Mod, 'info', 'Création du dossier "agent_data"');
            }
            if (!fs.existsSync('./data/logs')) {
                fs.mkdirSync('./data/logs');
                Logs(Mod, 'info', 'Création du dossier "logs"');
            }
            const path = require('path');
            const directory = './data/fork_data';
            fs.readdir(directory, (err, files) => {
                if (err) { Logs(Mod, 'fatal', `Dossier introuvable || error: ${err}`) } else {
                    Logs(Mod, 'info', `Dossier "data/fork_data" trouvé`)
                };
                for (const file of files) {
                    if (file != 'fork_data.txt') {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) { Logs(Mod, 'fatal', `Echec de la suppression du dossier || error: ${err}`) } else {
                                Logs(Mod, 'info', 'Suppression du ficher "fork_data.txt" réussie');
                            };
                        });
                    }
                }
            });


            ForkCore('api');
            ForkCore('update');
            ForkCore('data');
            if (!fs.existsSync('./modules')) {
                fs.mkdirSync('./modules');
                Logs(Mod, 'info', 'Création du dossier "modules"');
                ForkAll();
            } else {
                ForkAll();
            }
        }
    });
}

AgentStart();