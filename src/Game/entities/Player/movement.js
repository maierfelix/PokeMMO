import {
  DIMENSION,
  BGM, BGS,
  LEFT, RIGHT, UP, DOWN,
  VOLUME
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

import Audio from "../../../Engine/Audio";

/**
 * Jump
 */
export function jump() {

  this.refreshState();

  if (this.STATES.JUMPING === true) return void 0;

  this.animations.push({
    type: "jumping",
    gravity: -.9375
  });

  this.STATES.JUMPING = true;

  this.playStateSound();

  this.idleTime = 0;

}

/**
 * Jumping
 * @param {Object} animation
 */
export function jumping(animation) {

  this.frame = 3;

  this.z += animation.gravity;

  if (this.z < 0) {
    animation.gravity += 0.1;
    this.shadow.position.set(0, -1.75 - (this.z));
    this.shadow.scale.set(-(this.z / 4), -(this.z / 4));
  } else {
    this.animations.shift();
    this.z = 0;
    this.resetFrame();
    this.refreshState();
    this.shadow.position.set(0, -1.75);
    this.shadow.scale.set(0, 0);
  }

}

/**
 * Move player
 * @param {Number} dir
 */
export function move(dir) {

  /** Wait until we finished */
  if (this.moving === true) return void 0;

  if (this.facing !== dir) {
    this.changeFacing(dir);
    return void 0;
  }

  if (this.STATES.BUMPING === true) return void 0;

  this.startMoving(dir);

  this.refreshState();

}

/**
 * Change facing
 * @param {Number} dir
 */
export function changeFacing(dir) {

  if (this.STATES.JUMPING === true) return void 0;

  this.idleTime = 0;

  if (
    this.moving === false &&
    this.STATES.BUMPING === false
  ) {
    this.lastFacing = this.facing;
    this.facing = dir;
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

  /**
   * Player changed facing while in
   * bumping state -> skip bumping
   * and let him move immediately
   */
  if (this.STATES.BUMPING === true) {
    this.stepCount = 0;
    this.animations.shift();
    this.moving = false;
    this.STATES.BUMPING = false;
  }

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

  this.halfStep();

  if (this.stepCount >= DIMENSION * 2) {
    this.halfStep();
    this.stepCount = 0;
    this.resetFrame();
    this.animations.shift();
    this.STATES.BUMPING = false;
  }

}

/**
 * Play sound
 */
export function playStateSound() {

  if (BGS !== true) return void 0;

  let volume = this.isLocalPlayer === true ? VOLUME.NETWORK_PLAYER : VOLUME.LOCAL_PLAYER;

  let dist = Maps[this.map].distance(this, game.engine.localEntity);

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
    this.resetFrame();
    if (animation.obstacle === false) {
      /** onEnter event => animation.x, animation.y */
    }
  }

  this.playStateSound();

  if (animation.obstacle === false) {
    this.halfStep();
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
 * @param {Number} dir
 */
export function startMoving(dir) {

  let position = this.getTilePosition(this.x, this.y, dir);
  let obstacle = Maps[this.map].isObstacle(position.x, position.y);

  /** Blocked, bump so */
  if (obstacle === true) {
    this.animations.push({
      type: "bump",
      x: this.x,
      y: this.y
    });
    this.STATES.BUMPING = true;
  /** Crossable */
  } else {
    this.animations.push({
      type: "walk",
      obstacle: obstacle,
      x: position.x,
      y: position.y,
      oX: this.x,
      oY: this.y
    });
    this.moving = true;
    //console.log(Maps[this.map].path.getShortestPath(this.x, this.y, 32, 32));
  }

  this.idleTime = 0;

}

/**
 * Stop moving
 * @param {Object} animation
 */
export function stopMoving(animation) {

  this.x = animation.x;
  this.y = animation.y;

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
    } else {
      this.soundSteps = DIMENSION;
    }
  } else {
    this.soundSteps = DIMENSION;
  }

}