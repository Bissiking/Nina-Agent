const express = require('express');
const res = require('express/lib/response');
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const osu = require('node-os-utils');

const { Logs } = require("../logs/index");
const Mod = 'CORE: (API)';

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
// ----------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/test', function(req, res) {
    res.send("ok");
});

app.post('/api-clone', function(req, res) {
    CloneAPI(res);
});

// System USE
app.get("/system/cpu-use", function(req, res) {
    var cpu = osu.cpu
    cpu.usage().then(info => {
        res.json(info);
    })
});

app.get("/system/ram-use", function(req, res) {
    var mem = osu.mem
    mem.info()
        .then(info => {
            res.json(info);
        })
});

// NEW CONFIG
app.post('/config', function(req, res) {
    let reqBody = req.body;

    switch (reqBody.config) {
        case 'check':
            Logs(Mod, 'info', 'Demande de vérification de connectivité de la part de Nina');
            res.send("ok");
            break;

        case 'newAgent':
            let datainfoJSON = JSON.stringify(reqBody.AgentData);
            let datainfoObject = JSON.parse(datainfoJSON);
            // Converting js object into JSON string
            // and writting to data.json file
            let dataJSON = JSON.stringify(datainfoObject);
            // Ecriture du fichier
            fs.writeFileSync("./data/agent_data/agent.json", dataJSON);
            Logs(Mod, 'info', 'Réception de la configuration de l\'agent et écriture de la configuration');
            res.send("ADD");
            break;

        default:
            Logs(Mod, 'fatal', 'Echec de l\'insription de l\'agent auprès de Nina');
            res.send("STOP");
            break;
    }
});

// NEW CONFIG
app.post('/update', function(req, res) {
    UPDATE(res);
});


module.exports = app;