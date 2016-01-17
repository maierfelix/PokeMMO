/**
 * This module unifies handling of mouse whee event across different browsers
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel
 * for more details
 *
 * Usage:
 *  var addWheelListener = require('wheel').addWheelListener;
 *  var removeWheelListener = require('wheel').removeWheelListener;
 *  addWheelListener(domElement, function (e) {
 *    // mouse wheel event
 *  });
 *  removeWheelListener(domElement, function);
 */
// by default we shortcut to 'addEventListener':

module.exports = addWheelListener;

// But also expose "advanced" api with unsubscribe:
module.exports.addWheelListener = addWheelListener;
module.exports.removeWheelListener = removeWheelListener;


var prefix = "", _addEventListener, _removeEventListener, onwheel, support;

detectEventModel(typeof window !== 'undefined' && window,
                typeof document !== 'undefined' && document);

function addWheelListener( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
    }
};

function removeWheelListener( elem, callback, useCapture ) {
    _removeWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _removeWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
    }
};

function _addWheelListener( elem, eventName, callback, useCapture ) {
  // TODO: in theory this anonymous function may result in incorrect
  // unsubscription in some browsers. But in practice, I don't think we should
  // worry too much about it (those browsers are on the way out)
  elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
    !originalEvent && ( originalEvent = window.event );

    // create a normalized event object
    var event = {
      // keep a ref to the original event object
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: "wheel",
      deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
      deltaX: 0,
      delatZ: 0,
      preventDefault: function() {
        originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
      },
      stopPropagation: function() {
        if(originalEvent.stopPropagation)
          originalEvent.stopPropagation();
      },
      stopImmediatePropagation: function() {
        if(originalEvent.stopImmediatePropagation)
          originalEvent.stopImmediatePropagation();
      }
    };

    // calculate deltaY (and deltaX) according to the event
    if ( support == "mousewheel" ) {
      event.deltaY = - 1/40 * originalEvent.wheelDelta;
      // Webkit also support wheelDeltaX
      originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
    } else {
      event.deltaY = originalEvent.detail;
    }

    // it's time to fire the callback
    return callback( event );

  }, useCapture || false );
}

function _removeWheelListener( elem, eventName, callback, useCapture ) {
  elem[ _removeEventListener ]( prefix + eventName, callback, useCapture || false );
}

function detectEventModel(window, document) {
  if ( window && window.addEventListener ) {
      _addEventListener = "addEventListener";
      _removeEventListener = "removeEventListener";
  } else {
      _addEventListener = "attachEvent";
      _removeEventListener = "detachEvent";
      prefix = "on";
  }

  if (document) {
    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
  } else {
    support = "wheel";
  }
}