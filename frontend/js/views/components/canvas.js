import { dom } from '../../utils/dom.js';

export default class CanvasWrapper {
  constructor(parent, initState) {
    this.parent = parent;
    this.htmlContainer = this.create();
    this.ctx = this.setContext({
      width: initState.pickedBrush,
      color: initState.pickedColor,
    });
  }

  create = () => {
    const container = dom.make({
      attributes: { id: 'paint' },
      context: this.parent,
    });

    container.canvas = dom.make({
      type: 'canvas',
      attributes: { id: 'scribbleCanvas' },
      context: container,
    });

    return container;
  };

  fitIn = () => {
    this.ctx.canvas.width = this.htmlContainer.offsetWidth;
    this.ctx.canvas.height = this.htmlContainer.offsetHeight;
    return this;
  };

  setContext = ({ width = 20, cap = 'round', color = '#aab' } = {}) => {
    const ctx = this.htmlContainer.canvas.getContext('2d');

    ctx.draw = (x1, y1, x2, y2) => {
      ctx.lineWidth = width;
      ctx.lineCap = cap;
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    };
    return ctx;
  };

  on = (type, callback, delegate = { to: null }) => {
    if (delegate.to) {
      delegate.to.addEventListener(type, callback);
    } else this.htmlContainer.addEventListener(type, callback);
    return this;
  };
}
