const express = require('express');
require('dotenv').config();
const app = express();

// Variables
var logo = "/public/images/logos/"


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/start', (req, res, next) => {
    const { exec } = require('child_process');
    console.log('Starting MC server');
    exec('start start.bat')
});

app.get('/list', (req, res, next) => {
    'use strict';
    const { Docker } = require('node-docker-api');

    const docker = new Docker({ socketPath: '/var/run/docker.sock' });

    // List
    docker.container.list()
        // Inspect
        .then(containers => containers[0].status())
        .then(container => container.top())
        .then(processes => console.log(processes))
        .catch(error => console.log(error));
});

module.exports = app;