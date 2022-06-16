const http = require('http');
const app = require('./app');

// Recupe config Agent
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

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('API:' + bind);
});

server.listen(port);