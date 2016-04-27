import { DIMENSION } from "../../cfg";
import math from "../../Math";

/**
 * Trigger events
 * @param {Object} entity
 * @param {Object} parent
 * @param {String} event
 */
export function triggerEvent(entity, parent, event) {

  let cmd = entity[event];

  /** Collide event */
  if (cmd !== null) {
    /** JavaScript API */
    if (cmd.JavaScript !== void 0) {
      cmd.JavaScript.bind(entity)(parent, this);
    }
    /** EngelScript API */
    if (cmd.EngelScript !== void 0) {
      this.instance.environment.run(
        parent, entity,
        cmd.EngelScript
      );
    } else {
      if (cmd.JavaScript === void 0) {
        if (cmd instanceof Function) {
          cmd.bind(entity)(parent, this);
        }
      }
    }
  }

  return void 0;

}

/**
 * Action trigger
 * @param {Object} position
 * @param {Object} entity
 */
export function actionTrigger(position, entity) {

  let entities = this.entities;

  let ii = 0;
  let length = entities.length;

  let event = null;

  let id = entity.id;

  let x = position.x << 0;
  let y = position.y << 0;

  for (; ii < length; ++ii) {
    event = entities[ii];
    if (event.id === id) continue;
    if (event.x << 0 === x && event.y << 0 === y) {
      this.triggerEvent(event, entity, "onAction"); 
    }
  };

  return void 0;

}

/**
 * Obstacle check
 * @param {Object} entity
 * @param {Number} dir
 * @return {Boolean}
 */
export function isObstacle(entity, dir) {

  let position = math.getTilePosition(entity.x << 0, entity.y << 0, dir << 0);

  let obstacle = (
    this.collisionLayer.data[(position.y << 0) / DIMENSION][(position.x << 0) / DIMENSION] === 0 ||
    this.isEntityCollidable(entity, position.x, position.y) === true
  );

  /** Entity is leader of a following entity */
  if (entity.leader !== null) {
    this.follow(entity, obstacle);
  }

  return (obstacle);

}

/**
 * Entity collidable check
 * @param  {Object}  entity
 * @param  {Boolean} obstacle
 */
export function follow(entity, obstacle) {

  let leaderX = entity.leader.x << 0;
  let leaderY = entity.leader.y << 0;

  let followX = entity.follow.x << 0;
  let followY = entity.follow.y << 0;

  if (
    obstacle === false
  ) {
    if (
      leaderX === followX &&
      leaderY === followY
    ) {
      entity.leader.walkTo(entity.x, entity.y);
      entity.follow.x = entity.x << 0;
      entity.follow.y = entity.y << 0;
    }
  }

}

/**
 * Entity collidable check
 * @param  {Object} entity
 * @param  {Number} x
 * @param  {Number} y
 * @return {Boolean}
 */
export function isEntityCollidable(entity, x, y) {

  let entities = this.entities;

  let ii = 0;
  let length = entities.length;

  let intersection = false;

  let collide = false;

  let id = entity.id;

  let event = null;

  for (; ii < length; ++ii) {
    event = entities[ii];
    if (event.id === id) continue;
    intersection = math.linearIntersect(
      event.position.x << 0, event.position.y << 0,
      ((math.roundTo(event.size.x, DIMENSION) * event.scale) + event.xMargin) - DIMENSION,
      ((math.roundTo(event.size.y, DIMENSION) * event.scale) + event.yMargin) - DIMENSION,
      x, y,
      1
    );
    /** Entity is a collidable */
    if (event.collidable === true) {
      /** Collision box */
      if (event.collisionBox.length > 0) {
        if (this.collidesWithCollisionBox(event, x, y) === true) {
          this.triggerEvent(event, entity, "onCollide");
          collide = true;
        }
      /** Cubic based collision */
      } else {
        if (intersection === true) {
          this.triggerEvent(event, entity, "onCollide");
          collide = true;
        }
      }
    } else {
      if (
        math.linearIntersect(
          event.position.x << 0, event.position.y << 0,
          ((math.roundTo(event.size.x, DIMENSION) * event.scale) + event.xMargin) - DIMENSION,
          ((math.roundTo(event.size.y, DIMENSION) * event.scale) + event.yMargin) - DIMENSION,
          entity.position.x << 0, entity.position.y << 0,
          1
        ) === true
      ) {
        this.triggerEvent(event, entity, "onLeave");
      }
      if (intersection === true) {
        this.triggerEvent(event, entity, "onEnter");
      }
    }
  };

  return (collide);

}

/**
 * Collides with a entity collision box
 * @param  {Number} entity
 * @param  {Number} x
 * @param  {Number} y
 * @return {Boolean}
 */
export function collidesWithCollisionBox(entity, x, y) {

  let tile = 0;

  let ii = 0;

  let xx = 0;
  let yy = 0;

  let dim = DIMENSION * entity.scale;

  let width  = (math.roundTo(entity.size.x, DIMENSION) + entity.xMargin) / DIMENSION;
  let height = (math.roundTo(entity.size.y, DIMENSION) + entity.yMargin) / DIMENSION;

  let length = width * height;

  let eX = entity.position.x << 0;
  let eY = entity.position.y << 0;

  for (; ii < length; ++ii) {
    tile = entity.collisionBox[yy + xx];
    if (tile === 1) {
      if (
        eX + (xx * dim) === x &&
        eY + ((yy / width) * dim) === y
      ) {
        return (true);
      }
    }
    ++xx;
    if (xx >= width) {
      yy += width;
      xx = 0;
    }
  };

  return (false);

}