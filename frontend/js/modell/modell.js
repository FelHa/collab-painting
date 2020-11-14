export default class Modell {
  state = {
    canvas: {
      session: {
        isDrawing: false,
        pos: { x: 0, y: 0 },
        pickedColor: '#000000',
        pickedBrush: 20,
      },
      personal: {
        isDrawing: false,
        pos: { x: 0, y: 0 },
        pickedColor: '#000000',
        pickedBrush: 20,
        min: 10,
        max: 50,
      },
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

  setPickedColor = (color, which) => {
    this.state.canvas[which].pickedColor = color;
    if (this.events.colorChange) this.events.colorChange();
    return this;
  };

  setPickedBrush = (brush, which) => {
    this.state.canvas[which].pickedBrush = brush;
    if (this.events.brushChange) this.events.brushChange();
    return this;
  };

  on = (type, callback) => {
    if (!(type in this.events)) throw new Error('No such event type in modell');
    this.events[type] = callback;
    return this;
  };
}
