const http = require('http');
var https = require('https');
const app = require('./app');
const fs = require('fs');

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

// SERVEUR HTTP
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : port;
    console.log('API:' + bind);
});
server.listen(port);