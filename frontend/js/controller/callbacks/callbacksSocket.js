import { getAbsolutePosition } from '../../utils/math.js';

function onSocketConnected(id) {
  this.modell.setClientId(id);
}

function onSocketSigned({ next }) {
  next();
}

function onSocketNewUser(userName) {
  this.views.paint.chat.addMessage(
    'Server',
    `${userName} ist der Session beigetreten`
  );
}

function onSocketUserDisconnected(userName) {
  this.views.paint.chat.addMessage(
    'Server',
    `${userName} hat die Session verlassen`
  );
}

function onSocketCanvasMovement(data) {
  const state = this.modell.state;
  const canvas = this.views.paint.canvas;

  const [absFromX, absFromY] = getAbsolutePosition(
    state.canvas.pos.x,
    state.canvas.pos.y,
    canvas
  );
  const [absToX, absToY] = getAbsolutePosition(data.x, data.y, canvas);

  switch (data.event) {
    case 'mousedown':
      state.canvas.pos.x = data.x;
      state.canvas.pos.y = data.y;
      state.canvas.isDrawing = true;
      break;
    case 'mousemove':
      canvas.ctx.draw(absFromX, absFromY, absToX, absToY);
      state.canvas.pos.x = data.x;
      state.canvas.pos.y = data.y;
      break;
    case 'mouseup':
      canvas.ctx.draw(absFromX, absFromY, absToX, absToY);
      state.canvas.pos.x = 0;
      state.canvas.pos.y = 0;
      state.canvas.isDrawing = false;
      break;
    case 'mouseleave':
      state.canvas.isDrawing = false;
      break;
  }
}

function onSocketColorChanged(data) {
  this.modell.setPickedColor(data);
}

function onSocketBrushChanged(data) {
  this.modell.setPickedBrush(data);
}

function onSocketNewMessage(data) {
  this.views.paint.chat.addMessage(data.name, data.text, data.color);
}

export default (controller) => {
  controller.onSocketConnected = onSocketConnected.bind(controller);
  controller.onSocketSigned = onSocketSigned.bind(controller);
  controller.onSocketNewUser = onSocketNewUser.bind(controller);
  controller.onSocketUserDisconnected = onSocketUserDisconnected.bind(
    controller
  );
  controller.onSocketCanvasMovement = onSocketCanvasMovement.bind(controller);
  controller.onSocketColorChanged = onSocketColorChanged.bind(controller);
  controller.onSocketBrushChanged = onSocketBrushChanged.bind(controller);
  controller.onSocketNewMessage = onSocketNewMessage.bind(controller);

  return controller;
};
