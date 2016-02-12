import math from "../Math";

import {
  DIMENSION,
  MIN_SCALE, MAX_SCALE
} from "../cfg";
import * as map from "./Map/functions";
import * as layer from "./Layer/functions";
import * as entity from "./Entity/functions";

import Renderer from "./Renderer";
import DisplayObject from "./DisplayObject";
import Camera from "./Camera";

import { inherit } from "./utils";

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
     * Parsed maps
     * @type {Object}
     */
    this.maps = {};

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
    this.camera = new Camera(this.width, this.height);

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

    /**
     * Renderer instance
     * @type {Object}
     */
    this.renderer = new Renderer(this);

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
   * Zoom
   * @param {Object} e
   */
  zoom(e) {

    let camera = this.camera;
    let amount = (e.deltaY ? -e.deltaY : e.deltaY);

    amount = amount / 2 / (math.hypot(this.renderer.width, this.renderer.height) / Math.PI) * math.zoomScale(camera.scale);

    camera.scale += amount / 2;

    if (camera.scale < MIN_SCALE) camera.scale = MIN_SCALE;
    if (camera.scale > MAX_SCALE) camera.scale = MAX_SCALE;

    if (this.dragging) {
      this.move(e.clientX, e.clientY);
    }

    this.click(e.clientX, e.clientY);

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

}

inherit(Engine, map);
inherit(Engine, layer);
inherit(Engine, entity);