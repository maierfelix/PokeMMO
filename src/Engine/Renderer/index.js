import "../../polyfill";
import math from "../../Math";
import { DIMENSION } from "../../cfg";

import { inherit } from "../utils";

import * as entity from "../Entity/functions";
import * as render from "./render";
import * as debug from "./debug";
import * as edit from "./edit";

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
     * Context ref
     * @type {Object}
     */
    this.context = instance.context;

    /**
     * Image smoothing
     * @type {Boolean}
     */
    this.imageSmoothing = false;

    /**
     * Dimension
     * @type {Number}
     */
    this.dimension = DIMENSION;

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

    /**
     * Sprite cache queue
     * @type {Array}
     */
    this.spriteQueue = [];

    this.resize(false);

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

    if (this.camera.entityfocus !== null) {
      this.camera.animate();
    }

    if (this.camera.queue.length <= 0) {
      this.camera.focusEntity();
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
    this.node.width = this.width;
    this.node.height = this.height;
    this.camera.width = this.width;
    this.camera.height = this.height;
    this.instance.width = this.width;
    this.instance.height = this.height;
    this.clear();
    if (redraw === true) {
      this.draw();
    }
  }

  /**
   * Sort layers and entities
   */
  sort() {

    this.depthSort(this.instance.currentMap.entities);

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
      for (; jj > 0 && array[jj - 1].position.y + array[jj - 1].yMargin + array[jj - 1].size.y > key.position.y + key.yMargin + key.size.y; --jj) {
        array[jj] = array[jj - 1];
      };
      array[jj] = key;
    };

    return void 0;

  }

}

inherit(Renderer, debug);
inherit(Renderer, render);
inherit(Renderer, entity);
inherit(Renderer, edit);