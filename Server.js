//Server Listener requires ./src/app.js

var http = require('http');
var app = require("./src/app");

server = http.createServer(app);
server.listen('80');
console.log("Express server listening on port 80");