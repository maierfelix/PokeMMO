import { Howler } from "./libs/Howler";

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

// from: https://developer.mozilla.org/de/docs/Web/Events/wheel
// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window, document) {

  var prefix = "",
    _addEventListener, support;

  // detect event model
  if (window.addEventListener) {
    _addEventListener = "addEventListener";
  } else {
    _addEventListener = "attachEvent";
    prefix = "on";
  }

  // detect available wheel event
  support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

  window.addWheelListener = function(elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture);

    // handle MozMousePixelScroll in older Firefox
    if (support == "DOMMouseScroll") {
      _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
    }
  };

  function _addWheelListener(elem, eventName, callback, useCapture) {
    elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function(originalEvent) {
      !originalEvent && (originalEvent = window.event);

      // create a normalized event object
      var event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: "wheel",
        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        deltaZ: 0,
        preventDefault: function() {
          originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
        }
      };

      // calculate deltaY (and deltaX) according to the event
      if (support == "mousewheel") {
        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
        // Webkit also support wheelDeltaX
        originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
      } else {
        event.deltaY = originalEvent.detail;
      }

      // it's time to fire the callback
      return callback(event);

    }, useCapture || false);
  }

})(window, document);