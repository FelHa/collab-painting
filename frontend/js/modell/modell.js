export default class Modell {
  state = {
    canvas: {
      isDrawing: false,
      pos: { x: 0, y: 0 },
      pickedColor: '#000000',
      pickedBrush: 20,
      min: 10,
      max: 50,
    },
    client: { id: '', name: '' },
  };
  events = { colorChange: null, brushChange: null };

  setClientName = (name) => {
    this.state.client.name = name;
    return this;
  };

  setClientId = (id) => {
    this.state.client.id = id;
    return this;
  };

  setPickedColor = (color) => {
    this.state.canvas.pickedColor = color;
    if (this.events.colorChange) this.events.colorChange();
    return this;
  };

  setPickedBrush = (brush) => {
    this.state.canvas.pickedBrush = brush;
    if (this.events.brushChange) this.events.brushChange();
    return this;
  };

  on = (type, callback) => {
    if (!(type in this.events)) throw new Error('No such event type in modell');
    this.events[type] = callback;
    return this;
  };
}
