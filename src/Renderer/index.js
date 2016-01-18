import "../polyfill";
import math from "../Math";
import Texture from "../Engine/Texture";
import * as layer from "../Engine/layers";
import { drawGrid } from "./grid";
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
    this.dimension = 16;

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
     * Scene ref
     * @type {Object}
     */
    this.scene = instance.scene;

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
   * Rendering
   */
  render() {

    if (this.spriteQueue.length >= 1) {
      this.loadSprites(this.spriteQueue, function() {
        console.log(this.spriteQueue);
        window.rAF(() => this.render());
      }.bind(this));
      return void 0;
    }

    /** Pixel friendly scaling */
    this.instance.scale = Math.roundTo(parseFloat(math.zoomScale(this.instance.z)), 0.125);

    this.clear();

    this.sort();

    drawGrid(
      this.context,
      this.instance.position.x, this.instance.position.y,
      this.width, this.height,
      this.dimension,
      this.instance.scale,
      .05,
      "#FFF"
    );

    this.context.beginPath();

    /** Draw scene */
    this.context.strokeStyle = "red";
    this.context.lineWidth = 1 * this.instance.scale;
    this.context.strokeRect(
      this.scene.position.x << 4, this.scene.position.y << 4,
      this.scene.size.x * this.instance.scale << 0, this.scene.size.y * this.instance.scale << 0
    );
    this.context.stroke();

    this.context.closePath();

    this.renderLayers();

    window.rAF(() => this.render());

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

  /**
   * Render layers
   */
  renderLayers() {

    var ii = 0;
    var length = 0;

    length = this.layers.length;

    for (; ii < length; ++ii) {
      this.renderEntities(this.layers[ii].entities);
    };

  }

  /**
   * Load sprites
   * @param {Array}    sprites
   * @param {Function} resolve
   */
  loadSprites(sprites, resolve) {

    var self = this;

    var item = null;

    var ii = 0;
    var length = 0;

    length = sprites.length;

    for (; ii < length; ++ii) {
      (function(ii) {
        item = String(sprites[ii]);
        TextureCache[item] = new Texture(item, function() {
          sprites.shift();
          if (sprites.length <= 0) {
            resolve();
            return void 0;
          }
        });
      })(ii);
    };

    return void 0;

  }

  /**
   * Render entities
   * @param {Array} entities
   */
  renderEntities(entities) {

    var entity = null;

    var ii = 0;
    var length = 0;

    length = entities.length;

    for (; ii < length; ++ii) {
      entity = entities[ii];
      /** We need to load a texture */
      if (entity.texture === void 0) {
        /** Loaded entity texture */
        if (TextureCache[entity.texture] !== void 0) {
          entity.texture = TextureCache[entity.texture];
        }
        else {
          /** Sprite already queued */
          if (this.spriteQueue.find(key => key === entity.sprite) === void 0) {
            this.spriteQueue.push(entity.sprite);
          }
        }
      }

      this.context.fillStyle = "red";
      this.context.fillRect(
        entities[ii].x << 4, entities[ii].y << 4,
        entities[ii].size.x * this.instance.scale << 0, entities[ii].size.y * this.instance.scale << 0
      );
      this.context.fill();
    };

  }

}

Renderer.prototype.addLayer = layer.addLayer;
Renderer.prototype.removeLayerByName = layer.removeLayerByName;
Renderer.prototype.removeLayerByIndex = layer.removeLayerByIndex;
Renderer.prototype.getLayerByName = layer.getLayerByName;
Renderer.prototype.getLayerByProperty = layer.getLayerByProperty;