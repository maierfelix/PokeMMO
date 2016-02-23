import {
  FREE_CAMERA,
  Y_DEPTH_HACK,
  DIMENSION,
  MIN_SCALE, MAX_SCALE,
  PIXEL_SCALE
} from "../../cfg";

import math from "../../Math";

import MapEntity from "../Map/MapEntity";

/**
 * Editor
 * @class Editor
 * @export
 */
export default class Editor {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    /**
     * Instance reference
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Map reference
     * @type {Object}
     */
    this.map = null;

    /**
     * Camera reference
     * @type {Object}
     */
    this.camera = null;

    /**
     * Selected entity
     * @type {Object}
     */
    this.entitySelection = null;

    /**
     * Copied entity
     * @type {Object}
     */
    this.entityCopy = null;

    /**
     * Editing states
     * @type {Object}
     */
    this.STATES = {
      DRAGGING: false
    };

    /**
     * Drag helper
     * @type {Object}
     */
    this.drag = new math.Point(0, 0);

    /**
     * Dragging
     * @type {Boolean}
     * @getter
     * @setter
     */
    Object.defineProperty(this, "dragging", {
      get: function() {
        return (this.STATES.DRAGGING);
      },
      set: function(value) {
        this.STATES.DRAGGING = value;
      }
    });

    this.inheritInstance(instance);

  }

  /**
   * Inherit instance
   * @param {Object} instance
   */
  inheritInstance(instance) {

    this.map = instance.currentMap;

    this.camera = instance.camera;

  }

  /**
   * Drag a entity
   * @param {Number} x
   * @param {Number} y
   */
  dragEntity(x, y) {

    let entity = null;
    let offset = null;

    let xx = 0;
    let yy = 0;

    if ((entity = this.entitySelection) === null) return void 0;

    entity.STATES.EDITING = true;

    /** Don't allow dragging of focused entity */
    if (
      FREE_CAMERA === false &&
      this.instance.camera.entityFocus !== void 0 &&
      entity.id === this.instance.camera.entityFocus.id
    ) {
      return void 0;
    }

    offset = this.camera.getGameMouseOffset(x, y);

    entity.x <<= 0;
    entity.y <<= 0;

    /** Entity contains last coordinate offset */
    if (
      entity.last   !== void 0 &&
      entity.last.x !== void 0 &&
      entity.last.y !== void 0
    ) {
      entity.last.x = entity.x;
      entity.last.y = entity.y;
    }

    entity.x += offset.x - this.drag.x;
    entity.y += (offset.y - this.drag.y) + Y_DEPTH_HACK;

    entity.x = math.roundTo(entity.x, DIMENSION);
    entity.y = math.roundTo(entity.y, DIMENSION);

    this.drag.x = offset.x;
    this.drag.y = offset.y;

  }

  /**
   * Select a entity
   * @param {Number} x
   * @param {Number} y
   */
  selectEntity(x, y) {

    if (this.entitySelection !== null) {
      this.entitySelection.STATES.EDITING = false;
    }

    this.entitySelection = null;
    this.entitySelection = this.getEntityByMouse(x, y);

    let offset = this.camera.getGameMouseOffset(x, y);

    this.drag.x = offset.x;
    this.drag.y = offset.y;

  }

  /**
   * Loose selected entity
   */
  looseEntity() {

    if (this.entitySelection !== null) {
      this.STATES.DRAGGING = false;
      this.entitySelection.STATES.EDITING = false;
      this.entitySelection = null;
    }

  }

  /**
   * Edit a entity
   * @param {Number} x
   * @param {Number} y
   */
  editEntity(x, y) {

    let entity = this.getEntityByMouse(x, y);

    if (entity === null) return void 0;

  }

  /**
   * Delete selected entity
   */
  deleteEntity() {

    if (this.entitySelection !== null) {
      this.instance.removeEntity(this.entitySelection);
      this.entitySelection = null;
    }

  }

  /**
   * Cut out selected entity
   */
  cutEntity() {

    if (this.entitySelection !== null) {
      this.entityCopy = this.entitySelection;
      this.instance.removeEntity(this.entitySelection);
      this.entitySelection = null;
    }

  }

  /**
   * Copy selected entity
   */
  copyEntity() {

    let entity = this.entitySelection;

    if (entity === null) return void 0;

    this.entityCopy = entity;

  }

  /**
   * Paste selected entity
   */
  pasteEntity() {

    let entity = this.entityCopy;

    if (entity === null) return void 0;

    let map = this.instance.currentMap;

    if ((entity instanceof MapEntity) === false) return void 0;

    let tpl = map.objectTemplates[entity.name.toLowerCase()];

    tpl.x = entity.x;
    tpl.y = entity.y;
    tpl.z = entity.z;

    let pushEntity = map.addEntity(tpl);

    this.entityCopy = pushEntity;

    map.entities.push(pushEntity);

  }

  /**
   * Get a entity by mouse offset
   * @param  {Number} x
   * @param  {Number} y
   * @param  {Object}
   * @return {Object}
   */
  getEntityByMouse(x, y) {

    let object = null;

    let entity = null;

    let offset = this.camera.getGameMouseOffset(x, y);

    let xx = offset.x << 0;
    let yy = offset.y << 0;

    let ii = 0;
    let length = this.map.entities.length;;

    let entities = [];

    for (; ii < length; ++ii) {
      entity = this.map.entities[ii];
      if (
        math.cubicCollision(
          entity.x << 0, entity.y << 0,
          (entity.width  + entity.xMargin) - DIMENSION,
          (entity.height + entity.yMargin) - DIMENSION,
          xx, yy,
          1
        ) === true
      ) {
        entities.push(entity);
      }
    };

    if (entities.length <= 0) return (null);

    return (
      entities[math.get2DClosest(entities, xx, yy)]
    );

  }

}