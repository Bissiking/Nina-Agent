const express = require('express');
const res = require('express/lib/response');
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const osu = require('node-os-utils');

// const { Logs } = require("../logs/index");
// const Mod = 'CORE: (API)';

// FUNCTIONS
// function CloneAPI(res) {
//     exec('cd modules && git clone https://github.com/BissiGIT/agent-api.git', (error, stdout, stderr) => {
//         if (error) {
//             res.send('ERROR');
//             Logs(Mod, 'fatal', `Echec de l'installation du module "API" || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
//             return;
//         } else {
//             res.send('installed');
//         }
//     });
// }

// function UPDATE(res) {
//     exec('git pull', (error, stdout, stderr) => {
//         if (error) {
//             res.send('ERROR');
//             Logs(Mod, 'fatal', `Echec de l'installation de la mise à jour de l'agent || exec error: ${error} || OUT COMMAND: ${stdout} || OUT ERR: ${stderr}`)
//             return;
//         } else {
//             res.send('Mise à jour');
//         }
//     });
// }
// ----------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// API

app.get('/test', function(req, res) {
    res.send("ok");
});

// app.post('/api-clone', function(req, res) {
//     CloneAPI(res);
// });

// System USE
app.get("/system/cpu", function(req, res) {
    var cpu = osu.cpu
    cpu.usage().then(info => {
        res.json(info);
    })
});

app.get("/system/ram", function(req, res) {
    var mem = osu.mem
    mem.info()
        .then(info => {
            res.json(info);
        })
});

app.get("/system/disk", function(req, res) {
	if (os.type == "Linux") {
		var drive  = osu.drive 
		drive.info().then(info => {
			// Logs(Mod, 'info', 'Demande de récupération du CPU');
			res.json(info);
		});
	}else{
		res.json('stop');
	}
});
// NEW CONFIG
// app.post('/update', function(req, res) {
//     UPDATE(res);
// });


module.exports = app;