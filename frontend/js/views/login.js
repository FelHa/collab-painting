import Login from './components/login.js';

export default class LoginView {
  constructor(appContainer) {
    this.appContainer = appContainer;
  }

  init = () => {
    this.loginForm = new Login(this.appContainer);
  };
}
