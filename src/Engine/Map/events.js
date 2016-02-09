import { DIMENSION } from "../../cfg";

/**
 * Entity collidable check
 * @param {Number} x
 * @param {[type]} y
 * @return {Boolean}
 */
export function isEntityCollidable(x, y) {

  let entities = this.instance.entities;

  let ii = 0;
  let length = 0;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (!(
      entities[ii].x === x &&
      entities[ii].y === y
    )) continue;
    if (entities[ii].collidable === true) return (true);
  };

  return (false);

}

/**
 * Obstacle check
 * @param {Number} x
 * @param {[type]} y
 * @return {Boolean}
 */
export function isObstacle(x, y) {

  return (
    this.collisionLayer.data[y / DIMENSION * 2][x / DIMENSION * 2] === 0 ||
    this.isEntityCollidable(x, y) === true
  );

}