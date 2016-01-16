import layer from "./Layer";

/**
 * Add a new layer
 * @param {Object} obj
 * @export
 */
export function addLayer(obj) {

  this.layers.push(
    new layer(obj)
  );

}

/**
 * Get a layer by its
 * matching property
 * @param {*} key
 * @param {String} prop
 * @return {Number}
 */
export function getLayerByProperty(key, prop) {

  var ii = 0;
  var length = 0;

  length = this.layers.length;

  for (; ii < length; ++ii) {
    if (this.layers[ii][prop] === key) {
      return (ii);
    }
  };

}

/**
 * Remove a layer by its index
 * @param {Number} index
 */
export function removeLayerByIndex(index) {

  this.layers[index] = null;
  this.layers.splice(index, 1);

}

/**
 * Get a layer by its name
 * @param {String} name
 * @return {Number}
 */
export function getLayerByName(name) {

  var property = "name";

  var index = 0;

  return (
    (index = this.getLayerByProperty(name, property)) >= 0 ? index : -1
  );

}

/**
 * Remove a layer by its name
 * @param {String} name
 */
export function removeLayerByName(name) {

  var index = 0;

  if ((index = this.getLayerByName(name)) < 0) return void 0;

  this.removeLayerByIndex(index);

}