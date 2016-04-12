import "../../polyfill";
import math from "../../Math";

import * as cfg from "../../cfg";

import { inherit } from "../utils";

import * as entity from "../Entity/functions";
import * as render from "./render";
import * as debug from "./debug";

import Audio from "../Audio";

import WGL_Renderer from "./webgl";

/**
 * Renderer
 * @class Renderer
 * @export
 */
export default class Renderer {

  /**
   * @param {Object} instance
   * @constructor
   */
  constructor(instance) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * WebGL renderer
     * @type {Object}
     */
    this.glRenderer = null;

    /**
     * Size
     * @type {Object}
     */
    this.size = instance.size;

    /**
     * Layers ref
     * @type {Object}
     */
    this.layers = instance.layers;

    /**
     * Node ref
     * @type {Object}
     */
    this.node = instance.node;

    /**
     * WebGL node ref
     * @type {Object}
     */
    this.glNode = instance.glNode;

    /**
     * Interface node ref
     * @type {Object}
     */
    this.uiNode = instance.uiNode;

    /**
     * Context ref
     * @type {Object}
     */
    this.context = instance.context;

    /**
     * Gl context ref
     * @type {Object}
     */
    this.gl = instance.glContext;

    /**
     * Image smoothing
     * @type {Boolean}
     */
    this.imageSmoothing = false;

    /**
     * Dimension
     * @type {Number}
     */
    this.dimension = cfg.DIMENSION;

    /**
     * Delta timer
     * @type {Number}
     */
    this.delta = 0;

    /**
     * Now timestamp
     * @type {Number}
     */
    this.now = 0;

    /**
     * Then timestamp
     * @type {Number}
     */
    this.then = 0;

    /**
     * Width
     * @type {Number}
     */
    this.width = 0;

    /**
     * Height
     * @type {Number}
     */
    this.height = 0;

    /**
     * Camera ref
     * @type {Object}
     */
    this.camera = instance.camera;

    if (cfg.WGL_SUPPORT) {
      this.glRenderer = new WGL_Renderer(this);
      this.glRenderer.init();
    }

    /**
     * Auto switch to current game mode dependant rendering
     */
    this.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);

    this.resize(false);

  }

  /**
   * Switch rendering mode
   * @param {Number} mode
   */
  switchRenderingMode(mode) {

    if (mode === cfg.WGL) {
      if (cfg.WGL_SUPPORT) {
        this.node.style.display = "none";
        this.glNode.style.display = "block";
        cfg.RENDER_MODE = mode;
      } else {
        mode = cfg.CANVAS;
      }
    }

    if (mode === cfg.CANVAS) {
      this.node.style.display = "block";
      this.glNode.style.display = "none";
      cfg.RENDER_MODE = mode;
    }

  }

  /**
   * @param {Boolean} value
   * @setter
   */
  set imageSmoothingEnabled(value) {

    value = value ? true : false;

    this.imageSmoothing = value;

    this.context.setImageSmoothing(value);

  }

  /**
   * Update
   */
  update() {

    this.updateTimers();

    if (this.camera.objectFocus !== null) {
      this.camera.animate(this.camera.objectFocus);
    }

    this.updateSound();

    return void 0;

  }

  /**
   * Update noisy entities
   */
  updateSound() {

    let map = this.instance.currentMap;

    if (
      map === null ||
      map.entityNoises.length <= 0
    ) return void 0;

    let dist = 0;

    let vol = 75;

    let entity = null;

    let ii = 0;
    let length = map.entityNoises.length;

    for (; ii < length; ++ii) {
      entity = map.entityNoises[ii];
      dist = map.distance(entity, this.camera);
      if (entity.STATES.NOISE === false) {
        entity.noise = Audio.playNoise(entity.noise, vol, dist.x, dist.y);
        entity.STATES.NOISE = true;
      }
      entity.noise.pos3d(dist.x, dist.y, vol / 1e3);
    };

    return void 0;

  }

  /**
   * Update timers
   */
  updateTimers() {
    this.now = Date.now();
    this.delta = (this.now - this.then) / 1e3;
    this.then = this.now;
    return void 0;
  }

  /**
   * Resize
   * @param {Boolean} redraw
   */
  resize(redraw) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.width = this.width;
    this.camera.height = this.height;
    this.instance.width = this.width;
    this.instance.height = this.height;
    this.uiNode.width = this.width;
    this.uiNode.height = this.height;
    this.instance.resizeScenes();
    if (cfg.RENDER_MODE === cfg.WGL) {
      this.glNode.width = this.width;
      this.glNode.height = this.height;
      this.glRenderer.resize(this.width, this.height);
    } else {
      this.node.width = this.width;
      this.node.height = this.height;
    }
    this.clear();
    this.instance.mini.resize();
    this.draw();
  }

}

inherit(Renderer, debug);
inherit(Renderer, render);
inherit(Renderer, entity);
inherit(Renderer, webgl);