var http = require('http');
var app = require('./app');

var server = http.createServer(app)
    .listen(3000)
    .on('error', onError)
    .on('listening', onListening);

function onListening() {
    var port = server.address().port;

    console.log('Listening on http://localhost:%s', port);
}

function onError(error) {
    var port = server.address().port;

    if (error.syscall !== 'listen')
        throw error;

    switch (error.code) {
        case 'EACCES':
            console.error('Port ' + port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port ' + port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}