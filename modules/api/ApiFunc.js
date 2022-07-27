// FUNCTIONS
function CloneAPI(res) {
    exec('cd modules && git clone https://github.com/BissiGIT/agent-api.git', (error, stdout, stderr) => {
        if (error) {
            res.send('ERROR');
            Logs(Mod, 'fatal', `Echec de l'installation du module "API" || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
            return;
        } else {
            res.send('installed');
        }
    });
}

function UPDATE(res) {
    exec('git pull', (error, stdout, stderr) => {
        if (error) {
            res.send('ERROR');
            Logs(Mod, 'fatal', `Echec de l'installation de la mise à jour de l'agent || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
            return;
        } else {
            res.send('Mise à jour');
        }
    });
}