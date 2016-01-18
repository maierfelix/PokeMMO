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
  constructor() {

    this.KeyBoard = new keyboard();
    this.Mouse = new mouse();

  }

}