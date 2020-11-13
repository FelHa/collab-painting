function onLoginSubmit() {
  const name = this.views.login.loginForm.htmlContainer.input.value;

  if (!name) return;

  this.modell.setClientName(name);

  this.views.login.loginForm.htmlContainer.remove();
  delete this.views.login;

  this.socket.emit('signed', name);
}

function onLoginKeydown(event) {
  if (event.key !== 'Enter') return;
  onLoginSubmit.call(this);
}

function onLoginFocus() {
  this.views.login.loginForm.htmlContainer.button.disabled = false;
  this.views.login.loginForm.htmlContainer.input.value = '';
}

export default (controller) => {
  controller.onLoginSubmit = onLoginSubmit.bind(controller);
  controller.onLoginFocus = onLoginFocus.bind(controller);
  controller.onLoginKeydown = onLoginKeydown.bind(controller);

  return controller;
};
