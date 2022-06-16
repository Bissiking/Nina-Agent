const express = require('express');
require('dotenv').config();
const app = express();
// Docker
var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });
// Variables


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', (req, res, next) => {
    console.log('Valide')
    res.status(201).json({
        msg: 'test ok'
    })
});

app.post('/containers', (req, res, next) => {
    let containerName = req.body.name
    let commande = req.body.command
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


                    default:
                        return res.status(500).send("Commande introuvable");
                }
            });
        } else {
            return res.status(500).send("Le container n'existe pas !")
        }
    });
});

module.exports = app;