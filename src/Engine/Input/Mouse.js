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

    window.addEventListener(event.name, e => event.fire(root, e), false);

    return void 0;

  }

}