import {
  FREE_CAMERA,
  Y_DEPTH_HACK,
  DIMENSION,
  MIN_SCALE, MAX_SCALE,
  PIXEL_SCALE
} from "../../cfg";

import math from "../../Math";

import Commander from "../Commander";

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
     * Instance reference
     * @type {Object}
     */
    this.commander = new Commander();

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

    this.init();

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
   * Initialise
   */
  init() {

    /** Select command */
    this.commander.newCommand({
      action: "select",
      onUndo: function(entity, selection) {
        this.entitySelection = null;
        this.entitySelection = selection;
      },
      onRedo: function(entity, selection) {
        this.entitySelection = null;
        this.entitySelection = entity;
      }
    });

    /** Drag command */
    this.commander.newCommand({
      action: "drag",
      onUndo: function(x, y) {
        this.x -= x;
        this.y -= y;
        this.last.x = this.x;
        this.last.y = this.y;
      },
      onRedo: function(x, y) {
        this.x += x;
        this.y += y;
        this.last.x = this.x;
        this.last.y = this.y;
      }
    });

    /** Delete command */
    this.commander.newCommand({
      action: "delete",
      onUndo: function(entity) {
        this.instance.addEntity(entity);
        this.entitySelection = entity;
      },
      onRedo: function(entity) {
        this.instance.removeEntity(entity);
        this.entitySelection = null;
      }
    });

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

    let rX = 0;
    let rY = 0;

    if ((entity = this.entitySelection) === null) return void 0;

    /** Don't allow dragging of focused entity */
    if (
      FREE_CAMERA === false &&
      this.camera.entityFocus !== void 0 &&
      entity.id === this.camera.entityFocus.id
    ) {
      return void 0;
    }

    offset = this.camera.getGameMouseOffset(x, y);

    rX = offset.x - (entity.x << 0);
    rY = offset.y - (entity.y << 0);

    /** Only fire drag if we got a new offset to drag to */
    if (
      offset.x === this.drag.x &&
      offset.y === this.drag.y
    ) return void 0;

    xx = offset.x - this.drag.x;
    yy = (offset.y - this.drag.y) + Y_DEPTH_HACK;

    this.commander.push("drag", entity, [xx, yy]);

    this.drag.x = offset.x;
    this.drag.y = offset.y;

  }

  /**
   * Select a entity
   * @param {Number} x
   * @param {Number} y
   */
  selectEntity(x, y) {

    this.commander.push("select", this, [this.getEntityByMouse(x, y), this.entitySelection]);

    let offset = this.camera.getGameMouseOffset(x, y);

    this.drag.x = offset.x;
    this.drag.y = offset.y;

  }

  /**
   * Edit a entity
   * @param {Number} x
   * @param {Number} y
   */
  editEntity(x, y) {

    let entity = this.getEntityByMouse(x, y);

    if (entity === null) return void 0;

    console.log(entity);

  }

  /**
   * Delete selected entity
   */
  deleteEntity() {

    if (this.entitySelection !== null) {
      this.commander.push("delete", this, [this.entitySelection]);
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

    let map = this.map;

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