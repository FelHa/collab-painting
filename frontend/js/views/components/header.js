import { dom } from '../../utils/dom.js';

export default class Header {
  constructor(parent) {
    this.parent = parent;
    this.htmlContainer = this.create();
  }

  create = () => {
    return dom.make({ context: this.parent, type: 'nav', classes: ['header'] });
  };

  /* Beispiel: 
      {
          type: 'div',
          content: 'Spieler',
          children: [
            {
              type: 'p',
              content: 'Spieler A: 100',
              classes: ['dropdown'],
            },
            {
              type: 'p',
              content: 'Spieler B: 200',
              classes: ['dropdown'],
            },
          ],
        } */

  addMenus = (menus) => {
    this.htmlContainer.menus = [];
    menus.forEach((menu) => {
      this.htmlContainer.menus.push(this.addMenu(menu));
    });
    return this;
  };

  addMenu = (items) => {
    const div = dom.make({ context: this.htmlContainer, classes: ['menu'] });
    items.forEach((item) => {
      this.addItem({ ...item, parent: div });
    });
    return div;
  };

  addItem = ({ type, content, classes, parent, children }) => {
    const item = dom.make({
      context: parent,
      type: type,
      content: content,
      classes: classes,
    });
    if (children) {
      children.forEach((child) => this.addItem({ ...child, parent: item }));
    }
    return item;
  };

  on = (type, callback, delegate = { to: null }) => {
    if (delegate.to) {
      delegate.to.addEventListener(type, callback);
    } else this.htmlContainer.addEventListener(type, callback);
    return this;
  };
}
