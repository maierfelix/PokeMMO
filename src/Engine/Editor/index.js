import {
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

    if ((entity = this.entitySelection) === null) return void 0;

    entity.STATES.EDITING = true;

    /** Don't allow dragging of focused entity */
    if (
      this.instance.camera.entityFocus !== void 0 &&
      entity.id === this.instance.camera.entityFocus.id
    ) {
      return void 0;
    }

    let offset = this.camera.getGameMouseOffset(x, y);

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

    entity.x = offset.x;
    entity.y = offset.y + Y_DEPTH_HACK;

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

    map.entities.push(
      map.addEntity(tpl)
    );

  }

  /**
   * Get a entity by mouse offset
   * @param {Number} x
   * @param {Number} y
   * @param {Object}
   */
  getEntityByMouse(x, y) {

    let object = null;

    let offset = this.camera.getGameMouseOffset(x, y);

    let xx = offset.x << 0;
    let yy = offset.y << 0;

    let ii = 0;
    let length = this.map.entities.length;;

    for (; ii < length; ++ii) {
      if (
        math.roundTo(this.map.entities[ii].x, DIMENSION) === xx &&
        math.roundTo(this.map.entities[ii].y, DIMENSION) === yy
      ) {
        object = this.map.entities[ii];
      }
    };

    return (object);

  }

}