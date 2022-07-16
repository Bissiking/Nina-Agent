const express = require('express');
const res = require('express/lib/response');
const app = express();

const { UPDATE } = require("./FunUpdate");

// ----------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    const allowedOrigins = ['http://45.155.170.223', 'http://localhost', 'http://127.0.0.1'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// NEW CONFIG
app.post('/update', function(req, res) {
    let data = req.body
    UPDATE(res, data);
});


module.exports = app;