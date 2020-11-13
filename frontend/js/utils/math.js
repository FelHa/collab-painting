export function getRelativePosition(absX, absY, canvas) {
  const canvasWidth = canvas.ctx.canvas.offsetWidth;
  const canvasHeight = canvas.ctx.canvas.offsetHeight;

  return [(absX * 100) / canvasWidth, (absY * 100) / canvasHeight];
}

export function getAbsolutePosition(relX, relY, canvas) {
  const canvasWidth = canvas.ctx.canvas.offsetWidth;
  const canvasHeight = canvas.ctx.canvas.offsetHeight;

  return [(relX * canvasWidth) / 100, (relY * canvasHeight) / 100];
}
