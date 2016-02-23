import Entity from "./index";

/**
 * Add a new entity
 * @param {Object} entity
 * @export
 */
export function addEntity(entity) {

  if (entity.isLocalPlayer) {
    entity.instance = this.instance;
    this.localEntity = entity;
  }

  entity.fadeIn(1);

  this.currentMap.entities.push(entity);

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

  length = this.currentMap.entities.length;

  for (; ii < length; ++ii) {
    if (this.currentMap.entities[ii][prop] === key) {
      return (this.currentMap.entities[ii]);
    }
  };

}

/**
 * Remove a entity
 * @param {Object} entity
 */
export function removeEntity(entity) {

  var ii = 0;
  var length = 0;

  length = this.currentMap.entities.length;

  /** Clear entity selection */
  if (
    this.editor.entitySelection !== null &&
    entity.id === this.editor.entitySelection.id
  ) {
    this.editor.entitySelection = null;
  }

  for (; ii < length; ++ii) {
    if (this.currentMap.entities[ii].id === entity.id) {
      this.currentMap.entities[ii] = null;
      this.currentMap.entities.splice(ii, 1);
      break;
    }
  };

}

/**
 * Get a entity
 * @param {Number} id
 * @return {Number}
 */
export function getEntityById(id) {

  var property = "id";

  var index = 0;

  return (this.getEntityByProperty(id, property));

}

/**
 * Remove a entity by its id
 * @param {Number} id
 */
export function removeEntityById(id) {

  var entity = null;

  if ((entity = this.getEntityByProperty(id, property)) === void 0) return void 0;

  this.removeEntity(entity);

}