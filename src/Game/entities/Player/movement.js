import {
  OFFLINE_MODE,
  Y_DEPTH_HACK,
  DIMENSION, GRAVITY,
  BGM, BGS,
  LEFT, RIGHT, UP, DOWN,
  VOLUME, GOD_MODE
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

import math from "../../../Math";

import Audio from "../../../Engine/Audio";

/**
 * Jump
 */
export function jump() {

  if (this.jumpable === false) return void 0;

  this.refreshState();

  if (
    this.STATES.JUMPING === true ||
    this.STATES.LOCK === true
  ) return void 0;

  this.STATES.JUMPING = true;

  if (this.onJump !== null) {
    Maps[this.map].triggerEvent(this, this, "onJump");
  }

  this.jumping();

  if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
    this.instance.engine.connection.sendData(
      "Jumping",
      [this.id]
    );
  }

  this.idleTime = 0;

}

/**
 * Jumping
 */
export function jumping() {

  this.frame = 3;

  if (this.z === 0) {
    this.playStateSound();
  }

  this.z += this.gravity;

  this.refreshState();

  if (this.z < 0) {
    this.gravity += .1;
    this.shadow.position.set(-(this.z / 2), this.shadowY - (this.z));
    this.shadow.scale.set(this.z, this.z);
  } else {
    this.gravity = GRAVITY;
    this.z = 0;
    this.resetFrame();
    this.refreshState();
    this.shadow.position.set(this.shadowX, this.shadowY);
    this.shadow.scale.set(0, 0);

    if (this.isLocalPlayer === true) {
      let ii = 0;
      for (let entity of game.engine.currentMap.entities) {
        ++ii;
        if (entity.id === this.id) continue;
        setTimeout(function() {
          entity.jump();
        }, ii * 25);
      };
    }

  }

}

/**
 * Walk a path
 * moveRoute("1d,2r,2u,2l,1d,1r");
 * @param  {String} path
 */
export function moveRoute(path) {

  let move = null;
  let moves = path.split(",");

  let ii = 0;
  let length = moves.length;

  let rxN = /(\d+)/g;

  for (; ii < length; ++ii) {
    move = moves[ii].replace('"', "");
    let dir = move.replace(rxN, "");
    let amount = Number(move.match(rxN));
    console.log(dir, amount);
  };

  return void 0;

}

/**
 * Move player
 * @param {Number}   dir
 * @param {Function} resolve
 */
export function move(dir, resolve) {

  if (
    this.STATES.LOCK    === true ||
    this.STATES.EDITING === true
  ) return void 0;

  /** Wait until we finished */
  if (this.moving === true) return void 0;

  if (this.facing !== dir) {
    /** Skip bumping state */
    if (this.STATES.BUMPING === true) {
      this.stepCount = 0;
      if (this.animations[this.animationIndex - 1].type === "bump") {
        this.animations.splice(this.animationIndex - 1, 1);
      }
      this.moving = false;
      this.STATES.BUMPING = false;
    }
  } else {
    if (this.STATES.BUMPING === true) return void 0;
  }

  if (this.STATES.BUMPING === true) return void 0;

  this.moveCB = resolve || null;

  this.startMoving(this.x, this.y, dir);

  this.refreshState();

}

/**
 * Change facing
 * @param {Number} dir
 */
export function changeFacing(dir) {

  if (this.STATES.LOCK === true) return void 0;

  this.idleTime = 0;

  if (
    this.moving === false &&
    this.STATES.BUMPING === false
  ) {
    this.lastFacing = this.facing;
    this.facing = dir;
    if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
      this.instance.engine.connection.sendData(
        "Facing",
        [this.id, this.facing]
      );
    }
    this.frame = (this.frame + 3 + this.getFrameIndex()) % 4;
  }

  /** TODO: Avoid settimeout */
  setTimeout(this::function() {
    if (
      this.moving === false &&
      this.STATES.BUMPING === false &&
      this.STATES.JUMPING === false
    ) {
      this.resetFrame();
    }
  }, 30);

}

/**
 * Do halfstep
 */
export function halfStep() {

  let half = Math.ceil(Math.ceil(DIMENSION / (this.velocity * 2)) / 2);

  if (this.stepCount === half) {
    this.frame = (this.frame + 1 + this.getFrameIndex()) % 4;
  }

}

/**
 * Bump
 * @param {Object} animation
 */
