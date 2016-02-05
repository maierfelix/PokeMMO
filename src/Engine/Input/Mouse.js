import Wheel from "../../libs/wheel";

/**
 * Mouse
 * @class Mouse
 * @export
 */
export default class Mouse {

  /**
   * @constructor
   * @param {Array} events
   */
  constructor(events) {

    return (this);

  }

  /**
   * Register a mouse event
   * @param {Object} event
   */
  registerEvent(event, root) {

    if (event.name === "mousewheel") {
      Wheel.addWheelListener(document.body, e => root::event.fire(e));
      return void 0;
    }

    window.addEventListener(event.name, e => root::event.fire(e), false);

  }

}