// CONST
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);

// Recupe config Agent
const AgentConfig = require('../../functions/config/index');
AgentConfig();
AgentPort = data.port.http;

// set the view engine to ejs
app.set('view engine', 'ejs');

// SOCKET IO
const { Server } = require("socket.io");
const io = new Server(server);

// AXIOS
const axios = require("axios");

// ROUTE
app.get('/', function(req, res) {
    res.render('pages/index');
});

// Start server WEB
server.listen(AgentPort, () => {
    console.log('HTTP:' + AgentPort);
});

// PING Website
app.get("/promise", (req, res) => {
    axios({
            url: "https://cr.mhemery.com/teszt",
            method: "HEAD",
        })
        .then(response => {
            res.status(200).json("200");
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// SIMPLE PING
// const pinger = require("simple-web-pinger")
// pinger.webserver(6100) // Create webserver on port 6100
// var pingOUT = pinger.ping("https://cetih.mhemery.com/?p=connexion&redirect=1", 6000, false, "TEST")

// setInterval(function() {
//     console.log(pingOUT);
// }, 6000);


// app.get('/ping', (req, res, next) => {
//     var OUTPING = OUTPUT;
//     res.status(200).json(stuff);
// });