import {
  ajax as $GET,
  getPath as getPath
} from "../utils";
import math from "../../Math";

import Map from "../Map";

/**
 * Add a new map
 * @param {String}   path
 * @param {Function} resolve
 */
export function addMap(path, resolve) {

  $GET(path).then(
    JSON.parse
  ).then(this::function(data) {
    data.path = getPath(path);
    let map = new Map(data, this::function() {
      map.instance = this;
      this.maps[map.name] = map;
      this.currentMap = this.maps[map.name];
      return (resolve());
    });
  });

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