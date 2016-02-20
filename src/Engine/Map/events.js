import { DIMENSION } from "../../cfg";
import math from "../../Math";

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
    if (
      math.cubicCollision(
        x, y, entity.width / DIMENSION, entity.height / DIMENSION,
        entities[ii].x, entities[ii].y, entities[ii].width / DIMENSION, entities[ii].height / DIMENSION
      ) === true) {
      return (true);
    }
  };

  return (false);

}

/**
 * Obstacle check
 * @param {Object} entity
 * @param {Number} dir
 * @return {Boolean}
 */
export function isObstacle(entity, dir) {

  let position = math.getTilePosition(entity.x, entity.y, dir);

  return (
    this.collisionLayer.data[(position.y << 0) / DIMENSION][(position.x << 0) / DIMENSION] === 0 ||
    this.isEntityCollidable(entity, position.x, position.y) === true
  );

}