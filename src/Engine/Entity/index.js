import {
  DIMENSION, GRAVITY,
  LEFT, RIGHT, UP, DOWN,
  SHADOW_X, SHADOW_Y,
  WGL_SUPPORT,
  IS_CLIENT,
  TYPES
} from "../../cfg";

import math from "../../Math";
import { TextureCache, getSprite, createCanvasBuffer } from "../utils";

import Shadow from "../Shadow";
import Texture from "../Texture";

import DisplayObject from "../DisplayObject";

import {
  Maps
} from "../utils";

/**
 * Entity
 * @class Entity
 * @export
 */
export default class Entity extends DisplayObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(null);

    /**
     * Name
     * @type {String}
     */
    this.name = obj.name || null;

    /**
     * Last position
     * @type {Object}
     */
    this.last = new math.Point();

    /**
     * States
     * @type {Object}
     */
    this.STATES = {
      JUMPING: false,
      LOCK:    false,
      EDITING: false,
      NOISE:   false
    };

    /**
     * Socket
     * @type {Object}
     */
    this.socket = null;

    /**
     * Renderable
     * @type {Boolean}
     */
    this.renderable = false;

    /**
     * Jumpable
     * @type {Boolean}
     */
    this.jumpable = obj.jumpable === void 0 ? true : obj.jumpable;

    /**
     * Life time
     * @type {Number}
     */
    this.lifeTime = 0;

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

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
     * Sprite frame
     * @type {Number}
     */
    this.sFrame = 0;

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
    this.hasShadow = obj.shadow === void 0 ? true : obj.shadow;

    /**
     * Animation index
     * @type {Number}
     */
    this.animationIndex = 0;

    /**
     * Sprite margin
     * @type {Number}
     */
    this.xMargin = obj.xMargin === void 0 ? 0 : obj.xMargin;
    this.yMargin = obj.yMargin === void 0 ? 0 : obj.yMargin;

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
    this.z = 0;
    this.r = 0;

    /**
     * Floating
     * @type {Boolean}
     */
    this.floating = false;

    /**
     * Absolute positioning
     * @type {Boolean}
     */
    this.absolute = false;

    /**
     * Velocity
     * @type {Number}
     */
    this.velocity = 1.0;

    /**
     * Orbiting
     * @type {Boolean}
     */
    this.orbit = false;

    /**
     * Orbit angle
     * @type {Number}
     */
    this.orbitAngle = 0;

    /**
     * Target to orbit
     * @type {Object}
     */
    this.orbitTarget = null;

    /**
     * Stop orbit
     * @type {Boolean}
     */
    this.stopOrbit = false;

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
    if (obj.width)  this.width = obj.width;
    if (obj.height) this.height = obj.height;

    /**
     * Shadow offsets
     * @type {Number}
     */
    this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
    this.shadowY = obj.shadowY === void 0 ? -this.height / 2 : obj.shadowY;

    /**
     * WebGL texture
     * @type {Object}
     */
    this.glTexture = null;

    /**
     * Entity numeric type
     * @type {Number}
     */
    this.type = this.getEntityType();

    /**
     * Entity makes a noise
     * @type {String}
     */
    this.noise = obj.noise === void 0 ? null : obj.noise;

    /**
     * Noise radius
     * @type {Number}
     */
    this.noiseRadius = obj.noiseRadius === void 0 ? 0 : obj.noiseRadius;

    /**
     * Following a entity
     * @type {String}
     */
    this.following = obj.following === void 0 ? null : obj.following;

    /**
     * Follow position
     * @type {Object}
     */
    this.followTarget = new math.Point();

    /**
     * Entity to follow
     * @type {Object}
     */
    this.leader = null;

    /**
     * Action trigger
     * @type {Function}
     */
    this.onAction = null;

    /**
     * Enter trigger
     * @type {Function}
     */
    this.onLoad = null;

    /**
     * Enter trigger
     * @type {Function}
     */
    this.onEnter = null;

    /**
     * Leave trigger
     * @type {Function}
     */
    this.onLeave = null;

    /**
     * Collide trigger
     * @type {Function}
     */
    this.onCollide = null;

    /**
     * Jump trigger
     * @type {Function}
     */
    this.onJump = null;

    if (obj.onAction !== void 0) {
      this.onAction = obj.onAction;
    }
    if (obj.onLoad !== void 0) {
      this.onLoad = obj.onLoad;
    }
    if (obj.onEnter !== void 0) {
      this.onEnter = obj.onEnter;
    }
    if (obj.onLeave !== void 0) {
      this.onLeave = obj.onLeave;
    }
    if (obj.onCollide !== void 0) {
      this.onCollide = obj.onCollide;
    }
    if (obj.onJump !== void 0) {
      this.onJump = obj.onJump;
    }

    /**
     * X
     * @type {Number}
     * @getter
     * @setter
     * @overwrite
     */
    Object.defineProperty(this, "x", {
      get: function() {
        return (this.position.x);
      },
      set: function(value) {
        this.position.x = value;
      }
    });

    /**
     * Y
     * @type {Number}
     * @getter
     * @setter
     * @overwrite
     */
    Object.defineProperty(this, "y", {
      get: function() {
        return (this.position.y);
      },
      set: function(value) {
        this.position.y = value;
      }
    });

    /**
     * Z
     * @type {Number}
     * @getter
     * @setter
     * @overwrite
     */
    Object.defineProperty(this, "z", {
      get: function() {
        return (this.position.z);
      },
      set: function(value) {
        this.position.z = value;
      }
    });
    this.z = obj.z === void 0 ? 0 : obj.z;

    /**
     * R radius
     * @type {Number}
     * @getter
     * @setter
     * @overwrite
     */
    Object.defineProperty(this, "r", {
      get: function() {
        return (this.position.r);
      },
      set: function(value) {
        this.position.r = value;
      }
    });
    this.r = obj.r === void 0 ? 0 : obj.r;

    /**
     * Lock
     * @type {Number}
     * @getter
     * @setter
     * @overwrite
     */
    Object.defineProperty(this, "lock", {
      get: function() {
        return (this.STATES.LOCK);
      },
      set: function(value) {
        this.STATES.LOCK = value === true;
      }
    });

    if (IS_CLIENT === false) return void 0;
    if (this.sprite === null) return void 0;

    /** Load texture */
    getSprite(
      this.sprite, this.width, this.height, this::function(texture) {
      this.texture = texture;
      this.setup();
    });

  }

  /**
   * Setup
   */
  setup() {

    if (this.hasShadow === true) {
      this.shadow = new Shadow(this);
      this.shadow.position.set(this.shadowX, this.shadowY);
    }
    if (WGL_SUPPORT === true) {
      this.glTexture = window.game.engine.renderer.glRenderer.bufferTexture(this.texture.effect_sprites[0].canvas);
    }
    if (this.following !== null) {
      let leader = Maps[this.map].instance.getEntityByProperty(this.following, "name");
      leader.leader = this;
      if (
        leader.last.x <= 0 ||
        leader.last.y <= 0
      ) {
        let last = leader.getLastPosition();
        this.x = leader.x + last.x;
        this.y = leader.y + last.y;
      } else {
        this.x = leader.last.x;
        this.y = leader.last.y;
      }
      this.facing = leader.facing;
      leader.followTarget.x = this.x;
      leader.followTarget.y = this.y;
    }
    if (
      this.onLoad !== null &&
      this.onLoad instanceof Function
    ) {
      this.onLoad();
    }

  }

  /**
   * Get entity type
   * @return {Number}
   */
  getEntityType() {
    if (this instanceof Entity) {
      return (TYPES.Player);
    }
    return (TYPES.MapEntity);
  }

  /**
   * Orbit around a entity
   * @param  {Object} target
   */
  orbitAround(target) {
    if (target !== null) {
      this.orbit = true;
      this.orbitTarget = target;
    } else {
      this.orbit = false;
    }
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
  jump(resolve) {

    if (this.jumpable === false) return void 0;

    this.refreshState();

    if (
      this.STATES.JUMPING === true ||
      this.STATES.LOCK === true
    ) return void 0;

    this.STATES.JUMPING = true;

    this.idleTime = 0;

    this.jumpCB = resolve || null;

  }

  /**
   * Jumping
   */
  jumping() {

    this.z += this.gravity;

    this.refreshState();

    if (this.z < 0) {
      this.gravity += .1;
    } else {
      this.gravity = GRAVITY;
      this.z = 0;
      this.updateShadow();
      this.refreshState();
      if (this.jumpCB) {
        this.jumpCB();
      }
    }

  }

  /**
   * Update shadow
   */
  updateShadow() {

    if (this.hasShadow === true) {
      if (this.z < 0) {
        this.shadow.position.x = -(this.z / 2);
        this.shadow.position.y = this.shadowY - (this.z);
        this.shadow.scale.x = this.z;
        this.shadow.scale.y = this.z;
      } else {
        this.shadow.position.x = this.shadowX;
        this.shadow.position.y = this.shadowY;
        this.shadow.scale.x = 0;
        this.shadow.scale.y = 0;
      }
    }

    return void 0;

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
   * @param {Number}   speed
   * @param {Function} resolve
   */
  fadeIn(speed = speed || 1, resolve) {
    this.animations.push({
      type: "fade",
      fade: 1,
      speed: speed
    });
    this.fadeInCB = resolve || null;
  }

  /**
   * Fade out
   * @param {Number}   speed
   * @param {Boolean}  kill
   * @param {Function} resolve
   */
  fadeOut(speed = speed || 1, kill, resolve) {
    this.animations.push({
      type: "fade",
      fade: 0,
      kill: kill,
      speed: speed
    });
    this.fadeOutCB = resolve || null;
  }

  /**
   * Fade animation
   * @param {Object} animation
   */
  fade(animation) {

    let speed = animation.speed / 4 / 10;

    this.opacity += animation.fade === 1 ? speed : -speed;

    if (animation.fade === 1 && this.opacity > 1) {
      this.opacity = 1.0;
      this.stopAnimation();
      if (this.fadeInCB !== null) {
        this.fadeInCB();
        this.fadeInCB = null;
      }
    } else if (animation.fade === 0 && this.opacity < 0) {
      this.opacity = animation.kill === true ? -.01 : .0;
      if (this.fadeOutCB !== null) {
        this.fadeOutCB();
      }
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

  /**
   * Facing to key
   * @param  {Number} key
   * @return {Number}
   */
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

  /**
   * Opposit facing
   * @param  {Number} key
   * @return {Number}
   */
  oppositFacing(key) {
    return (
      key === LEFT  ? RIGHT :
      key === RIGHT ? LEFT  :
      key === DOWN  ? UP    :
      key === UP    ? DOWN  : UP
    );
  }

}