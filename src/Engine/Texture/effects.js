import {
  getTime
} from "../utils";

/**
 * Draw time based lightning
 * @param {Object} buffer
 * @param {Object} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Array}  colors
 */
export function drawTimeLightning(buffer, ctx, x, y, width, height, colors) {

  let hour = getTime().hours + 5;

  let imgData = buffer.getImageData(
    x, y,
    width, height
  );

  this.colorizePixels(
    imgData,
    colors[hour][0] / 100,
    colors[hour][1] / 100,
    colors[hour][2] / 100,
    false
  );

  ctx.putImageData(
    imgData,
    x, y
  );

  return void 0;

};

/**
 * Colorize pixels
 * @param {Object} imgData
 * @param {Number}  r
 * @param {Number}  g
 * @param {Number}  b
 * @param {Boolean} strict
 */
export function colorizePixels(imgData, r, g, b, strict) {

  let ii = 0;
  let length = 0;

  let pixels = imgData.data;

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

  return void 0;

}