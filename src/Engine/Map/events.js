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
  let length = 0;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (entities[ii].id === entity.id) continue;
    if (entities[ii].collidable === true) {
      if (math.cubicCollision(entities[ii].x, entities[ii].y, entities[ii].width / 2, entities[ii].height / 2, x, y, 1) === true) {
        return (true);
      }
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
    this.collisionLayer.data[position.y / DIMENSION][position.x / DIMENSION] === 0 ||
    this.isEntityCollidable(entity, position.x, position.y) === true
  );

}