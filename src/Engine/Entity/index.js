import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";

import math from "../../Math";
import { TextureCache, getSprite } from "../utils";

import DisplayObject from "../DisplayObject";
import Texture from "../Texture";
import Shadow from "../Shadow";

/**
 * Entity
 * @class Entity
 * @export
 */
export default class Entity extends DisplayObject {

  /**
   * @param {Object}   obj
   * @param {Function} resolve
   * @constructor
   */
  constructor(obj, resolve) {

    super(null);

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
     * Collidable
     * @type {Boolean}
     */
    this.collidable = obj.collidable || false;

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
     * Reversed facing
     * @type {Array}
     */
    this.reversed = [2, 3, 0, 1];

    /**
     * Reverse shadow
     * @type {Array}
     */
    this.reverseShadow = [2, 3, 1, 0];

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

    /**
     * Shadow entity ref
     * @type {Object}
     */
    this.shadow = null;

    /**
     * Entity has shadow
     * @type {Boolean}
     */
    this.hasShadow = obj.shadow || false;

    /** Entity position */
    this.x = DIMENSION * 2;
    this.y = DIMENSION * 2;

    /** Entity size */
    if (obj.width) this.width = obj.width;
    if (obj.height) this.height = obj.height;

    /** Load texture */
    getSprite(this.sprite, this::function(texture) {
      this.texture = TextureCache[this.sprite];
      if (obj.shadow === true) {
        this.shadow = new Shadow(this);
      }
      if (
        resolve !== void 0 &&
        resolve instanceof Function
      ) resolve();
    });

    Object.defineProperty(this, "x", {
      get: function() {
        return (this.position.x);
      },
      set: function(value) {
        this.position.x = value;
      }
    });

    Object.defineProperty(this, "y", {
      get: function() {
        return (this.position.y);
      },
      set: function(value) {
        this.position.y = value;
      }
    });

  }

  /** Animate */
  animate() {

    if (this.animations.length <= 0) return void 0;

    var ii = 0;
    var length = 0;

    length = this.animations.length;

    for (; ii < length; ++ii) {
      /*if (this.animations[ii].simultaneous === false) {
        this[this.animations[ii].type](this.animations[ii]);
        break;
      }*/
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
      this.reverseShadow[dir]
    );
  }

  /**
   * Reverse dir
   * @param  {Number} dir
   * @return {Number}
   */
  reverseDir(dir) {
    return (
      this.reversed[dir]
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