import math from "../../Math";
import {
  DIMENSION,
  BGM, BGS,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";

import Audio from "../../Engine/Audio";
import Entity from "../../Engine/Entity";
import Shadow from "./Shadow";

let Sound = window.Sound;

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
    this.z = 0;

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
     * Moving state
     * @type {Boolean}
     */
    this.movingState = false;

    /**
     * Facing state
     * @type {Boolean}
     */
    this.facingState = false;

    /**
     * Jumping state
     * @type {Boolean}
     */
    this.jumping = false;

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
     * Sprite frames
     * @type {Array}
     */
    this.frames = [0, 1, 0, 2, 3, 4];

    /**
     * Sprite reset frames
     * @type {Array}
     */
    this.resetFrames = [0, 2, 2, 0];

    /**
     * Velocity
     * @type {Number}
     */
    this.velocity = .5;

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

    this.init(obj);

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
   * Move player
   * @param {Number} dir
   */
  move(dir) {

    /** Wait until we finished */
    if (this.movingState === true || this.facingState === true) return void 0;

    let position = this.getTilePosition(this.x, this.y, dir);

    if (this.facing !== position.facing) {

      this.animations.push({
        type: "face",
        facing: position.facing
      });

      this.facingState = true;

      return void 0;
    }

    this.animations.push({
      type: "walk",
      obstacle: false,
      x: position.x,
      y: position.y,
      oX: this.x,
      oY: this.y
    });

    this.movingState = true;

  }

  /**
   * Facing
   * @param {Object} animation
   */
  face(animation) {

    this.faceCount += this.velocity;

    if (this.faceCount === DIMENSION / 4) {
      this.facing = animation.facing;
      this.frame = (this.frame + 3) % 4;
    }

    if (this.faceCount >= DIMENSION / 2) {
      this.faceCount = 0;
      this.facingState = false;
      this.frame = [0, 2, 2, 0][this.frame];
      this.animations.shift();
    }

  }

  /**
   * Walk
   * @param {Object} animation
   */
  walk(animation) {

    let halfStep = Math.ceil(Math.ceil(DIMENSION / (this.velocity * 2)) / 2);

    if (animation.obstacle === false) {
      /** Do halfstep */
      if (this.stepCount === halfStep) {
        this.frame = (this.frame + 1) % 4;

        if (BGS === true && this.isLocalPlayer === true) {
          Audio.playSoundDefault("ground_step.ogg");
        }

      }
      /** Move by velocity */
      if (this.x > animation.x) {
        this.x = this.x - this.velocity;
      }
      else if (this.x < animation.x) {
        this.x = this.x + this.velocity;
      }
      else if (this.y > animation.y) {
        this.y = this.y - this.velocity;
      }
      else if (this.y < animation.y) {
        this.y = this.y + this.velocity;
      }
      this.stepCount += this.velocity;
    }

    if (this.stepCount >= DIMENSION) {
      this.stopMoving(animation);
    }

  }

  /**
   * Stop moving
   * @param {Object} animation
   */
  stopMoving(animation) {

    this.x = animation.x;
    this.y = animation.y;

    this.last.x = animation.oX;
    this.last.y = animation.oY;

    this.movingState = false;

    this.stepCount = 0;

    this.frame = this.resetFrames[this.frame];

    this.animations.shift();

    /** Continue moving */
    if (this.isLocalPlayer === true) {
      if (this.instance.input.KeyBoard.KEYS[this.facingToKey(LEFT)].state === 1) {
        this.move(LEFT);
      }
      else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(UP)].state === 1) {
        this.move(UP);
      }
      else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(RIGHT)].state === 1) {
        this.move(RIGHT);
      }
      else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(DOWN)].state === 1) {
        this.move(DOWN);
      }
    }

  }

}