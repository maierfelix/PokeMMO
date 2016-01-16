import math from "../../Math";

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
    this.id = obj.id;

    /**
     * Entity x
     * @type {Number}
     */
    this.size = new math.Point();

    /**
     * Entity x pos
     * @type {Number}
     */
    this.x = 0;

    /**
     * Entity y pos
     * @type {Number}
     */
    this.y = Math.floor(Math.random() * 100);

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex;

    /**
     * Texture
     * @type {String}
     */
    this.texture = null;

  }

}