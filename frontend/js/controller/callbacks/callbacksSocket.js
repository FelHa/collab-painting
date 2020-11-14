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
    state.canvas.session.pos.x,
    state.canvas.session.pos.y,
    canvas
  );
  const [absToX, absToY] = getAbsolutePosition(data.x, data.y, canvas);

  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.session.pickedBrush,
    color: this.modell.state.canvas.session.pickedColor,
  });

  state.canvas.personal.isDrawing = false;

  switch (data.event) {
    case 'mousedown':
      state.canvas.session.pos.x = data.x;
      state.canvas.session.pos.y = data.y;
      state.canvas.session.isDrawing = true;
      break;
    case 'mousemove':
      canvas.ctx.draw(absFromX, absFromY, absToX, absToY);
      state.canvas.session.pos.x = data.x;
      state.canvas.session.pos.y = data.y;
      break;
    case 'mouseup':
      canvas.ctx.draw(absFromX, absFromY, absToX, absToY);
      state.canvas.session.pos.x = 0;
      state.canvas.session.pos.y = 0;
      state.canvas.session.isDrawing = false;
      break;
    case 'mouseleave':
      state.canvas.session.isDrawing = false;
      break;
  }

  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.personal.pickedBrush,
    color: this.modell.state.canvas.personal.pickedColor,
  });
}

function onSocketColorChanged(data) {
  this.modell.setPickedColor(data, 'session');
}

function onSocketBrushChanged(data) {
  this.modell.setPickedBrush(data, 'session');
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
