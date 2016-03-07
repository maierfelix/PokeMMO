import math from "../Math";

import {
  DEV_VERSION,
  RECORD_MODE,
  DIMENSION,
  LEFT, RIGHT, UP, DOWN,
  WGL_SUPPORT
} from "../cfg";

import * as map from "./Map/functions";
import * as entity from "./Entity/functions";

import Renderer from "./Renderer";
import DisplayObject from "./DisplayObject";
import Camera from "./Camera";

import { inherit, getWGLContext } from "./utils";

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
    this.node = this.instance.canvasNode;

    /**
     * WebGL Node
     * @type {Object}
     */
    this.glNode = this.instance.glNode;

    /**
     * Context
     * @type {Object}
     */
    this.context = this.node.getContext("2d");

    /**
     * WebGL context
     * @type {Object}
     */
    this.glContext = null;

    /** Attach webgl context */
    if (WGL_SUPPORT && this.glNode) {
      this.glContext = getWGLContext(this.glNode);
    }

    /**
     * Parsed maps
     * @type {Object}
     */
    this.maps = {};

    /**
     * Engine size
     * @type {Number}
     */
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

    /**
     * Editor instance
     * @type {Object}
     */
    this.editor = null;

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
   * Trigger a ping
   * @param {Number} x
   * @param {Number} y
   */
  ping(x, y) {

    let offset = this.camera.getGameMouseOffset(x, y);

    let map = this.currentMap;

    let tpl = map.objectTemplates["ping"];

    tpl.x = offset.x;
    tpl.y = offset.y;
    tpl.z = 0;

    let pushEntity = map.addEntity(tpl);

    pushEntity.opacity = .0;

    pushEntity.fadeIn(2);

    pushEntity.lifeTime = this.renderer.now + 60;

    map.entities.push(pushEntity);

  }

  /**
   * Local entity walk to
   * @param {Number} x
   * @param {Number} y
   */
  walkTo(x, y) {

    let ii = 0;
    let length = 0;

    let lastX = this.instance.localEntity.x;
    let lastY = this.instance.localEntity.y;

    let xx = 0;
    let yy = 0;

    let offset = this.camera.getGameMouseOffset(x, y);

    let dir = 0;

    let path = this.instance.currentMap.path.getShortestPath(
      this.instance.localEntity.x, this.instance.localEntity.y,
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
      this.instance.localEntity.animations.push({
        type: "walk",
        facing: dir,
        obstacle: false,
        x: xx,
        y: yy,
        oX: this.instance.localEntity.x,
        oY: this.instance.localEntity.y
      });
      lastX = xx;
      lastY = yy;
    };

  }

}

inherit(Engine, map);
inherit(Engine, entity);