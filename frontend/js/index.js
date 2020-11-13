import { $ } from './utils/dom.js';
import Controller from './controller/controller.js';

const init = () => {
  const socket = io();
  const appContainer = $('#app');
  const controller = new Controller(socket, appContainer);
  controller.startApp();
};

init();
