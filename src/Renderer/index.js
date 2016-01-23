import "../polyfill";
import math from "../Math";
import { DIMENSION } from "../cfg";
import * as layer  from "../Engine/Layer/functions";
import * as entity from "../Engine/Entity/functions";
import * as render from "./render";
import * as debug from "./debug";
import { loadSprites }  from "./sprite";
import { TextureCache } from "../Engine/utils";

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
     * Entities ref
     * @type {Object}
     */
    this.entities = instance.entities;

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
     * Scale
     * @type {Number}
     */
    this.scale = .0;

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
     * Shadow casting
     * @type {Boolean}
     */
    this.shadowCasting = false;

    /**
     * Lightning
     * @type {Boolean}
     */
    this.lightning = false;

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

    this.resize();

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
   * Clear
   */
  clear() {
    this.node.width = this.node.width;
    this.context.setImageSmoothing(this.imageSmoothing);
  }

  /**
   * Update
   */
  update() {

    var entity = this.instance.localEntity;

    this.updateTimers();

    /** Pixel friendly scaling */
    this.scale = this.camera.getScale();

    if (entity === null) return void 0;

    this.camera.position.x = (this.width / 2 - (entity.size.x / 2 * this.scale)) - (entity.x * this.scale);
    this.camera.position.y = (this.height / 2 - (entity.size.y / 2 * this.scale)) - (entity.y * this.scale);

  }

  /**
   * Update timers
   */
  updateTimers() {
    this.now = Date.now();
    this.delta = (this.now - this.then) / 1E3;
    this.then = this.now;
  }

  /**
   * Resize
   */
  resize() {
    this.instance.width  = window.innerWidth;
    this.instance.height = window.innerHeight;
    this.node.width  = window.innerWidth;
    this.node.height = window.innerHeight;
    this.width  = window.innerWidth;
    this.height = window.innerHeight;
  }

  /**
   * Sort layers and entities
   */
  sort() {

    this.depthSort(this.layers, "zIndex");

    this.depthSort(this.entities, "y");

    this.connectLayersWithEntities();

  }

  /**
   * Connect layers with entities
   */
  connectLayersWithEntities() {

    var ii = 0;
    var length = 0;

    var entity = null;
    var layer = null;

    length = this.entities.length;

    for (; ii < length; ++ii) {
      entity = this.entities[ii];
      layer  = this.layers[this.getLayerByProperty(entity.zIndex, "zIndex")];
      if (layer === void 0) continue;
      if (layer.hasEntity(entity.id) === -1) {
        layer.entities.push(entity);
      }
    };

  }

  /**
   * @param {Array}  array
   * @param {String} prop
   */
  depthSort(array, prop) {
      
    var ii = 0;
    var jj = 0;

    var key = null;

    var length = array.length;

    for (; ii < length; ++ii) {
      jj = ii;
      key = array[jj];
      for (; jj > 0 && array[jj - 1][prop] > key[prop]; --jj) {
        array[jj] = array[jj - 1];
      };
      array[jj] = key;
    };

  }

}

Renderer.prototype.loadSprites = loadSprites;

Renderer.prototype.addLayer = layer.addLayer;
Renderer.prototype.removeLayerByName = layer.removeLayerByName;
Renderer.prototype.removeLayerByIndex = layer.removeLayerByIndex;
Renderer.prototype.getLayerByName = layer.getLayerByName;
Renderer.prototype.getLayerByProperty = layer.getLayerByProperty;

Renderer.prototype.render = render.render;
Renderer.prototype.renderScene = render.renderScene;
Renderer.prototype.renderEntity = render.renderEntity;
Renderer.prototype.renderLayers = render.renderLayers;
Renderer.prototype.drawPixelText = render.drawPixelText;
Renderer.prototype.renderEntities = render.renderEntities;

Renderer.prototype.renderDebugScene = debug.renderDebugScene;

Renderer.prototype.addEntity = entity.addEntity;
Renderer.prototype.getEntityById = entity.getEntityById;
Renderer.prototype.removeEntityById = entity.removeEntityById;
Renderer.prototype.removeEntityByIndex = entity.removeEntityByIndex;
Renderer.prototype.getEntityByProperty = entity.getEntityByProperty;