import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";

import math from "../../Math";

import DisplayObject from "../DisplayObject";

import { TextureCache, uHash, createCanvasBuffer } from "../utils";
import { colorizePixels } from "../Texture/effects";

/**
 * Shadow
 * @class Shadow
 * @export
 */
export default class Shadow extends DisplayObject {

  /**
   * @param {Object} parent
   * @constructor
   */
  constructor(parent) {

    super(null);

    /**
     * Parent ref
     * @type {Object}
     */
    this.parent = parent;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Splitted sprites
     * @type {Object}
     */
    this.sprites = {};

    this.position.set(parent.shadowX, parent.shadowY);

    this.scale.set(0, 0);

    this.init();

  }

  /**
   * Initialise
   * Build shadow
   */
  init() {

    let texture = TextureCache[`Shadow:${this.parent.sprite}`];

    this.texture = texture === void 0 ? this.buildShadow() : texture;

  }

  /**
   * Build shadow
   * @return {Object}
   */
  buildShadow() {

    let ii = 0;
    let length = 0;

    let buffer = null;

    let parent = this.parent.texture;

    let width  = 0;
    let height = 0;

    length = parent.sprites.length;

    for (; ii < length; ++ii) {
      width  = parent.sprites[ii].canvas.width;
      height = parent.sprites[ii].canvas.height;
      buffer = createCanvasBuffer(width, height);
      buffer.translate(0, height);
      buffer.scale(1, -1);
      this.drawShadow(
        parent.sprites[ii],
        buffer,
        width, height
      );
      buffer.setTransform(1, 0, 0, 1, 0, 0);
      this.sprites[ii] = buffer;
      buffer = null;
    };

    TextureCache[`Shadow:${this.parent.sprite}`] = this;

    return (this.texture = this);

  }

  /**
   * Create shadow of a sprite
   * @param {Object} buffer
   * @param {Object} ctx
   * @param {Number} width
   * @param {Number} height
   */
  drawShadow(buffer, ctx, width, height) {

    ctx.clear();

    ctx.drawImage(
      buffer.canvas,
      0, 0,
      width, height
    );

    this.drawTint(
      ctx,
      0, 0,
      width, height,
      85
    );

  }

  /**
   * Tint a canvas
   * @param {Object} ctx
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} value
   */
  drawTint(ctx, x, y, width, height, value) {

    let imgData = ctx.getImageData(
      x, y,
      width, height
    );

    colorizePixels(
      imgData,
      0,
      0,
      value,
      true
    );

    ctx.putImageData(
      imgData,
      x, y
    );

  }

}