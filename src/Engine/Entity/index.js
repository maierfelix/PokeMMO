import {
  DIMENSION, GRAVITY,
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

    this.name = obj.name || null;

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
     * Collision box
     * @type {Array}
     */
    this.collisionBox = obj.collisionBox === void 0 ? [] : obj.collisionBox;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Animation
     * @type {Boolean}
     */
    this.animation = obj.animation === true || false;

    /**
     * Animation start
     * @type {Number}
     */
    this.animationStart = obj.animationStart === void 0 ? 0 : obj.animationStart;

    /**
     * Animation speed
     * @type {Number}
     */
    this.animationSpeed = obj.animationSpeed === void 0 ? 300 : obj.animationSpeed;

    /**
     * Looped animation
     * @type {Boolean}
     */
    this.loop = obj.loop === void 0 ? false : obj.loop;

    /**
     * Animation frames
     * @type {Number}
     */
    this.animationFrames = obj.animationFrames === void 0 ? 0 : obj.animationFrames;

    /**
     * Frames
     * @type {Array}
     */
    this.frames = obj.frames === void 0 ? [0] : obj.frames;

    /**
     * Current frame
     * @type {Number}
     */
    this.frame = 0;

    /**
     * Last frame
     * @type {Number}
     */
    this.lastFrame = 0;

    /**
     * Opacity
     * @type {Number}
     */
    this.opacity = .0;

    /**
     * Gravity
     * @type {Number}
     */
    this.gravity = GRAVITY;

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
     * Static state
     * Used for faster rendering
     * @type {Boolean}
     */
    this.static = obj.static === void 0 ? false : obj.static;

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

    /**
     * Animation index
     * @type {Number}
     */
    this.animationIndex = 0;

    /**
     * Sprite margin
     * @type {Number}
     */
    this.xMargin = 0;
    this.yMargin = 0;

    /**
     * Sizes
     * @type {Number}
     */
    this.width = 0;
    this.height = 0;

    /**
     * Position
     * @type {Number}
     */
    this.x = 0;
    this.y = 0;

    /**
     * Z axis position
     * @type {Number}
     */
    this.z = .0;

    /**
     * Idle time
     * @type {Number}
     */
    this.idleTime = 0;

    if (
      obj.x !== void 0 &&
      obj.y !== void 0
    ) {
      this.x = obj.x;
      this.y = obj.y;
    }

    /** Entity size */
    if (obj.width) this.width = obj.width;
    if (obj.height) this.height = obj.height;

    /**
     * Shadow offsets
     * @type {Number}
     */
    this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
    this.shadowY = obj.shadowY === void 0 ? -this.height / 2 : obj.shadowY;

    /**
     * States
     * @type {Object}
     */
    this.STATES = {
      JUMPING: false,
      LOCK:    false,
      EDITING: false
    };

    /** Load texture */
    getSprite(this.sprite, this::function(texture) {
      this.texture = texture;
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

  /**
   * Refresh entity states
   */
  refreshState() {
    this.STATES.JUMPING = this.z !== 0;
  }

  /**
   * Jump
   */
  jump() {

    this.refreshState();

    if (
      this.STATES.JUMPING === true ||
      this.STATES.LOCK === true
    ) return void 0;

    this.STATES.JUMPING = true;

    this.idleTime = 0;

  }

  /**
   * Jumping
   */
  jumping() {

    this.z += this.gravity;

    if (this.z < 0) {
      this.gravity += .1;
      if (this.hasShadow === true) {
        this.shadow.position.set(-(this.z / 2), this.shadowY - (this.z));
        this.shadow.scale.set(this.z, this.z);
      }
    } else {
      this.gravity = GRAVITY;
      this.z = 0;
      this.refreshState();
      if (this.hasShadow === true) {
        this.shadow.position.set(this.shadowX, this.shadowY);
        this.shadow.scale.set(0, 0);
      }
    }

  }

  /** Animate */
  animate() {

    if (this.STATES.JUMPING === true) {
      this.jumping();
    }

    if (this.animations.length <= 0) return void 0;

    this.animationIndex = 0;

    for (var ii = 0; ii < this.animations.length; ++ii) {
      this[this.animations[this.animationIndex].type](this.animations[this.animationIndex]);
      this.animationIndex++;
    };

  }

  /**
   * Stop current animation
   */
  stopAnimation() {
    this.animations.splice(this.animationIndex, 1);
  }

  /**
   * Entity has customized opacity
   * @return {Boolean}
   */
  customOpacity() {
    return (
      this.opacity !== 1.0 &&
      this.opacity !== 0.0
    );
  }

  /**
   * Fade in
   */
  fadeIn() {
    this.animations.push({
      type: "fade",
      fade: 1
    });
  }

  /**
   * Fade out
   */
  fadeOut() {
    this.animations.push({
      type: "fade",
      fade: 0
    });
  }

  /**
   * Fade animation
   * @param {Object} animation
   */
  fade(animation) {

    this.opacity += (animation.fade === 1) ? .025 : -(.025);

    if (animation.fade === 1 && this.opacity > 1) {
      this.opacity = 1.0;
      this.stopAnimation();
    } else if (animation.fade === 0 && this.opacity < 0) {
      this.opacity = .0;
      this.stopAnimation();
    }

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
   * Key to facing
   * @param  {Number} key
   * @return {Number}
   */
  keyToFacing(key) {
    return (
      key === 37 ? LEFT  :
      key === 38 ? UP    :
      key === 39 ? RIGHT :
      key === 40 ? DOWN  : UP
    );
  }

}