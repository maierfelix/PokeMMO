/**
 * Colorize pixels
 * @param {Object} imgData
 * @param {Number}  r
 * @param {Number}  g
 * @param {Number}  b
 * @param {Boolean} strict
 */
export function colorizePixels(imgData, r, g, b, strict) {

  var ii = 0;
  var length = 0;

  var pixels = imgData.data;

  length = pixels.length;

  if (strict) {
    for (; ii < length / 4; ++ii) {
      if (pixels[ii * 4] > 0) {
        pixels[ii * 4] = g;
      }
      if (pixels[ii * 4 + 1] > 0) {
        pixels[ii * 4 + 1] = r;
      }
      if (pixels[ii * 4 + 2] > 0) {
        pixels[ii * 4 + 2] = g;
      }
      if (pixels[ii * 4 + 3] > 2) {
        pixels[ii * 4 + 3] = b;
      }
    };
  } else {
    for (; ii < length / 4; ++ii) {
      pixels[ii * 4 + 1] = pixels[ii * 4 + 1] / r;
      pixels[ii * 4 + 2] = pixels[ii * 4 + 2] / g;
      pixels[ii * 4 + 3] = pixels[ii * 4 + 3] * b;
    };
  }

}

/**
 * Create shadow of a sprite
 * @param {Object} buffer
 * @param {Object} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
export function drawShadow(buffer, ctx, x, y, width, height) {

  ctx.clear();

  ctx.drawImage(
    buffer.canvas,
    0, 0,
    width, height
  );

  this.drawTint(
    ctx,
    0, 0,
    width, height,
    85
  );

};

/**
 * Tint a canvas
 * @param {Object} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} value
 */
export function drawTint(ctx, x, y, width, height, value) {

  var imgData = ctx.getImageData(
    x, y,
    width, height
  );

  this.colorizePixels(
    imgData,
    0,
    0,
    value || this.config.shadowAlpha,
    true
  );

  ctx.putImageData(
    imgData,
    x, y
  );

};