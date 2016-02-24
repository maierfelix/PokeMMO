import {
  inherit,
  TextureCache,
  createCanvasBuffer,
  imageToCanvas
} from "../utils";

import { ColorPalette } from "../../cfg";

import * as effect from "./effects";

/**
 * Texture
 * @class Texture
 * @export
 */
export default class Texture {

  /**
   * @param {String}   url
   * @param {Number}   width
   * @param {Number}   height
   * @param {Function} resolve
   * @constructor
   */
  constructor(url, width, height, resolve) {

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Texture effect
     * @type {Object}
     */
    this.texture_effect = null;

    /**
     * Effect texture
     * @type {Object}
     */
    this.effect_sprites = [];

    /**
     * Image url
     * @type {String}
     */
    this.imgUrl = url;

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
     * Sprite width
     * @type {Number}
     */
    this.sWidth = width;

    /**
     * Sprite height
     * @type {Number}
     */
    this.sHeight = height;

    /**
     * X multiplicator
     * @type {Number}
     */
    this.xMul = 0;

    /**
     * Y multiplicator
     * @type {Number}
     */
    this.yMul = 0;

    /**
     * Loading state
     * @type {Boolean}
     */
    this.hasLoaded = false;

    /**
     * Splitted sprites
     * @type {Array}
     */
    this.sprites = [];

    this.fromImage(this.imgUrl, this::function() {
      resolve(this);
    });

  }

  /**
   * @param {String}   url
   * @param {Function} resolve
   */
  fromImage(url, resolve) {

    var img = null;

    var texture = TextureCache[url];

    if (
      texture !== void 0 &&
      texture instanceof Texture
    ) {
      this.hasLoaded = true;
      return (TextureCache[url]);
    }

    img = new Image();

    img.addEventListener('load', this::function() {
      this.width  = img.width;
      this.height = img.height;
      this.hasLoaded = true;
      this.texture = imageToCanvas(img);
      this.splitTexture();
      TextureCache[url] = this;
      this.renderEffects();
      resolve();
    });

    img.src = url;

    return void 0;

  }

  /**
   * Split texture into seperate sprites
   */
  splitTexture() {

    if (this.sWidth === -1 && this.sHeight === -1) {
      this.sWidth = this.width / 2;
      this.sHeight = this.height / 2;
    }

    this.xMul = this.height / (this.sWidth * 2);
    this.yMul = this.width / (this.sHeight * 2);

    let buffer = null;

    let ii = 0;

    let xx = 0;
    let yy = 0;

    let width  = this.width / (this.sWidth * 2);
    let height = this.height / (this.sHeight * 2);

    for (; yy < height;) {
      for (xx = 0; xx < width; ++xx) {
        if (xx === 0) ++yy;
        buffer = createCanvasBuffer(this.sWidth * 2, this.sHeight * 2);
        buffer.drawImage(
          this.texture.canvas,
          (this.sWidth * 2) * xx, (this.sHeight * 2) * (yy - 1),
          this.width, this.height,
          0, 0,
          this.width, this.height
        );
        this.sprites.push(buffer);
        buffer = null;
      };
    };

  }

  /**
   * Render texture effects
   */
  renderEffects() {
    this.buildTimeLightning();
  }

  /**
   * Build texture time lightning
   */
  buildTimeLightning() {

    let ii = 0;
    let length = 0;

    let buffer = null;

    let width  = 0;
    let height = 0;

    length = this.sprites.length;

    for (; ii < length; ++ii) {
      width  = this.sprites[ii].canvas.width;
      height = this.sprites[ii].canvas.height;
      buffer = createCanvasBuffer(width, height);
      buffer.translate(0, height);
      buffer.scale(1, -1);
      this.drawTimeLightning(
        this.sprites[ii],
        buffer,
        0, 0,
        width, height,
        ColorPalette
      );
      buffer.setTransform(1, 0, 0, 1, 0, 0);
      this.effect_sprites[ii] = buffer;
      buffer = null;
    };

  }

}

inherit(Texture, effect);