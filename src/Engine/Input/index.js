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

  }

  /**
   * Register keys
   */
  registerKeys() {

    for (let key of this.events.keys) {
      this.KeyBoard.registerKey(
        key.name,
        key.fire.bind(this.instance)
      );
    };

  }

  /**
   * Register mouse
   */
  registerMouse() {

    for (let ev of this.events.mouse) {
      this.Mouse.registerEvent(ev, this.instance);
    };

  }

}