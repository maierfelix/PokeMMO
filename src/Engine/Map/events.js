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
    this.instance.environment.run(
      parent, entity,
      entity[event]
    );
  }

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

  let cubicCollision = false;

  let collide = false;

  for (; ii < length; ++ii) {
    if (entities[ii].id === entity.id) continue;
    cubicCollision = math.cubicCollision(
      entities[ii].position.x << 0, entities[ii].position.y << 0,
      ((entities[ii].size.x * entities[ii].scale) + entities[ii].xMargin) - DIMENSION,
      ((entities[ii].size.y * entities[ii].scale) + entities[ii].yMargin) - DIMENSION,
      x, y,
      1
    );
    /** Entity is a collidable */
    if (entities[ii].collidable === true) {
      /** Collision box */
      if (entities[ii].collisionBox.length > 0) {
        if (this.collidesWithCollisionBox(entities[ii], x, y) === true) {
          this.triggerEvent(entities[ii], entity, "onCollide");
          collide = true;
        }
      /** Cubic based collision */
      } else {
        if (cubicCollision === true) {
          this.triggerEvent(entities[ii], entity, "onCollide");
          collide = true;
        }
      }
    } else {
      if (
        math.cubicCollision(
          entities[ii].position.x << 0, entities[ii].position.y << 0,
          ((entities[ii].size.x * entities[ii].scale) + entities[ii].xMargin) - DIMENSION,
          ((entities[ii].size.y * entities[ii].scale) + entities[ii].yMargin) - DIMENSION,
          entity.position.x << 0, entity.position.y << 0,
          1
        ) === true
      ) {
        this.triggerEvent(entities[ii], entity, "onLeave");
      }
      if (cubicCollision === true) {
        this.triggerEvent(entities[ii], entity, "onEnter");
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