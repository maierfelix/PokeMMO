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
     * Unique id
     * @type {Number}
     */
    this.id = uHash();

    this.parent = parent;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    this.position.set(0, -1.75);

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

    let texture = this.parent.texture.texture;

    const width  = texture.canvas.width;
    const height = texture.canvas.height;

    let shadow = createCanvasBuffer(width, height);

    shadow.translate(0, height);
    shadow.scale(1, -1);

    this.drawShadow(
      texture,
      shadow,
      0, -height,
      width, height
    );

    shadow.setTransform(1, 0, 0, 1, 0, 0);

    TextureCache[`Shadow:${this.parent.sprite}`] = this;

    return (this.texture = shadow);

  }

  /**
   * Create shadow of a sprite
   * @param {Object} buffer
   * @param {Object} ctx
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  drawShadow(buffer, ctx, x, y, width, height) {

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