const http = require('http');
var https = require('https');
const app = require('./app');
const fs = require('fs');


// var privateKey = fs.readFileSync('./core/https/certs/custom.key');
// var certificate = fs.readFileSync('./core/https/certs/custom.crt');
// var credentials = { key: privateKey, cert: certificate };

// Recupe config Agent
const AgentConfig = require('./config.json');
const AgentPort = AgentConfig.port

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
const port = normalizePort(AgentPort ||  '8080');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);

        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
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
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : port;
    console.log('UPDATE:' + bind);
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