export function bump(animation) {

  if (this.stepCount <= 0) {
    this.playStateSound();
  }

  this.stepCount += .5;

  if (this.STATES.JUMPING === false) {
    this.halfStep();
  }

  if (this.stepCount >= DIMENSION * 2) {
    if (this.STATES.JUMPING === false) {
      this.halfStep();
      this.resetFrame();
    }
    this.stepCount = 0;
    this.stopAnimation();
    this.STATES.BUMPING = false;
    this.refreshState();
  }

}

/**
 * Play sound
 */
export function playStateSound() {

  if (BGS !== true) return void 0;

  let volume = this.isLocalPlayer === true ? VOLUME.NETWORK_PLAYER : VOLUME.LOCAL_PLAYER;

  let dist = Maps[this.map].distance(this, game.engine.camera);

  if (this.STATES.JUMPING === true && this.z === 0) {
    Audio.playSound("jump", volume, dist.x, dist.y);
  }

  /** Player is bumping */
  if (this.STATES.BUMPING === true) {
    Audio.playSound("bump", volume, dist.x, dist.y);
  /** Player is walking */
  } else {
    if (this.moving === true) {
      if (this.soundSteps >= DIMENSION * 2) {
        this.soundSteps = 0;
        if (this.STATES.RUNNING === true) {
          Audio.playSound("run_step", volume, dist.x, dist.y);
        } else {
          Audio.playSound("ground_step", volume, dist.x, dist.y);
        }
      }
    }
  }

}

/**
 * Walk
 * @param {Object} animation
 */
export function walk(animation) {

  if (this.stepCount <= 0) {
    if (this.STATES.JUMPING === false) {
      this.resetFrame();
    }
    if (animation.obstacle === false) {
      /** onEnter event => animation.x, animation.y */
    }
  }

  this.playStateSound();

  if (animation.obstacle === false) {
    if (this.STATES.JUMPING === false) {
      this.halfStep();
    }
    if (this.x > animation.x) {
      this.x -= this.velocity;
    }
    else if (this.x < animation.x) {
      this.x += this.velocity;
    }
    else if (this.y > animation.y) {
      this.y -= this.velocity;
    }
    else if (this.y < animation.y) {
      this.y += this.velocity;
    }
    this.stepCount += this.velocity;
  } else {
    animation.x = this.x;
    animation.y = this.y;
    this.stopMoving(animation);
  }

  if (this.stepCount >= DIMENSION) {
    this.lastFacing = this.facing;
    this.stopMoving(animation);
  }

  this.soundSteps += this.velocity;

}

/**
 * Start moving
 * @param {Number} x
 * @param {Number} y
 * @param {Number} dir
 */
export function startMoving(x, y, dir) {

  if (this.facing !== dir) {
    this.changeFacing(dir);
    if (this.moveCB !== null) {
      this.moveCB();
    }
    return void 0;
  }

  let position = math.getTilePosition(x, y, dir);
  let obstacle = Maps[this.map].isObstacle(this, dir);

  if (this.isLocalPlayer === true && GOD_MODE === true) {
    obstacle = false;
  }

  if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
    this.instance.engine.connection.sendData(
      "Position",
      [this.id, dir, x, y]
    );
  }

  /** Blocked, bump so */
  if (obstacle === true) {
    this.animations.push({
      type: "bump",
      x: x,
      y: y
    });
    this.STATES.BUMPING = true;
  /** Crossable */
  } else {
    this.animations.push({
      type: "walk",
      obstacle: obstacle,
      x: position.x,
      y: position.y,
      oX: x,
      oY: y
    });
    this.moving = true;
  }

  this.idleTime = 0;

}

/**
 * Stop moving
 * @param {Object} animation
 */
export function stopMoving(animation) {

  this.x = animation.x;
  /** Depth sorting vertical hack */
  this.y = animation.y + Y_DEPTH_HACK;

  this.last.x = animation.oX;
  this.last.y = animation.oY;

  this.moving = false;

  this.stepCount = 0;

  setTimeout(this::function() {
    if (
      this.moving === false &&
      this.STATES.BUMPING === false &&
      this.STATES.JUMPING === false
    ) {
      this.resetFrame();
    }
  }, 100);

  this.stopAnimation();

  this.refreshState();

  /** Continue moving */
  if (this.isLocalPlayer === true) {
    if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(LEFT)) === true) {
      this.move(LEFT);
    }
    else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(UP)) === true) {
      this.move(UP);
    }
    else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(RIGHT)) === true) {
      this.move(RIGHT);
    }
    else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(DOWN)) === true) {
      this.move(DOWN);
    } else {
      this.soundSteps = DIMENSION;
    }
  } else {
    this.soundSteps = DIMENSION;
  }

  if (this.moveCB !== null) {
    this.moveCB();
  }

}