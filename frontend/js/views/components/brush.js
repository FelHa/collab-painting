import { dom } from '../../utils/dom.js';

export default class Brush {
  constructor(parent) {
    this.parent = parent;
    this.htmlContainer = this.create();
  }

  create = () => {
    return dom.make({
      context: this.parent,
      attributes: { id: 'brush' },
      content: 'Pinsel anpassen:',
    });
  };

  addSlider = (min, max) => {
    this.slider = dom.make({
      context: this.htmlContainer,
      classes: ['brush-slider'],
      type: 'input',
      attributes: {
        type: 'range',
        min: min,
        max: max,
        step: min,
        value: min * 2,
      },
    });
    return this;
  };

  addColors = (colors) => {
    const allColors = [];
    colors.forEach((color) => {
      allColors.push(
        dom.make({
          context: this.htmlContainer,
          classes: ['pick-color'],
          styles: { background: color },
        })
      );
    });
    this.colors = allColors;
    return this;
  };

  on = (type, callback, delegate = { to: null }) => {
    if (delegate.to) {
      delegate.to.addEventListener(type, callback);
    } else this.htmlContainer.addEventListener(type, callback);
    return this;
  };
}
