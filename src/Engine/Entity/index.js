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
     * Size
     * @type {Object}
     */
    this.size = new math.Point();

    /**
     * Entity x pos
     * @type {Number}
     */
    this.x = Math.floor(Math.random() * window.innerWidth / 10);

    /**
     * Entity y pos
     * @type {Number}
     */
    this.y = Math.floor(Math.random() * window.innerHeight / 10);

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex;

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

    setInterval(function() {
      this.x = Math.floor(Math.random() * window.innerWidth / 10);
      this.y = Math.floor(Math.random() * window.innerHeight / 10);
    }.bind(this), 1000);

    if (obj.width) {
      this.size.x = obj.width;
    }

    if (obj.height) {
      this.size.y = obj.height;
    }
  }

}