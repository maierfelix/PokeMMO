import {
  OFFLINE_MODE,
  Y_DEPTH_HACK,
  DIMENSION,
  LEFT, RIGHT, UP, DOWN,
  GOD_MODE
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

import math from "../../../Math";

export function move(dir, resolve) {

  if (
    this.STATES.LOCK    === true ||
    this.STATES.EDITING === true ||
    this.moving === true
  ) return void 0;

  let x = this.x;
  let y = this.y;

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
      type: "move",
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
export function bumpAnimation(animation) {

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
    this.animations.shift();
    this.STATES.BUMPING = false;
    this.refreshState();
  }

}

/**
 * Walk
 * @param {Object} animation
 */
export function moveAnimation(animation) {

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
 * Stop moving
 * @param {Object} animation
 */
export function stopMoving(animation) {

  this.x = animation.x;
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

  this.animations.shift();

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

  if (this.moveCB) {
    this.moveCB();
  }

}