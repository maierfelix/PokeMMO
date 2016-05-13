/**
 * Draw a grid
 * @param {Object} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} dim
 * @param {Number} scale
 * @param {Number} ln
 * @param {String} color
 */
export function drawGrid(ctx, x, y, width, height, dim, scale, ln, color, xPad, yPad) {

  let ww = dim * scale;
  let hh = dim * scale;

  let xx = x % ww;
  let yy = y % hh;

  ctx.beginPath();

  for (; xx < width; xx += ww) {
    ctx.moveTo((xx - ln) + xPad, yPad);
    ctx.lineTo((xx - ln) + xPad, height + yPad);
  };

  for (; yy < height; yy += hh) {
    ctx.moveTo(xPad, (yy + ln) + yPad);
    ctx.lineTo(width + xPad, (yy + ln) + yPad);
  };

  ctx.strokeStyle = color;
  ctx.lineWidth = ln;

  ctx.stroke();

  ctx.closePath();

  return void 0;

}