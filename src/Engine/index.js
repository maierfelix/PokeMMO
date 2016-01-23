import math from "../Math";
import Camera from "./Camera";
import Path from "./Path";
import * as config from "../cfg";
import * as layer  from "./Layer/functions";
import * as entity from "./Entity/functions";

/**
 * Engine
 * @class Engine
 * @export
 */
export default class Engine {

  /**
   * @param {Object} node
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  constructor(node, width, height) {

    /**
     * Config ref
     * @type {Object}
     */
    this.config = config;

    /**
     * Node
     * @type {Object}
     */
    this.node = node;

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

    /** 
     * Engine size
     * @type {Object}
     * @default null
     */
    this.size = new math.Point(
      width  || window.innerWidth,
      height || window.innerHeight
    );

    /**
     * Camera object
     * @type {Object}
     */
    this.camera = new Camera();

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
   * Cubic in view
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @return {Boolean}
   */
  inView(x, y, width, height) {

    return (
      x + width >= 0 && x - width <= this.size.x &&
      y + height >= 0 && y - height <= this.size.y
    );

  }

  /**
   * @param {Object} obj
   */
  isInView(obj) {

    var scale = this.camera.getScale();

    return (
      this.inView(
        ((obj.x * scale) + this.camera.position.x) << 0,
        ((obj.y * scale) + this.camera.position.y) << 0,
        (obj.size.x * scale) << 0,
        /** Shadow */
        ((obj.size.y * 2) * scale) << 0
      )
    );

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
    this.size.x = width || 0;
  }

  /**
   * @param {Number} height
   * @setter
   */
  set height(height) {
    this.size.y = height || 0;
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