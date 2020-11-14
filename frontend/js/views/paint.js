import { dom } from '../utils/dom.js';
import Chat from './components/chat.js';
import Brush from './components/brush.js';
import Header from './components/header.js';
import CanvasWrapper from './components/canvas.js';

export default class PaintView {
  constructor(appContainer) {
    this.appContainer = appContainer;
  }

  addHeader = () => {
    this.header = new Header(this.appContainer);
    this.header.addMenus([]);
  };

  addMain = () => {
    this.main = dom.make({ type: 'main', context: this.appContainer });
  };

  addCanvas = (canvasState) => {
    this.canvas = new CanvasWrapper(this.main, canvasState);
    this.canvas.fitIn();
  };

  addBrush = (canvasState) => {
    this.brush = new Brush(this.main);
    this.brush.addSlider(canvasState.min, canvasState.max, canvasState.min);
    this.brush.addColors([
      '#f9f9f9',
      '#F13E3E',
      '#158721',
      '#133BA7',
      '#7F13A7',
      '#E9E911',
      '#B67306',
      '#636363',
      '#000000',
    ]);
  };

  addChat = () => {
    this.chat = new Chat(this.main);
  };

  showMessage = (message) => {
    const container = dom.make({
      context: this.appContainer,
      classes: ['popup-message'],
    });

    dom.make({ type: 'p', context: container, content: message });
    const buttonWrapper = dom.make({ context: container });
    const ok = dom.make({
      type: 'button',
      context: buttonWrapper,
      content: 'OK',
    });

    const keyframeDown = {
      transform: 'translateY(30vh)',
    };
    const keyframeUp = {
      transform: 'translateY(-30vh)',
    };
    const options = {
      easing: 'ease',
      duration: 1000,
      fill: 'forwards',
    };

    container.animate(keyframeDown, options);

    const removeMessage = (container) => {
      container.animate(keyframeUp, options);
      setTimeout(() => {
        container.remove();
      }, 1000);
    };

    setTimeout(() => {
      removeMessage(container);
    }, 5000);

    ok.onclick = () => {
      removeMessage(container);
    };
  };

  init = (canvasState) => {
    this.addHeader();

    this.addMain();

    this.addCanvas(canvasState);

    this.addBrush(canvasState);

    this.addChat();
  };
}
