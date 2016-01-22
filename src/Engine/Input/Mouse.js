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
      Wheel.addWheelListener(document.body, e => event.fire.call(root, e));
      return void 0;
    }

    window.addEventListener(event.name, e => event.fire.call(root, e), false);

  }

}