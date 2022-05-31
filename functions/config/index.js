const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);

var public = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// AXIOS
const axios = require("axios");
// Variables
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// ROUTE
app.use('/', express.static(public));
app.get('/', function(req, res) {
    res.render('index', { title: "title" });
});

// Start server WEB
server.listen(6200, () => {
    console.log('HTTP:' + 6200);
});

// ADD CONFIG
app.post("/register", (req, res) => {
    res.status(200).json(req.body);
    let configJSON = req.body
    const fs = require('fs');
    let data = JSON.stringify(configJSON);
    // fs.writeFile('./config/config.json', data);
    fs.copyFile('./functions/config/sample_config.json', './functions/config/config.json', function(err) {
        if (err) console.log('ERROR: ' + err);
    });
    setTimeout(() => {
        fs.writeFile("./functions/config/config.json", data, 'utf8', function(err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }, 1000);

});

app.get("/sync", (req, res) => {
    let JSONAgent = require('./config.json');
    res.json(JSONAgent);
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