import math from "../Math";

import * as config from "../cfg";
import * as layer  from "./Layer/functions";
import * as entity from "./Entity/functions";

import DisplayObject from "./DisplayObject";
import Camera from "./Camera";
import Path from "./Path";

/**
 * Engine
 * @class Engine
 * @export
 */
export default class Engine extends DisplayObject {

  /**
   * @param {Object} instance
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  constructor(instance, width, height) {

    super(null);

    /**
     * Config ref
     * @type {Object}
     */
    this.config = config;

    /**
     * Instance
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Node
     * @type {Object}
     */
    this.node = this.instance.node;

    /**
     * Context
     * @type {Object}
     */
    this.context = this.node.getContext("2d");

    /**
     * Active entities
     * @type {Array}
     */
    this.entities = [];

    /**
     * Active layers
     * @type {Array}
     */
    this.layers = [];

    this.width = width || 0;
    this.height = height || 0;

    /**
     * Camera object
     * @type {Object}
     */
    this.camera = new Camera(this.size.x, this.size.y);

    /**
     * Path object
     * @type {Object}
     */
    this.path = new Path();

    /**
     * Drag offset
     * @type {Object}
     */
    this.drag = new math.Point();

    /**
     * Dragging state
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Local entity ref
     * @type {Object}
     */
    this.localEntity = null;

  }

  /**
   * Move
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {

    this.drag.x = x;
    this.drag.y = y;

  }

  /**
   * Click
   * @param {Number} x
   * @param {Number} y
   */
  click(x, y) {

    this.drag.x = x;
    this.drag.y = y;

  }

  /**
   * @param {Number} width
   * @setter
   */
  set width(width) {
    this.width = width || 0;
    this.camera.width = this.width;
  }

  /**
   * @param {Number} height
   * @setter
   */
  set height(height) {
    this.height = height || 0;
    this.camera.height = this.height;
  }

  /**
   * Set scene width
   * @param {Number} width
   * @setter
   */
  set sceneWidth(width) {
    this.camera.viewport.x = width;
  }

  /**
   * Set scene height
   * @param {Number} width
   * @setter
   */
  set sceneHeight(height) {
    this.camera.viewport.y = height;
  }

}

Engine.prototype.addLayer = layer.addLayer;
Engine.prototype.getLayerByName = layer.getLayerByName;
Engine.prototype.removeLayerByName = layer.removeLayerByName;
Engine.prototype.removeLayerByIndex = layer.removeLayerByIndex;
Engine.prototype.getLayerByProperty = layer.getLayerByProperty;

Engine.prototype.addEntity = entity.addEntity;
Engine.prototype.getEntityById = entity.getEntityById;
Engine.prototype.removeEntityById = entity.removeEntityById;
Engine.prototype.removeEntityByIndex = entity.removeEntityByIndex;
Engine.prototype.getEntityByProperty = entity.getEntityByProperty;