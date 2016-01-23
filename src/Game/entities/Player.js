import math from "../../Math";
import { DIMENSION } from "../../cfg";
import Entity from "../../Engine/Entity";
import Animation from "../../Engine/Animation";

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
     * Velocity
     * @type {Number}
     */
    this.velocity = 1.0;

    /**
     * Idle state
     * @type {Number}
     */
    this.idle = 0;

    /**
     * Moving state
     * @type {Boolean}
     */
    this.moving = false;

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

    /** Wait until we finished moving */
    if (this.moving === true) {
      /** Reached target but stop move didnt got switched */
      if (
        math.roundTo(this.x, DIMENSION) === this.x &&
        math.roundTo(this.y, DIMENSION) === this.y
      ) {
        //console.error("Received bugged destination");
        this.moving = false;
      } else {
        return void 0;
      }
    }

    var newDir = false;
    var position = this.getTilePosition(this.x, this.y, dir);

    if (this.facing !== position.facing) {
      this.facing = position.facing;
      newDir = true;
    }

    this.animations.push({
      type: "walk",
      obstacle: false,
      x: position.x,
      y: position.y,
      newDir: newDir
    });

    this.moving = true;

  }

  /**
   * Walk
   * @param {Object} animation
   * @animation
   */
  walk(animation) {

    var halfStep = Math.ceil(Math.ceil(DIMENSION / this.velocity) / 2);

    if (this.x % DIMENSION === 0 && this.y % DIMENSION === 0) {
      this.stepCount = 0;
    }

    if (animation.obstacle === false) {
      /** Do halfstep */
      if (
        this.stepCount === this.halfStep &&
        this.lastFramePosition !== Math.floor(this.x) + ',' + Math.floor(this.y)
      ) {
        this.frame = (this.frame + 1) % 4;
        this.lastFramePosition = Math.floor(this.x) + ',' + Math.floor(this.y);
      }
      /** Move by velocity */
      if (this.x > animation.x) {
        this.x = Math.max(animation.x, this.x - (this.velocity));
        this.facing = 3;
      }
      else if (this.x < animation.x) {
        this.x = Math.min(animation.x, this.x + (this.velocity));
        this.facing = 2;
      }
      else if (this.y > animation.y) {
        this.y = Math.max(animation.y, this.y - (this.velocity));
        this.facing = 1;
      }
      else if (this.y < animation.y) {
        this.y = Math.min(animation.y, this.y + (this.velocity));
        this.facing = 0;
      }
      this.stepCount += (this.velocity);
    }

    /** Got to destination */
    if (this.x === animation.x && this.y === animation.y) {
      if (this.stepCount % DIMENSION === 0) {
        this.moving = false;
        this.animations.shift();
      }
    }

  }

}