require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var osu = require('node-os-utils')
    // Docker
var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });
// Variables
var logo = "/public/images/logos/"
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// IMAGES
app.get('/api/images/Nina', (req, res, next) => {
    const imageSend = logo + 'Nina/Nina.png';
    res.sendFile(__dirname + imageSend);
});

app.get('/api/images/Nina60', (req, res, next) => {
    const imageSend = logo + 'Nina/Nina60.png';
    res.sendFile(__dirname + imageSend);
});

app.get('/api/images/Nina150', (req, res, next) => {
    const imageSend = logo + 'Nina/Nina150.png';
    res.sendFile(__dirname + imageSend);
});

app.get('/api/css/Nina', (req, res, next) => {
    const imageSend = '/public/stylesheets/style.css';
    res.sendFile(__dirname + imageSend);
});

// JS Website
app.get('/api/js/Nina', (req, res, next) => {
    const JsSend = '/public/javascripts/index.js';
    res.sendFile(__dirname + JsSend);
});

// System USE
app.get("/api/cpu-use", function(req, res) {
    var cpu = osu.cpu
    cpu.usage().then(info => {
        res.json(info);
    })
});

app.get("/api/ram-use", function(req, res) {
    var mem = osu.mem
    mem.info()
        .then(info => {
            res.json(info.usedMemPercentage);
        })
});

app.get("/api/disk-use", function(req, res) {
    var drive = osu.drive
    drive.info()
        .then(info => {
            res.json(info.usedPercentage);
        })
});


// CONTAINERS
app.post('/containers', (req, res, next) => {
    let containerName = req.body.name
    let commande = req.body.command
    console.log(req.body);
    const opts = {
        filters: {
            name: [containerName]
        },
        all: true
    }
    docker.listContainers(opts, function(err, containers) {
        // Conversion de la variable en string
        let ContainerString = containers.toString();
        // Checkup de la variable
        if (ContainerString == "") {
            containers = null;
        }
        // Verification de la variable. Si null erreur
        if (containers !== null) {
            containers.forEach(function(containerInfo, next) {
                var container = docker.getContainer(containerInfo.Id);
                switch (commande) {
                    case 'start':
                        if (containerInfo.State === "running") {
                            return res.status(500).send("Le container est déjà allumé");
                        } else {
                            container.start(next);
                            return res.status(200).send("Démarrage du container");
                        }
                    case 'stop':
                        if (containerInfo.State === "exited") {
                            return res.status(500).send("Le container est déjà arrêté");
                        } else {
                            container.stop(next);
                            return res.status(200).send("Arrêt du container - 1 Minute environ");
                        }

                    case 'restart':
                        if (containerInfo.State === "exited") {
                            return res.status(500).send("Le container est déjà arrêté");
                        } else {
                            container.restart(next);
                            return res.status(200).send("Redémarrage du container - 1 Minute environ");
                        }

                    case 'test':
                        if (containerInfo.State === "exited") {
                            return res.status(500).send("Le container est arrêté");
                        } else {
                            let stats = container.stats(next);
                            // return res.status(200).send("Arrêt du container - 1 Minute environ");
                            console.log(stats);
                            break;
                        }

                    default:
                        return res.status(500).send("Commande introuvable");
                }
            });
        } else {
            console.log('ERROR 01')
            return res.status(500).send("Le container n'existe pas !")
        }
    });
});

module.exports = app;