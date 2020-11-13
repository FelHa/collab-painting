import { getRelativePosition, getAbsolutePosition } from '../../utils/math.js';

/* Brush */

function onBrushClick(event) {
  if (event.target.tagName === 'DIV') {
    this.modell.setPickedColor(event.target.style.backgroundColor);
    this.socket.emit('colorChanged', event.target.style.backgroundColor);
  }
  if (event.target.tagName === 'INPUT') {
    this.modell.setPickedBrush(event.target.value);
    this.socket.emit('brushChanged', event.target.value);
  }
}

/* Canvas */

function onCanvasMousedown({ offsetX, offsetY }) {
  const state = this.modell.state;
  const canvas = this.views.paint.canvas;

  const [relX, relY] = getRelativePosition(offsetX, offsetY, canvas);

  state.canvas.pos.x = relX;
  state.canvas.pos.y = relY;
  state.canvas.isDrawing = true;
  this.socket.emit('mouseOnCanvas', {
    x: relX,
    y: relY,
    event: 'mousedown',
  });
}

function onCanvasMousemove({ offsetX, offsetY }) {
  const state = this.modell.state;
  const canvas = this.views.paint.canvas;

  const [relX, relY] = getRelativePosition(offsetX, offsetY, canvas);
  const [absX, absY] = getAbsolutePosition(
    state.canvas.pos.x,
    state.canvas.pos.y,
    canvas
  );

  if (state.canvas.isDrawing === true) {
    canvas.ctx.draw(absX, absY, offsetX, offsetY);
    state.canvas.pos.x = relX;
    state.canvas.pos.y = relY;
    this.socket.emit('mouseOnCanvas', {
      x: relX,
      y: relY,
      event: 'mousemove',
    });
  }
}

function onCanvasMouseup({ offsetX, offsetY }) {
  const state = this.modell.state;
  const canvas = this.views.paint.canvas;

  const [relX, relY] = getRelativePosition(offsetX, offsetY, canvas);
  const [absX, absY] = getAbsolutePosition(
    state.canvas.pos.x,
    state.canvas.pos.y,
    canvas
  );

  if (state.canvas.isDrawing === true) {
    canvas.ctx.draw(absX, absY, offsetX, offsetY);
    state.canvas.pos.x = 0;
    state.canvas.pos.y = 0;
    state.canvas.isDrawing = false;
    this.socket.emit('mouseOnCanvas', {
      x: relX,
      y: relY,
      event: 'mouseup',
    });
  }
}

function onCanvasMouseleave({ offsetX, offsetY }) {
  const state = this.modell.state;
  const canvas = this.views.paint.canvas;

  const [relX, relY] = getRelativePosition(offsetX, offsetY, canvas);

  if (state.canvas.isDrawing === true) {
    state.canvas.isDrawing = false;
    this.socket.emit('mouseOnCanvas', {
      x: relX,
      y: relY,
      event: 'mouseleave',
    });
  }
}

/* Chat */

function onChatSubmit() {
  const message = {
    name: this.modell.state.client.name,
    text: this.views.paint.chat.htmlContainer.input.value,
  };
  this.views.paint.chat.addMessage(message.name, message.text);
  this.socket.emit('newMessage', message);
  this.views.paint.chat.htmlContainer.input.value = '';
}

function onChatKeydown(event) {
  if (event.key !== 'Enter') return;
  onChatSubmit.call(this);
}

function onChatFocus(event) {
  event.target.value = '';
}

/* Header */

function onMenuClick(event) {
  const subMenues = [...event.target.children];
  subMenues.forEach((submenue) => submenue.classList.toggle('active'));
}

export default (controller) => {
  controller.onBrushClick = onBrushClick.bind(controller);
  controller.onCanvasMousedown = onCanvasMousedown.bind(controller);
  controller.onCanvasMousemove = onCanvasMousemove.bind(controller);
  controller.onCanvasMouseup = onCanvasMouseup.bind(controller);
  controller.onCanvasMouseleave = onCanvasMouseleave.bind(controller);
  controller.onChatFocus = onChatFocus.bind(controller);
  controller.onChatSubmit = onChatSubmit.bind(controller);
  controller.onChatKeydown = onChatKeydown.bind(controller);
  controller.onMenuClick = onMenuClick.bind(controller);

  return controller;
};
