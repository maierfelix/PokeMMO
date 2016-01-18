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
export function drawGrid(ctx, x, y, width, height, dim, scale, ln, color) {

  var ww = dim * scale;
  var hh = dim * scale;

  var xx = x % ww;
  var yy = y % hh;

  for (; xx < width; xx += ww) {
    ctx.moveTo(xx - ln, 0);
    ctx.lineTo(xx - ln, height);
  };

  for (; yy < height; yy += hh) {
    ctx.moveTo(0, yy + ln);
    ctx.lineTo(width, yy + ln);
  };

  ctx.strokeStyle = color;
  ctx.lineWidth = ln;

  ctx.stroke();

  ctx.closePath();

  return void 0;

}