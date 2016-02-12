import math from "../../Math";

/**
 * Add a new map
 * @param {Object} map
 * @export
 */
export function addMap(map) {

  map.instance = this;

  this.maps[map.name] = map;

}

/**
 * Measure distane between 2 entities
 * @param {Object} entityA
 * @param {Object} entityB
 * @return {Object}
 */
export function distance(entityA, entityB) {

  let distance = math.distance(entityA.x, entityA.y, entityB.x, entityB.y);

  return (distance);

}