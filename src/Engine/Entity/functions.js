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

  if (entity.noise !== null) {
    entity.noise.unmute();
    this.currentMap.entityNoises.push(entity);
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
    clone = new MapEntity(tmp);
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

  let ii = 0;
  let length = 0;

  length = this.currentMap.entities.length;

  for (; ii < length; ++ii) {
    if (this.currentMap.entities[ii][prop] === key) {
      return (this.currentMap.entities[ii]);
    }
  };

  return (-1);

}

/**
 * Remove a entity
 * @param {Object} entity
 */
export function removeEntity(entity) {

  let noiseEntity = null;

  /** Clear entity selection */
  if (
    this.editor.entitySelection !== null &&
    entity.id === this.editor.entitySelection.id
  ) {
    this.editor.entitySelection = null;
  }

  noiseEntity = this.removeEntityFromArray(entity, this.currentMap.entityNoises);
  this.removeEntityFromArray(entity, this.currentMap.entities);

  if (noiseEntity !== void 0) {
    noiseEntity.noise.mute();
  }

}

/**
 * Remove a entity from an array
 * @param  {Object} entity
 * @param  {Array}  entities
 * @return {Object}
 */
export function removeEntityFromArray(entity, array) {

  let ii = 0;
  let length = 0;

  let id = entity.id;

  let cache = null;

  length = array.length;

  for (; ii < length; ++ii) {
    if (array[ii].id === id) {
      cache = array[ii];
      array[ii] = null;
      array.splice(ii, 1);
      return (cache);
    }
  };

  return void 0;

}

/**
 * Get a entity
 * @param {Number} id
 * @return {Number}
 */
export function getEntityById(id) {

  let property = "id";

  let index = 0;

  return (this.getEntityByProperty(id, property));

}

/**
 * Remove a entity by its id
 * @param {Number} id
 */
export function removeEntityById(id) {

  let entity = null;

  if ((entity = this.getEntityByProperty(id, property)) === void 0) return void 0;

  this.removeEntity(entity);

}