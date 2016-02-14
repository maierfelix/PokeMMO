import { AudioPlayer, Sound } from "./libs/audio";

window.Sound = AudioPlayer;

window.rAF = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
  );
})();

/**
 * @param {Boolean} value
 */
CanvasRenderingContext2D.prototype.setImageSmoothing = function(value) {

  this.imageSmoothingEnabled  = value;
  this.oImageSmoothingEnabled  = value;
  this.msImageSmoothingEnabled  = value;
  this.mozImageSmoothingEnabled  = value;
  this.webkitImageSmoothingEnabled = value;

  return void 0;

};

/**
 * Clear a context
 * @param {String} color Clear by color
 */
CanvasRenderingContext2D.prototype.clear = function (color) {

  if (color) {
    var original = this.fillStyle;
    this.fillStyle = color;
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.fillStyle = original;
  } else {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  return void 0;

};