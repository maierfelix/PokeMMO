import keyboard from "./Keyboard";
import mouse from "./Mouse";

/**
 * Input
 * @class Input
 * @export
 */
export default class Input {

  /**
   * @constructor
   */
  constructor(events, instance) {

    this.instance = instance;

    this.events = events;

    this.KeyBoard = new keyboard();
    this.Mouse = new mouse();

    this.registerKeys();
    this.registerMouse();
    this.registerGlobal();

  }

  /**
   * Register keys
   */
  registerKeys() {

    if (this.events.keys === void 0) return void 0;

    for (let key of this.events.keys) {
      this.KeyBoard.registerKey(
        key,
        this.instance::key.fire,
        key.leave instanceof Function ? this.instance::key.leave : void 0
      );
    };

  }

  /**
   * Register mouse
   */
  registerMouse() {

    if (this.events.mouse === void 0) return void 0;

    for (let ev of this.events.mouse) {
      this.Mouse.registerEvent(ev, this.instance);
    };

  }

  /**
   * Register globals
   */
  registerGlobal() {

    if (this.events.global === void 0) return void 0;

    for (let ev of this.events.global) {
      this.registerGlobalEvent(ev, this.instance);
    };

  }

  /**
   * Register event
   * @param {Object} event
   */
  registerGlobalEvent(event) {

    window.addEventListener(event.name, this.instance::event.fire, false);

  }

}