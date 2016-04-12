import MapEntity from "../Map/MapEntity";

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

  if (entity.customOpacity() === false) {
    entity.fadeIn(1);
  }

  this.currentMap.entities.push(entity);

}

/**
 * Clone a entity
 * @param  {Object} entity
 * @return {Object}
 */
export function cloneEntity(entity) {

  let entities = this.instance.entities;

  let map = this.currentMap;

  let clone = null;
  let tmp = null;

  if (entity instanceof entities.Player) {
    tmp = new entities.Player({
      name: "undefined",
      map: entity.map,
      x: entity.x, y: entity.y,
      zIndex: entity.zIndex,
      sprite: entity.sprite,
      width: entity.width, height: entity.height,
      isLocalPlayer: false,
      collidable: entity.collidable,
      shadow: entity.hasShadow
    });
    if (entity.instance) {
      tmp.instance = entity.instance;
    }
    if (tmp.hasShadow) {
      tmp.shadow.x = entity.shadow.x;
      tmp.shadow.y = entity.shadow.y;
    }
    tmp.fadeIn(.75);
  }
  else if (entity instanceof MapEntity) {
    tmp = map.objectTemplates[entity.name.toLowerCase()];
  } else {
    return void 0;
  }

  tmp.x = entity.x;
  tmp.y = entity.y;
  tmp.z = entity.z;

  if (entity instanceof MapEntity) {
    clone = map.addEntity(tmp);
  } else {
    clone = tmp;
  }

  return (clone);

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