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

module.exports = app;