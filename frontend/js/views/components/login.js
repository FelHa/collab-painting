import { dom } from '../../utils/dom.js';

export default class Login {
  constructor(parent) {
    this.parent = parent;
    this.htmlContainer = this.create();
  }

  create = () => {
    const container = dom.make({
      context: this.parent,
      content: 'Collab Painting',
      attributes: { id: 'login' },
    });
    const inputWrapper = dom.make({ context: container });

    container.input = dom.make({
      type: 'input',
      context: inputWrapper,
      classes: ['login-input'],
      attributes: { type: 'text', value: 'Gib deinen Namen ein' },
    });
    container.button = dom.make({
      type: 'button',
      context: inputWrapper,
      classes: ['login-submit'],
      attributes: { disabled: true },
      content: 'Anmelden',
    });

    return container;
  };

  on = (type, callback, delegate = { to: null }) => {
    if (delegate.to) {
      delegate.to.addEventListener(type, callback);
    } else this.htmlContainer.addEventListener(type, callback);
    return this;
  };
}
