"use strict";

const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    /* response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler */
    response.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});