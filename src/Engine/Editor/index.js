import {
  FREE_CAMERA,
  Y_DEPTH_HACK,
  DIMENSION,
  MIN_SCALE, MAX_SCALE,
  PIXEL_SCALE
} from "../../cfg";

import { inherit } from "../utils";

import * as render from "./render";

import math from "../../Math";

import Commander from "../Commander";

import { commands } from "./commands";

import { tileContainsImageData } from "../utils";

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
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Context ref
     * @type {Object}
     */
    this.context = instance.context;

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
     * Selection
     * @type {Object}
     */
    this.selection = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };

    this.selectedEntities = [];

    /**
     * Copied entity
     * @type {Object}
     */
    this.entityCopy = null;

    /**
     * Pasted entity
     * @type {Object}
     */
    this.pastedEntity = null;

    /**
     * Editing states
     * @type {Object}
     */
    this.STATES = {
      DRAGGING:  false,
      SELECTING: false
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

    /** Register all commands */
    for (let cmd of commands) {
      this.commander.newCommand(cmd);
    };

  }

  /**
   * Do a selection
   * @param {Number} x
   * @param {Number} y
   */
  selectFrom(x, y) {

    let offset = this.camera.getGameMouseOffset(x, y);

    this.selection.x1 = offset.x;
    this.selection.y1 = offset.y;

    this.selection.x2 = 0;
    this.selection.y2 = 0;

  }

  /**
   * Do a selection
   * @param {Number} x
   * @param {Number} y
   */
  selectTo(x, y) {

    let offset = this.camera.getGameMouseOffset(x, y);

    this.selection.x2 = offset.x;
    this.selection.y2 = offset.y;

    this.getSelectionRange(
      this.selection.x1, this.selection.y1,
      this.selection.x2, this.selection.y2
    );

  }

  /**
   * Get selection out of a range
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   */
  getSelectionRange(x1, y1, x2, y2) {

    let entity = null;

    let entities = [];

    let ii = 0;
    let length = 0;

    let xx1 = x1 > x2 ? x2 : x1 - DIMENSION;
    let yy1 = y1 > y2 ? y2 : y1;

    let width  = Math.abs(x2 - x1);
    let height = Math.abs(y2 - y1);

    let eWidth  = 0;
    let eHeight = 0;

    length = this.map.entities.length;

    for (; ii < length; ++ii) {
      entity = this.map.entities[ii];
      eWidth  = (entity.width * entity.scale) + ((x2 >= x1) ? -DIMENSION : 0);
      eHeight = (entity.height * entity.scale);
      if (
        math.cubicCollision(
          xx1, yy1,
          width + eWidth - DIMENSION, height + eHeight - DIMENSION,
          entity.x + entity.xMargin + eWidth - DIMENSION, (entity.y + entity.yMargin + entity.z + Y_DEPTH_HACK) + eHeight - DIMENSION,
          1
        )
      ) {
        entities.push(entity.id);
      }
    };

    this.selectedEntities = entities;

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
          math.roundTo(entity.position.x, DIMENSION), math.roundTo(entity.position.y, DIMENSION) << 0,
          ((entity.size.x * entity.scale) + entity.xMargin) - DIMENSION,
          ((entity.size.y * entity.scale) + entity.yMargin) - DIMENSION,
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

    /** Don't allow dragging of focused entity */
    if (
      FREE_CAMERA === false &&
      this.camera.entityFocus !== null &&
      entity.id === this.camera.entityFocus.id
    ) {
      return void 0;
    }

    offset = this.camera.getGameMouseOffset(x, y);

    /** Only fire drag if we got a new offset to drag to */
    if (
      offset.x === this.drag.x &&
      offset.y === this.drag.y
    ) return void 0;

    xx = offset.x - this.drag.x;
    yy = offset.y - this.drag.y;

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

    let entity = this.getEntityByMouse(x, y);

    let offset = this.camera.getGameMouseOffset(x, y);

    if (entity !== null) {
      if (tileContainsImageData(
        entity.texture.sprites[entity.sFrame],
        ((offset.x - entity.x) / entity.scale) << 0,
        ((offset.y - entity.y) / entity.scale) << 0,
        DIMENSION, DIMENSION
      ) === false) {
        entity = null;
      }
    }

    this.commander.push("select", this, [entity, this.entitySelection]);

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
    }

  }

  /**
   * Cut out selected entity
   */
  cutEntity() {

    if (this.entitySelection !== null) {
      this.commander.push("cut", this, [this.entitySelection]);
    }

  }

  /**
   * Copy selected entity
   */
  copyEntity() {

    if (this.entitySelection !== null) {
      this.commander.push("copy", this, [this.entitySelection, this.entityCopy]);
    }

  }

  /**
   * Paste selected entity
   */
  pasteEntity() {

    this.entityPaste = this.entityCopy;

    this.commander.push("paste", this, [this.entityCopy, this.entityPaste]);

  }

}

inherit(Editor, render);