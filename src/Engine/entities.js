import Entity from "./Entity";
import { TextureCache } from "./utils";

/**
 * Add a new entity
 * @param {Object} obj
 * @export
 */
export function addEntity(obj) {

  var entity = null;

  entity = new Entity(obj);

  this.entities.push(entity);

}

/**
 * Get a entity by its
 * matching property
 * @param {*} key
 * @param {String} prop
 * @return {Number}
 */
export function getEntityByProperty(key, prop) {

  var ii = 0;
  var length = 0;

  length = this.entities.length;

  for (; ii < length; ++ii) {
    if (this.entities[ii][prop] === key) {
      return (ii);
    }
  };

}

/**
 * Remove a entity by its index
 * @param {Number} index
 */
export function removeEntityByIndex(index) {

  this.entities[index] = null;
  this.entities.splice(index, 1);

}

/**
 * Get a entity
 * @param {Number} id
 * @return {Number}
 */
export function getEntityById(id) {

  var property = "id";

  var index = 0;

  return (
    (index = this.getEntityByProperty(name, property)) >= 0 ? index : -1
  );

}

/**
 * Remove a entity by its id
 * @param {Number} id
 */
export function removeEntityById(id) {

  var index = 0;

  if ((index = this.getEntityById(id)) < 0) return void 0;

  this.removeEntityByIndex(index);

}