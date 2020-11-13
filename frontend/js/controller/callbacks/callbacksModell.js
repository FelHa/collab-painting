function onColorChange() {
  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.pickedBrush,
    color: this.modell.state.canvas.pickedColor,
  });
}

function onBrushChange() {
  this.views.paint.canvas.setContext({
    width: this.modell.state.canvas.pickedBrush,
    color: this.modell.state.canvas.pickedColor,
  });
  this.views.paint.brush.slider.value = this.modell.state.canvas.pickedBrush;
}

export default (controller) => {
  controller.onColorChange = onColorChange.bind(controller);
  controller.onBrushChange = onBrushChange.bind(controller);

  return controller;
};
