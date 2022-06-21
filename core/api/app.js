const express = require('express');
const res = require('express/lib/response');
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const osu = require('node-os-utils');


// FUNCTIONS
function CloneAPI(res) {
    exec('cd modules && git clone https://github.com/BissiGIT/agent-api.git', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('installed');
    });
}

function UPDATE(res) {
    exec('git pull', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Mise à jour');
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
    console.log(req.body);
    let reqBody = req.body;

    switch (reqBody.config) {
        case 'check':
            res.send("ok");
            break;

        case 'newAgent':
            console.log("okcool");
            let datainfoJSON = JSON.stringify(reqBody.AgentData);
            let datainfoObject = JSON.parse(datainfoJSON);
            // Converting js object into JSON string
            // and writting to data.json file
            let dataJSON = JSON.stringify(datainfoObject);
            // Ecriture du fichier
            fs.writeFileSync("./data/agent_data/agent.json", dataJSON);
            res.send("ADD");
            break;

        default:
            res.send("STOP");
            break;
    }
});

// NEW CONFIG
app.post('/update', function(req, res) {
    UPDATE(res);
});


module.exports = app;