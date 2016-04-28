import math from "../../../Math";
import {
  LEFT, RIGHT, UP, DOWN,
  OFFLINE_MODE,
  DIMENSION, GRAVITY
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

import { inherit } from "../../../Engine/utils";

import Entity from "../../../Engine/Entity";

import * as jump from "./jump";
import * as walk from "./walk";
import * as face from "./face";
import * as sound from "./sound";
import * as follow from "./follow";

export class Player extends Entity {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {

    super(obj);

    /**
     * Local entity requires instance ref
     * @type {Object}
     */
    this.instance = null;

    /**
     * Gravity
     * @type {Number}
     */
    this.gravity = GRAVITY;

    /**
     * Player facing
     * @type {Number}
     */
    this.facing = obj.facing !== void 0 ? obj.facing : 0;

    /**
     * Idle state
     * @type {Number}
     */
    this.idle = 0;

    /**
     * States
     * @type {Object}
     */
    this.STATES["WALKING"] = false;
    this.STATES["RUNNING"] = false;
    this.STATES["BUMPING"] = false;
    this.STATES["WALKING"] = false;
    this.STATES["FACING"]  = false;

    /**
     * Shadow offsets
     * @type {Number}
     */
    this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
    this.shadowY = obj.shadowY === void 0 ? -1.75 : obj.shadowY;

    /**
     * Local player check
     * @type {Boolean}
     */
    this.isLocalPlayer = false;

    /**
     * NPC check
     * @type {Boolean}
     */
    this.isNPC = false;

    /**
     * Network player check
     * @type {Boolean}
     */
    this.isNetworkPlayer = false;

    /**
     * Animation frames
     * @type {Array}
     */
    this.frames = [0, 1, 0, 2, 3, 4];

    /**
     * Reset frame
     * @type {Array}
     */
    this.frameReset = [0, 2, 2, 0];

    /**
     * Last facing
     * @type {Number}
     */
    this.lastFacing = 0;

    /**
     * Step count
     * @type {Number}
     */
    this.stepCount = 0;

    /**
     * Face count
     * @type {Number}
     */
    this.faceCount = 0;

    /**
     * Latency
     * @type {Number}
     */
    this.latency = .5;

    /**
     * Map the player is on
     * @type {String}
     */
    this.map = obj.map;

    /**
     * Step sound
     * @type {Number}
     */
    this.soundSteps = DIMENSION * 2;

    this.xMargin = -(DIMENSION / 2);
    this.yMargin = -DIMENSION;

    if (
      obj.x !== void 0 &&
      obj.y !== void 0
    ) {
      this.x = obj.x;
      this.y = obj.y;
    }

    let last = this.getLastPosition();

    this.last.x = this.x + last.x;
    this.last.y = this.y + last.y;

    this.init(obj);

  }

  /**
   * Last position
   * @return {Object}
   */
  getLastPosition() {

    let x = 0;
    let y = 0;

    if (this.facing === LEFT || this.facing === RIGHT) {
      x = this.facing === LEFT ? DIMENSION : -DIMENSION;
    } else {
      y = this.facing === DOWN ? -DIMENSION : DIMENSION;
    }

    return ({
      x: x,
      y: y
    });

  }

  /**
   * @getter
   * @return {Number}
   */
  get velocity() {
    return (this.latency);
  }

  /**
   * @param {Number} value
   * @setter
   */
  set velocity(value) {
    this.latency = value / 2;
    if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
      this.instance.engine.connection.sendData(
        "Velocity",
        [this.id, value]
      );
    }
    if (this.leader) {
      this.leader.velocity = value;
    }
    this.refreshState();
  }

  /**
   * Player is moving
   * @return {Boolean}
   * @getter
   */
  get moving() {
    return (
      this.STATES.WALKING === true ||
      this.STATES.RUNNING === true
    );
  }

  /**
   * Player is moving
   * @param {Boolean} value
   * @setter
   */
  set moving(value) {
    this.STATES.WALKING = value;
    this.STATES.RUNNING = value;
  }

  /**
   * Initialise
   * @param {Object} obj
   */
  init(obj) {
    this.setPlayerType(obj);
  }

  /**
   * Set player entity type
   * @param {Object} obj
   */
  setPlayerType(obj) {

    if (obj.isLocalPlayer === true) {
      this.isLocalPlayer = true;
      this.isNPC = false;
      this.isNetworkPlayer = false;
    }
    else if (obj.isNPC === true) {
      this.isLocalPlayer = false;
      this.isNPC = true;
      this.isNetworkPlayer = false;
    }
    else if (obj.isNetworkPlayer === true) {
      this.isLocalPlayer = false;
      this.isNPC = false;
      this.isNetworkPlayer = true;
    }
    /** Default is npc */
    else {
      this.isLocalPlayer = false;
      this.isNPC = true;
      this.isNetworkPlayer = false;
    }

  }

  /**
   * Get frame index
   * @return {Number}
   */
  getFrameIndex() {
    return (
      this.STATES.RUNNING === true ? 2 : 0
    );
  }

  /** Reset sprite frame */
  resetFrame() {
    this.frame = this.frameReset[this.frame] + this.getFrameIndex();
  }

  /** Refresh entity states */
  refreshState() {
    this.STATES.RUNNING = this.velocity === .5 ? false : this.velocity >= 1 && this.STATES.WALKING === true ? true : false;
    this.STATES.JUMPING = this.z !== 0;
  }

  /** Trigger faced tile */
  action() {
    let position = math.getTilePosition(this.x << 0, this.y << 0, this.facing);
    Maps[this.map].actionTrigger(position, this);
  }

  /**
   * Face a entity
   * @param {Object} entity
   */
  faceEntity(entity) {
    let facing = this.oppositFacing(entity.facing);
    if (this.facing !== facing) {
      this.changeFacing(facing);
    }
  }

  /** Animate */
  animate() {

    if (this.STATES.JUMPING === true) {
      this.jumping();
    }

    if (this.animations.length <= 0) return void 0;

    this.animationIndex = 0;

    let ii = 0;
    let animation = null;
    let walking = false;
    let bumping = false;

    for (; ii < this.animations.length; ++ii) {
      animation = this.animations[this.animationIndex];
      if (animation.type === "walk" && walking === true) continue;
      if (animation.type === "bump" && bumping === true) continue;
      this[animation.type](animation);
      if (animation.type === "walk") walking = true;
      if (animation.type === "bump") bumping = true;
      this.animationIndex++;
    };

  }

}

inherit(Player, jump);
inherit(Player, walk);
inherit(Player, face);
inherit(Player, sound);
inherit(Player, follow);