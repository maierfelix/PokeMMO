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
     * Last position
     * @type {Object}
     */
    this.last = new math.Point();

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
     * Current frame
     * @type {Number}
     */
    this.frame = 0;

    /**
     * Sprite
     * @type {String}
     */
    this.sprite = obj.sprite;

    /**
     * Entity scale
     * @type {Number}
     */
    this.scale = obj.scale === void 0 ? 1 : obj.scale;

    /**
     * Animations
     * @type {Array}
     */
    this.animations = [];

    if (obj.width) {
      this.size.x = obj.width;
    }

    if (obj.height) {
      this.size.y = obj.height;
    }
  }

  /** Animate */
  animate() {

    if (this.animations.length <= 0) return void 0;

    var ii = 0;
    var length = 0;

    length = this.animations.length;

    for (; ii < length; ++ii) {
      if (this.animations[ii].simultaneous === false) {
        this[this.animations[ii].type](this.animations[ii]);
        break;
      }
      this[this.animations[ii].type](this.animations[ii]);
    };

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

  facingToKey(facing) {
    return (
      facing === LEFT  ? 37 :
      facing === UP    ? 38 :
      facing === RIGHT ? 39 :
      facing === DOWN  ? 40 : 38
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