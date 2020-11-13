'use strict';

const express = require('express');
const http = require('http');
const injectWebSocket = require('./websocket');

// express
const expressServer = express();
expressServer.use(express.static('frontend'));

//http
const httpServer = http.Server(expressServer);

//websocket

injectWebSocket(httpServer);

httpServer.listen(process.env.PORT || 3000, (err) =>
  console.log(err || 'Server running')
);
