import Modell from '../modell/modell.js';
import addCallbacksViewPaint from './callbacks/callbacksViewPaint.js';
import addCallbacksViewLogin from './callbacks/callbacksViewLogin.js';
import addCallbacksModell from './callbacks/callbacksModell.js';
import addCallbacksSocket from './callbacks/callbacksSocket.js';
import Login from '../views/login.js';
import Paint from '../views/paint.js';

export default class Controller {
  constructor(socket, appContainer) {
    this.socket = socket;

    this.views = {
      login: new Login(appContainer),
      paint: new Paint(appContainer),
    };

    this.modell = new Modell();

    addCallbacksViewPaint(this);
    addCallbacksViewLogin(this);
    addCallbacksModell(this);
    addCallbacksSocket(this);
  }

  startApp = () => {
    /* Einloggen */
    this.login();
  };

  login = () => {
    /* Sockets für Login*/
    this.socket
      .on('connected', this.onSocketConnected)
      .on('signed', (data) =>
        this.onSocketSigned({ ...data, next: this.prepareSession })
      );

    /* Login UI erstellen */
    const login = this.views.login;
    login.init();

    /* Callbacks auf UI verteilen */
    login.loginForm
      .on('click', this.onLoginFocus, {
        to: login.loginForm.htmlContainer.input,
      })

      .on('keydown', this.onLoginKeydown, {
        to: login.loginForm.htmlContainer.input,
      })

      .on('click', this.onLoginSubmit, {
        to: login.loginForm.htmlContainer.button,
      });
  };

  prepareSession = () => {
    /* Initialisiere UI */
    this.views.paint.init(this.modell.state);

    /* Sockets Paint*/
    this.socket
      .on('newUser', this.onSocketNewUser)
      .on('userDisconnected', this.onSocketUserDisconnected)
      .on('mouseOnCanvas', this.onSocketCanvasMovement)
      .on('colorChanged', this.onSocketColorChanged)
      .on('brushChanged', this.onSocketBrushChanged)
      .on('newMessage', this.onSocketNewMessage);

    /* Modell Callbacks*/
    this.modell
      .on('colorChange', this.onColorChange)
      .on('brushChange', this.onBrushChange);

    /* Starte Spiel */
    this.startNewSession();
  };

  startNewSession = () => {
    const paint = this.views.paint;
    paint.showMessage(
      `Hallo ${this.modell.state.client.name}. Viel Spaß beim zeichnen.`
    );

    /* Callbacks auf UI verteilen */

    paint.canvas
      .on('mousedown', this.onCanvasMousedown)
      .on('mousemove', this.onCanvasMousemove)
      .on('mouseup', this.onCanvasMouseup)
      .on('mouseleave', this.onCanvasMouseleave);

    paint.brush.on('click', this.onBrushClick);

    paint.chat
      .on('click', this.onChatFocus, {
        to: paint.chat.htmlContainer.input,
      })
      .on('click', this.onChatSubmit, {
        to: paint.chat.htmlContainer.button,
      })
      .on('keydown', this.onChatKeydown, {
        to: paint.chat.htmlContainer.input,
      });

    paint.header.on('click', this.onMenuClick);
  };
}
