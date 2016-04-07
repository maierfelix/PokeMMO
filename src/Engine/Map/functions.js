import {
  ajax as $GET,
  getPath as getPath
} from "../utils";

import math from "../../Math";

import {
  DIMENSION
} from "../../cfg";

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
    let map = new Map(this, data, this::function() {
      map.instance = this;
      this.maps[map.name] = map;
      this.currentMap = this.maps[map.name];
      if (this.editor !== null) {
        this.editor.map = this.currentMap;
      }
      return (resolve());
    });
  });

}

/**
 * Measure distance between entity and camera
 * @param {Object} entity
 * @param {Object} camera
 * @return {Object}
 */
export function distance(entity, camera) {

  let distance = math.distance(
    entity.x,
    entity.y,
    (((camera.size.x / 2) - camera.position.x) / camera.resolution),
    (((camera.size.y / 2) - camera.position.y) / camera.resolution)
  );

  distance.x /= 10;
  distance.y /= 10;

  return (distance);

}