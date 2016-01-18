"use strict";

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
 * Round integer to its nearst X integer
 * @param  {number} a Number
 * @param  {number} b Round to
 * @method roundTo
 * @return {number} rounded number
 */
Math.roundTo = function(a, b) {
  b = 1 / (b);
  return (Math.round(a * b) / b);
};

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