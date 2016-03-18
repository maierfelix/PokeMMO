import "../../polyfill";
import math from "../../Math";

import * as cfg from "../../cfg";

import { inherit } from "../utils";

import * as entity from "../Entity/functions";
import * as render from "./render";
import * as debug from "./debug";

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
      this.node.style.display = "none";
      this.glNode.style.display = "block";
      cfg.RENDER_MODE = mode;
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

    if (this.camera.entityFocus !== null) {
      this.camera.animate(this.camera.entityFocus);
    }

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
      this.gl.viewport(0, 0, this.width, this.height);
    } else {
      this.node.width = this.width;
      this.node.height = this.height;
    }
    this.clear();
    if (redraw === true) {
      this.draw();
    }
  }

}

inherit(Renderer, debug);
inherit(Renderer, render);
inherit(Renderer, entity);
inherit(Renderer, webgl);