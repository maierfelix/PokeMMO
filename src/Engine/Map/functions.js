/**
 * Add a new map
 * @param {Object} map
 * @export
 */
export function addMap(map) {

  map.instance = this;

  this.maps[map.name] = map;

}