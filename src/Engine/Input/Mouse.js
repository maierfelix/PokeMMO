import {
  uHash
} from "../utils";

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

    let fire = null;

    let events = event.name.split("|");

    for (let ev of events) {
      if (ev === "mousewheel") {
        window.addWheelListener(document.body, e => root::event.fire(e));
      } else {
        window.addEventListener(ev, e => root::event.fire(e), false);
      }
    };

  }

}