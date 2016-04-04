import { DIMENSION } from "../../cfg";
import math from "../../Math";

/**
 * Trigger events
 * @param {Object} entity
 * @param {Object} parent
 * @param {String} event
 */
export function triggerEvent(entity, parent, event) {

  /** Collide event */
  if (entity[event] !== null) {
    /** JavaScript API */
    if (entity[event].JavaScript !== void 0) {
      entity[event].JavaScript.bind(entity)(parent, this);
    }
    /** EngelScript API */
    if (entity[event].EngelScript !== void 0) {
      this.instance.environment.run(
        parent, entity,
        entity[event].EngelScript
      );
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
      event.orbitAround(entity);
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

  let position = math.getTilePosition(entity.x << 0, entity.y << 0, dir);

  return (
    this.collisionLayer.data[(position.y << 0) / DIMENSION][(position.x << 0) / DIMENSION] === 0 ||
    this.isEntityCollidable(entity, position.x, position.y) === true
  );

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
      ((event.size.x * event.scale) + event.xMargin) - DIMENSION,
      ((event.size.y * event.scale) + event.yMargin) - DIMENSION,
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
          ((event.size.x * event.scale) + event.xMargin) - DIMENSION,
          ((event.size.y * event.scale) + event.yMargin) - DIMENSION,
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

  let width  = (entity.size.x + entity.xMargin) / DIMENSION;
  let height = (entity.size.y + entity.yMargin) / DIMENSION;

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