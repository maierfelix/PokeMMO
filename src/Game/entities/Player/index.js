import math from "../../../Math";
import {
  DIMENSION
} from "../../../cfg";

import { inherit } from "../../../Engine/utils";

import Entity from "../../../Engine/Entity";

import * as movement from "./movement";

export class Player extends Entity {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {

    super(obj);

    /**
     * Z axis position
     * @type {Number}
     */
    this.z = .0;

    /**
     * Player facing
     * @type {Number}
     */
    this.facing = 0;

    /**
     * Idle state
     * @type {Number}
     */
    this.idle = 0;

    /**
     * States
     * @type {Object}
     */
    this.STATES = {
      WALKING: false,
      RUNNING: false,
      FACING:  false,
      BUMPING: false,
      JUMPING: false
    };

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
     * Idle timer
     * @type {Number}
     */
    this.idleTime = 0;

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

    if (
      obj.x !== void 0 &&
      obj.y !== void 0
    ) {
      this.x = obj.x;
      this.y = obj.y;
    }

    this.init(obj);

  }

  /**
   * @getter
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
   * @param  {Object} obj
   */
  init(obj) {
    this.setPlayerType(obj);
  }

  /**
   * Set player entity type
   * Xtra safe
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

  /**
   * Reset sprite frame
   */
  resetFrame() {
    this.frame = this.frameReset[this.frame] + this.getFrameIndex();
  }

  /**
   * Refresh entity states
   */
  refreshState() {
    this.STATES.RUNNING = this.velocity === .5 ? false : this.velocity === 1 && this.STATES.WALKING === true ? true : false;
    this.STATES.JUMPING = this.z < 0;
  }

}

inherit(Player, movement);