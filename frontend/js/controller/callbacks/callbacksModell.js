function onColorChange() {
  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.personal.pickedBrush,
    color: this.modell.state.canvas.personal.pickedColor,
  });
}

function onBrushChange() {
  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.personal.pickedBrush,
    color: this.modell.state.canvas.personal.pickedColor,
  });
  this.views.paint.brush.slider.value = this.modell.state.canvas.personal.pickedBrush;
}

export default (controller) => {
  controller.onColorChange = onColorChange.bind(controller);
  controller.onBrushChange = onBrushChange.bind(controller);

  return controller;
};
