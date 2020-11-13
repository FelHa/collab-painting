import { dom } from '../../utils/dom.js';

export default class Chat {
  constructor(parent) {
    this.parent = parent;
    this.htmlContainer = this.create();
  }

  create = () => {
    const container = dom.make({
      context: this.parent,
      attributes: { id: 'chat' },
    });

    const inputWrapper = dom.make({
      context: container,
      classes: ['input-container'],
    });

    container.inputWrapper = inputWrapper;

    container.input = dom.make({
      type: 'input',
      context: inputWrapper,
      classes: ['chat-input'],
      attributes: { type: 'text', value: 'Chat...' },
    });

    container.button = dom.make({
      type: 'button',
      context: inputWrapper,
      classes: ['chat-submit'],
      content: 'Senden',
    });

    return container;
  };

  addMessage = (user, message, color) => {
    const container = dom.make({
      context: this.htmlContainer.inputWrapper,
      insertionMethod: 'after',
      classes: ['message-container'],
    });

    dom.make({
      type: 'span',
      context: container,
      classes: ['message-user'],
      content: `${user}: `,
    });

    dom.make({
      type: 'span',
      context: container,
      classes: ['message-text'],
      content: message,
      styles: { color: color },
    });
  };

  on = (type, callback, delegate = { to: null }) => {
    if (delegate.to) {
      delegate.to.addEventListener(type, callback);
    } else this.htmlContainer.addEventListener(type, callback);
    return this;
  };
}
