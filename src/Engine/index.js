import math from "../Math";
import * as config from "../cfg";
import * as layer  from "./layers";
import * as entity from "./entities";

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
     * Engine scale
     * @type {Number}
     */
    this.scale = 1;

    /**
     * Z scale
     * @type {Number}
     */
    this.z = 1;

    /**
     * Delta timer
     * @type {Number}
     */
    this.delta = 0;

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
    this.camera = new math.Point();

    /**
     * Engine rendering position
     * @type {Object}
     */
    this.position = new math.Point();

    /**
     * Scene object
     * @type {Object}
     */
    this.scene = {
      position: new math.Point(),
      size: new math.Point()
    };

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

    this.scene.size.x = 256;
    this.scene.size.y = 128;

  }

  /**
   * Move
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {

    this.position.x += x - this.drag.x;
    this.position.y += y - this.drag.y;

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

}

Engine.prototype.addLayer = layer.addLayer;
Engine.prototype.removeLayerByName = layer.removeLayerByName;
Engine.prototype.removeLayerByIndex = layer.removeLayerByIndex;
Engine.prototype.getLayerByName = layer.getLayerByName;
Engine.prototype.getLayerByProperty = layer.getLayerByProperty;

Engine.prototype.addEntity = entity.addEntity;
Engine.prototype.removeEntityById = entity.removeEntityById;
Engine.prototype.removeEntityByIndex = entity.removeEntityByIndex;
Engine.prototype.getEntityById = entity.getEntityById;
Engine.prototype.getEntityByProperty = entity.getEntityByProperty;