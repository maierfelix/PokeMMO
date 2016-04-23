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

/**
 * Walk to a position
 * @param {Number} x
 * @param {Number} y
 */
export function walkTo(x, y) {

  if (this.moving === true) return void 0;

  let ii = 0;
  let length = 0;

  let lastX = math.roundTo(this.x, DIMENSION);
  let lastY = math.roundTo(this.y, DIMENSION);

  x = math.roundTo(x, DIMENSION);
  y = math.roundTo(y, DIMENSION);

  let xx = 0;
  let yy = 0;

  let dir = 0;

  let path = Maps[this.map].path.getShortestPath(
    lastX, lastY,
    x, y
  );

  if (
    path === void 0 ||
    path === null   ||
    path.length <= 0
  ) return void 0;

  length = path.length;

  for (; ii < length; ++ii) {
    xx = path[ii].x * DIMENSION;
    yy = path[ii].y * DIMENSION;
    if (xx !== lastX) {
      dir = xx < lastX ? LEFT : RIGHT;
    } else {
      if (yy !== lastY) {
        dir = yy < lastY ? UP : DOWN;
      }
    }
    this.animations.push({
      type: "walk",
      facing: dir,
      obstacle: false,
      x: xx,
      y: yy,
      oX: this.x,
      oY: this.y
    });
    lastX = xx;
    lastY = yy;
  };

  return void 0;

}

/**
 * Move player
 * @param {Number}   facing
 * @param {Function} resolve
 */
export function move(facing, resolve) {

  /** Wait until we finished */
  if (this.moving === true) return void 0;

  if (this.facing !== facing) {
    if (this.STATES.BUMPING === true) {
      this.skipBump();
    }
  } else {
    if (this.STATES.BUMPING === true) return void 0;
  }

  if (this.STATES.BUMPING === true) return void 0;

  this.moveCB = resolve || null;

  this.startMoving(this.x, this.y, facing);

  this.refreshState();

}

export function onlineMove(x, y, facing) {

  x = math.roundTo(x, DIMENSION);
  y = math.roundTo(y, DIMENSION);
  facing <<= 0;

  let obstacle = (
    Maps[this.map].collisionLayer.data[y / DIMENSION][x / DIMENSION] === 0 ||
    Maps[this.map].isEntityCollidable(this, x, y) === true
  );

  this.animations.push({
    type: "walk",
    facing: facing,
    obstacle: obstacle,
    x: x,
    y: y,
    oX: this.x,
    oY: this.y
  });

  this.idleTime = 0;

}

/**
 * Skip bumping
 */
export function skipBump() {

  this.stepCount = 0;

  if (this.animations[this.animationIndex - 1].type === "bump") {
    this.animations.splice(this.animationIndex - 1, 1);
  }

  this.moving = false;
  this.STATES.BUMPING = false;

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
 * Start moving
 * @param {Number} x
 * @param {Number} y
 * @param {Number} dir
 */
export function startMoving(x, y, dir) {

  if (this.facing !== dir) {
    this.changeFacing(dir);
    if (this.moveCB) {
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
      facing: dir,
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

  if (this.moveCB) {
    this.moveCB();
  }

}

/**
 * Walk
 * @param {Object} animation
 */
export function walk(animation) {

  if (this.facing !== animation.facing) {
    this.changeFacing(animation.facing);
    if (this.moveCB) {
      this.moveCB();
    }
    return void 0;
  }

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