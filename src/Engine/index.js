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

import Environment from "./Environment";
import Renderer from "./Renderer";
import DisplayObject from "./DisplayObject";
import Camera from "./Camera";

import { Language } from "./Language";

import { inherit, getWGLContext, ajax as $GET } from "./utils";

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
     * Active scene state
     * @type {Boolean}
     */
    this.activeScene = false;

    /**
     * Scenes
     * @type {Object}
     */
    this.scenes = {};

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
     * Interface node
     * @type {Object}
     */
    this.uiNode = this.instance.uiNode;

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
     * Engine size
     * @type {Number}
     */
    this.width = width || 0;
    this.height = height || 0;

    /**
     * Camera object
     * @type {Object}
     */
    this.camera = new Camera(this);

    /**
     * Parsed maps
     * @type {Object}
     */
    this.maps = {};

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

    /**
     * Environment instance
     * @type {Object}
     */
    this.environment = new Environment(this);

    /**
     * Connection instance
     * @type {Object}
     */
    this.connection = null;

    this.initScenes();

  }

  /**
   * Initialise scenes
   */
  initScenes() {

    for (let scene in this.instance.scenes) {
      this.scenes[scene] = new this.instance.scenes[scene](this);
    };

  }

  /**
   * Resize scenes
   */
  resizeScenes() {

    for (let scene in this.scenes) {
      if (this.scenes[scene].active === true) {
        this.scenes[scene].updatePositions();
        this.scenes[scene].render();
        this.scenes[scene].draw();
      }
    };

  }

  /**
   * Add a world
   */
  addWorld(path, resolve) {

    $GET(path).then(this::function(data) {
      let world = new Function(data)();
      console.log(world);
      if (resolve instanceof Function) {
        return (resolve());
      }
    });

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
   * Sort layers and entities
   */
  sort() {

    this.depthSort(this.currentMap.entities);

    return void 0;

  }

  /**
   * @param {Array} array
   */
  depthSort(array) {

    let ii = 0;
    let jj = 0;

    let key = null;

    let length = array.length;

    for (; ii < length; ++ii) {
      jj = ii;
      key = array[jj];
      for (;
        jj > 0 &&
        (array[jj - 1].position.y + -(array[jj - 1].z * 2) + array[jj - 1].yMargin + (array[jj - 1].size.y * array[jj - 1].scale)) * array[jj - 1].zIndex >
        (key.position.y + -(key.z * 2) + key.yMargin + (key.size.y * key.scale)) * key.zIndex;
        --jj
      ) {
        array[jj] = array[jj - 1];
      };
      array[jj] = key;
    };

    return void 0;

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