const { exec } = require("child_process");
const fs = require('fs');

const { Logs } = require("../logs/index");
const Mod = 'CORE: (UPDATE)';


function AgentUP(res) {
    exec('git pull', (error, stdout, stderr) => {
        if (error) {
            res.send('ERROR');
            Logs(Mod, 'fatal', `Echec de l'installation de la mise à jour de l'agent || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
            return;
        } else {
            exec('npm i', (error, stdout, stderr) => {
                if (error) {
                    res.send('ERROR');
                    Logs(Mod, 'fatal', `Echec de l'installation de la mise à jour de l'agent || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
                    return;
                } else {
                    res.send('Mise à jour terminé');
                }
            });
        }
    });
}

function ModuleUP(res, apps) {
    if (fs.existsSync('./modules/agent-' + apps)) {
        exec('cd modules/agent-' + apps + ' && git pull', (error, stdout, stderr) => {
            if (error) {
                res.send('ERROR');
                Logs(Mod, 'fatal', `Echec de l'installation de la mise à jour du module || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
                return;
            } else {
                res.send(apps + ' -> Mis à jour');
            }
        });
    } else {
        Logs(Mod, 'warn', `Echec de l'installation de la mise à jour du module || Module non installé`)
        res.send('STOP');
    }
}


// UPDATE
function UPDATE(res, data) {
    if (data.app != '' ||
        data.app != undefined) {
        if (data.app == 'agent') {
            Logs(Mod, 'info', `Demande de mise à jour de l'agent`)
            AgentUP(res);
        } else {
            Logs(Mod, 'info', `Demande de mise à jour d'un module`)
            ModuleUP(res, data.app)
        }
    }
}

module.exports = { UPDATE };