import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";
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
    this.x = math.roundTo(Math.floor(Math.random() * window.innerWidth / 10), 16);

    /**
     * Entity y pos
     * @type {Number}
     */
    this.y = math.roundTo(Math.floor(Math.random() * window.innerHeight / 10), 16);

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex === void 0 ? 0 : obj.zIndex;

    /**
     * Solid
     * @type {Boolean}
     */
    this.solid = false;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Frames
     * @type {Array}
     */
    this.frames = obj.frames || [0];

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

  /**
   * Shadow facing
   * @param  {Number} dir
   * @return {Number}
   */
  shadowFacing(dir) {

    return (
      dir === LEFT  ? 0 :
      dir === UP    ? 2 :
      dir === RIGHT ? 1 :
      dir === DOWN  ? 3 : 2
    );

  }

  /**
   * Reverse dir
   * @param  {Number} dir
   * @return {Number}
   */
  reverseDir(dir) {

    return (
      dir === LEFT  ? 2 :
      dir === UP    ? 0 :
      dir === RIGHT ? 3 :
      dir === DOWN  ? 1 : 0
    );

  }

  /**
   * Get tile position
   * @param {Number} x
   * @param {Number} y
   * @param {Number} dir
   */
  getTilePosition(x, y, dir) {

    var amount = DIMENSION;

    var facing = -1;

    var x = x;
    var y = y;

    switch (dir) {
      case LEFT:
        x -= amount;
        facing = 3;
      break;
      case UP:
        y -= amount;
        facing = 1;
      break;
      case RIGHT:
        x += amount;
        facing = 2;
      break;
      case DOWN:
        y += amount;
        facing = 0;
      break;
      default:
        facing = 0;
      break;
    };

    return ({
      x: x,
      y: y,
      facing: facing
    });

  }

}