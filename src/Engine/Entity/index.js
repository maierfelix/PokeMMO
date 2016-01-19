import math from "../../Math";
import { uHash } from "../utils";

/**
 * Entity
 * @class Entity
 * @export
 */
export default class Entity {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    /**
     * Unique id
     * @type {Number}
     */
    this.id = obj.id || uHash();

    /**
     * Size
     * @type {Object}
     */
    this.size = new math.Point();

    /**
     * Entity x pos
     * @type {Number}
     */
    this.x = Math.roundTo(Math.floor(Math.random() * window.innerWidth / 10), 16);

    /**
     * Entity y pos
     * @type {Number}
     */
    this.y = Math.roundTo(Math.floor(Math.random() * window.innerHeight / 10), 16);

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex === void 0 ? 0 : obj.zIndex;

    /**
     * Texture
     * @type {String}
     */
    this.texture = void 0;

    /**
     * Sprite
     * @type {String}
     */
    this.sprite = obj.sprite;

    if (obj.width) {
      this.size.x = obj.width;
    }

    if (obj.height) {
      this.size.y = obj.height;
    }
  }

}