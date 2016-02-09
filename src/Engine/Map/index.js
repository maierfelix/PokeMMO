import { DIMENSION } from "../../cfg";
import math from "../../Math";
import {
  inherit,
  Maps,
  uHash,
  TextureCache, getSprite,
  createCanvasBuffer
} from "../utils";

import DisplayObject from "../DisplayObject";
import Texture from "../Texture";
import Path from "../Path";

import * as events from "./events";

/**
 * Map
 * @class Map
 * @export
 */
export default class Map extends DisplayObject {

  /**
   * @param {Object}   obj
   * @param {Function} resolve
   * @constructor
   */
  constructor(obj, resolve) {

    super(null);

    /**
     * Tileset
     * @type {String}
     */
    this.tileset = obj.tileset;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Map buffers
     * @type {Object}
     */
    this.buffers = {};

    /** Map size */
    this.width = obj.width;
    this.height = obj.height;

    /**
     * Map name
     * @type {String}
     */
    this.name = obj.name;

    /**
     * Layers
     * @type {Array}
     */
    this.layers = obj.layers;

    /**
     * EventManager ref
     * @type {Object}
     */
    this.event = null;

    /**
     * Path ref
     * @type {Object}
     */
    this.path = null;

    /**
     * Collision layer ref
     * @type {Object}
     */
    this.collisionLayer = null;

    /** Load texture */
    getSprite(this.tileset, this::function(texture) {
      this.texture = TextureCache[this.tileset];
      this.parse();
      /** Attach path finder */
      this.path = new Path(this);
      Maps[this.name] = this;
      if (
        resolve !== void 0 &&
        resolve instanceof Function
      ) resolve();
    });

  }

  /**
   * Parse a map
   */
  parse() {

    let width  = this.width * (DIMENSION * 2) << 0;
    let height = this.height * (DIMENSION * 2) << 0;

    let buffer = null;

    for (let layer of this.layers) {
      if (layer.collision === true) {
        this.collisionLayer = layer;
        continue;
      }
      buffer = createCanvasBuffer(
        width, height
      );
      this.renderLayer(buffer, layer.data);
      this.buffers[layer.index] = buffer;
      buffer = null;
    };

    return void 0;

  }

  /**
   * Render a layer
   * @param {Object} buffer
   * @param {Array}  layer
   */
  renderLayer(buffer, layer) {

    let tile = 0;

    let x  = 0;
    let y  = 0;
    let xx = 0;
    let yy = 0;

    let tileset = this.texture.texture_effect.canvas;

    buffer.clear();

    let dim = DIMENSION * 2;

    for (yy = 0; yy < layer.length; ++yy) {
      x = 0;
      for (xx = 0; xx < layer[yy].length; ++xx) {
        tile = Math.abs(layer[yy][xx] - 1);
        buffer.drawImage(
          tileset,
          ((tile) % dim) * dim,
          ((tile / dim) << 0) * dim,
          dim,
          dim,
          x,
          y,
          dim,
          dim
        );
        x += dim;
      };
      y += dim;
    };

    return void 0;

  }

}

inherit(Map, events);