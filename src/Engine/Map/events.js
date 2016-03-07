import { DIMENSION } from "../../cfg";
import math from "../../Math";

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

  for (; ii < length; ++ii) {
    if (entities[ii].id === entity.id) continue;
    if (entities[ii].collidable === false) continue;
    if (entities[ii].collisionBox.length > 0) {
      if (this.collidesWithCollisionBox(entities[ii], x, y) === true) return (true);
    } else {
      if (
        math.cubicCollision(
          entities[ii].x << 0, entities[ii].y << 0,
          (entities[ii].width  + entities[ii].xMargin) - DIMENSION,
          (entities[ii].height + entities[ii].yMargin) - DIMENSION,
          x, y,
          1
        ) === true
      ) {
        return (true);
      }
    }
  };

  return (false);

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

  let width  = (entity.width  + entity.xMargin) / DIMENSION;
  let height = (entity.height + entity.yMargin) / DIMENSION;

  let length = width * height;

  let eX = entity.x << 0;
  let eY = entity.y << 0;

  for (; ii < length; ++ii) {
    tile = entity.collisionBox[yy + xx];
    if (tile === 1) {
      if (
        eX + (xx * DIMENSION) === x &&
        eY + ((yy / width) * DIMENSION) === y
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