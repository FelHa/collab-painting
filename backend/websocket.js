'use strict';

const socketIo = require('socket.io');

const injectWebSocket = (httpServer) => {
  const io = socketIo(httpServer);

  const clients = {};

  const getOtherClients = (id) =>
    Object.keys(clients).filter((socket) => socket !== id);

  io.on('connect', (socket) => {
    clients[socket.id] = socket;

    console.log(
      `${socket.id} connected. ${
        Object.keys(clients).length
      } users(s) in total.`
    );

    socket.emit('connected', socket.id);

    socket.on('signed', (name) => {
      clients[socket.id].userName = name;
      socket.emit('signed');
      io.emit('newUser', name);
    });

    socket.on('disconnect', () => {
      getOtherClients(socket.id).forEach((client) => {
        clients[client].emit('userDisconnected', clients[socket.id].userName);
      });
      delete clients[socket.id];
      console.log(`${socket.id} disconnected`);
    });

    socket.on('mouseOnCanvas', (data) => {
      getOtherClients(socket.id).forEach((client) =>
        clients[client].emit('mouseOnCanvas', data)
      );
    });

    socket.on('colorChanged', (data) => {
      getOtherClients(socket.id).forEach((client) =>
        clients[client].emit('colorChanged', data)
      );
    });

    socket.on('brushChanged', (data) => {
      getOtherClients(socket.id).forEach((client) =>
        clients[client].emit('brushChanged', data)
      );
    });

    socket.on('newMessage', (data) => {
      getOtherClients(socket.id).forEach((client) =>
        clients[client].emit('newMessage', data)
      );
    });
  });
};

module.exports = injectWebSocket;
