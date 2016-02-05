import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";

import math from "../../Math";
import { uHash, TextureCache, getSprite } from "../utils";

import DisplayObject from "../DisplayObject";
import Texture from "../Texture";

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

    /** Map size */
    if (obj.width) this.width = obj.width;
    if (obj.height) this.height = obj.height;

    /** Load texture */
    getSprite(this.tileset, this::function(texture) {
      this.texture = TextureCache[this.tileset];
      this.render();
      if (
        resolve !== void 0 &&
        resolve instanceof Function
      ) resolve();
    });

  }

  /**
   * Render a map
   */
  render() {

    let width  = this.width * DIMENSION << 0;
    let height = this.height * DIMENSION << 0;

    let buffer = this.createCanvasBuffer(
      width, height
    );

    let mapBuffer = null;

    /** Create a new buffer map object */
    if (this.buffers[this.name] === void 0) {
      this.buffers[this.name] = {};
    }

    mapBuffer = this.buffers[this.name];

    for (let layer of this.layers) {
      this.renderLayer(buffer, this, layer.data);
      if (
        layer.collision !== void 0 &&
        !this.config.devMode
      ) { continue; }
      mapBuffer["layer:" + layer.index] = buffer;
      buffer = null;
      buffer = this.createCanvasBuffer(
        width, height
      );
    };

    //this.joinLayers(map.name, width, height, this.layers);

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

    let tileset = this.tilesets[this.tileset];

    buffer.clear();

    for (yy = 0; yy < layer.length; ++yy) {
      x = 0;
      for (xx = 0; xx < layer[yy].length; ++xx) {
        tile = Math.abs(layer[yy][xx] - 1);
        buffer.drawImage(
          tileset,
          ((tile) % DIMENSION) * DIMENSION,
          ((tile / DIMENSION) << 0) * DIMENSION,
          DIMENSION,
          DIMENSION,
          x,
          y,
          DIMENSION,
          DIMENSION
        );
        x += DIMENSION;
      };
      y += DIMENSION;
    };

    return void 0;

  }

}