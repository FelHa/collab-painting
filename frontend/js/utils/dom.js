export const dom = {
  make: ({
    type = 'div',
    context = null,
    insertionMethod = '',
    content = false,
    classes = [],
    styles = {},
    attributes = {},
    events = {},
  } = {}) => {
    const element = document.createElement(type);
    if (context) {
      switch (insertionMethod) {
        case 'prepend':
          context.prepend(element);
          break;
        case 'before':
          context.before(element);
          break;
        case 'after':
          context.after(element);
          break;
        case 'replaceWith':
          context.replaceWith(element);
          break;
        default:
          context.append(element);
          break;
      }
    }
    if (content) element.innerHTML = content;
    if (classes.length) element.className = classes.join(' ');
    Object.entries(events).forEach((event) =>
      element.addEventListener(...event)
    );
    Object.entries(attributes).forEach((a) => element.setAttribute(...a));
    Object.entries(styles).forEach((s) => (element.style[s[0]] = s[1]));

    return element;
  },

  templates: {},
};

export const $ = (selector = '', on = document) => on.querySelector(selector);

export const $$ = (selector = '', on = document) => [
  ...on.querySelectorAll(selector),
];
