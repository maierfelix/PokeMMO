import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN,
  SHADOW_X, SHADOW_Y
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
     * @type {Array}
     */
    this.sprites = [];

    /**
     * Splitted sprites
     * @type {Array}
     */
    this.static_sprites = [];

    this.position.set(parent.shadowX, parent.shadowY);

    this.scale.set(0, 0);

    this.init();

  }

  /**
   * Initialise
   * Build shadow
   */
  init() {

    this.texture = this.buildShadow();

  }

  /**
   * Generates a static
   * sprite&shadow texture
   */
  buildStaticShadow() {

    let yPadding = this.parent.height + this.parent.shadowY;

    let ii = 0;
    let length = 0;

    let buffer = null;

    let entity = this.parent;

    let parent = entity.shadow;

    let width  = 0;
    let height = 0;

    length = parent.sprites.length;

    for (; ii < length; ++ii) {
      width  = parent.sprites[ii].canvas.width;
      height = parent.sprites[ii].canvas.height;
      buffer = createCanvasBuffer(width, height + -entity.shadowY);
      /** Shadow */
      buffer.drawImage(
        this.sprites[ii].canvas,
        0, 0,
        width, height
      );
      /** Sprite */
      buffer.drawImage(
        parent.parent.texture.effect_sprites[ii].canvas,
        0, 0,
        width, height
      );
      this.static_sprites[ii] = buffer;
      buffer = null;
    };

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

    return (this);

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