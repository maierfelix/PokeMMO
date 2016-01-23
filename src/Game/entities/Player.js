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

    this.walkAnimation = new Animation({
      width: 16, height: 16,
      frameTime: .13333,
      row:       [0, 1, 0],
      loop:      false
    });

    /**
     * Animations
     * @type {Object}
     */
    this.animations = {
      walk: null
    };

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

    var position = this.getTilePosition(this.x, this.y, dir);

    this.x = position.x;
    this.y = position.y;

    this.facing = position.facing;

  }

  /**
   * Jump
   */
  jump() {

  }

}