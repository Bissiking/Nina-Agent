const http = require('http');
var https = require('https');
const app = require('./app');
const fs = require('fs');


// var privateKey = fs.readFileSync('./core/https/certs/custom.key');
// var certificate = fs.readFileSync('./core/https/certs/custom.crt');
// var credentials = { key: privateKey, cert: certificate };

// Recupe config Agent
const port = require('../modules.json');
const API_Port = port.module.port

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(API_Port ||  '8080');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    switch (error.code) {
        case 'EACCES':
            Logs(Mod, 'fatal', 'Prévilège plus élevé demandé');
            process.exit(1);

        case 'EADDRINUSE':
            Logs(Mod, 'fatal', 'Le port est déjà utilisé');
            process.exit(1);

        default:
            throw error;
    }
};

const server = http.createServer(app);
// const serverhttps = https.createServer(credentials, app);

// SERVEUR HTTP
server.on('error', errorHandler);
server.on('listening', () => {
    Logs(Mod, 'info', 'API ouvert sur le port:'+ port);
});
server.listen(port);

// // SERVEUR HTTPS
// var porthttps = '8443';
// serverhttps.on('error', errorHandler);
// serverhttps.on('listening', () => {
//     const address = serverhttps.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + porthttps;
//     console.log('API:' + bind);
// });

// serverhttps.listen(porthttps);