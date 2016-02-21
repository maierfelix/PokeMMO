import math from "../Math";

import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
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
   * Get game relative mouse offset
   * @param  {Number} x clientX
   * @param  {Number} y clientY
   * @return {Object}
   */
  getGameMouseOffset(x, y) {

    let xx = ((x - this.camera.x) / this.camera.resolution);
    let yy = ((y - this.camera.y) / this.camera.resolution);

    return ({
      x: (Math.ceil(xx / DIMENSION) * DIMENSION) - DIMENSION,
      y: (Math.ceil(yy / DIMENSION) * DIMENSION) - DIMENSION
    });

  }

  /**
   * Get a entity by mouse offset
   * @param {Number} x
   * @param {Number} y
   */
  getEntityByMouse(x, y) {

    let object = null;

    let offset = this.getGameMouseOffset(x, y);

    let xx = offset.x << 0;
    let yy = offset.y << 0;

    let ii = 0;
    let length = this.currentMap.entities.length;;

    for (; ii < length; ++ii) {
      if (
        this.currentMap.entities[ii].x << 0 === xx &&
        this.currentMap.entities[ii].y << 0 === yy
      ) {
        object = this.currentMap.entities[ii];
      }
    };

    console.log(object);

  }

  /**
   * Local entity walk to
   * @param {Number} x
   * @param {Number} y
   */
  walkTo(x, y) {

    let ii = 0;
    let length = 0;

    let lastX = this.localEntity.x;
    let lastY = this.localEntity.y;

    let xx = 0;
    let yy = 0;

    let offset = this.getGameMouseOffset(x, y);

    let dir = 0;

    let path = this.currentMap.path.getShortestPath(
      this.localEntity.x, this.localEntity.y,
      offset.x, offset.y
    );

    if (
      path === void 0 ||
      path === null   ||
      path.length <= 0
    ) return void 0;

    length = path.length;

    for (; ii < length; ++ii) {
      xx = path[ii].x * DIMENSION;
      yy = path[ii].y * DIMENSION;
      if (xx !== lastX) {
        dir = xx < lastX ? LEFT : RIGHT;
      } else {
        if (yy !== lastY) {
          dir = yy < lastY ? UP : DOWN;
        }
      }
      this.localEntity.animations.push({
        type: "walk",
        facing: dir,
        obstacle: false,
        x: xx,
        y: yy,
        oX: this.localEntity.x,
        oY: this.localEntity.y
      });
      lastX = xx;
      lastY = yy;
    };

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