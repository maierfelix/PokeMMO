import {
  TextureCache,
  createCanvasBuffer,
  imageToCanvas
} from "../utils";

import * as effect from "./effects";

/**
 * Texture
 * @class Texture
 * @export
 */
export default class Texture {

  /**
   * @param {String}   url
   * @param {Function} resolve
   * @constructor
   */
  constructor(url, resolve) {

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Shadow texture
     * @type {Object}
     */
    this.texture_shadow = null;

    /**
     * Effect texture
     * @type {Object}
     */
    this.texture_effect = null;

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
     * Loading state
     * @type {Boolean}
     */
    this.isLoaded = false;

    this.fromImage(this.imgUrl, resolve);

    return (this);

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
      this.isLoaded = true;
      return (TextureCache[url]);
    }

    img = new Image();

    img.addEventListener('load', function() {
      this.width  = img.width;
      this.height = img.height;
      this.isLoaded = true;
      TextureCache[url] = this;
      this.texture = imageToCanvas(img);
      this.buildShadow();
      resolve();
    }.bind(this));

    img.src = url;

  }

  /**
   * Build texture shadow
   */
  buildShadow() {

    var width  = this.texture.canvas.width;
    var height = this.texture.canvas.height;

    var shadow = createCanvasBuffer(width, height);

    shadow.translate(0, height);
    shadow.scale(1, -1);

    this.drawShadow(
      this.texture,
      shadow,
      0, -height,
      width, height
    );

    shadow.setTransform(1, 0, 0, 1, 0, 0);

    this.texture_shadow = shadow;

  }

}

Texture.prototype.drawTint = effect.drawTint;
Texture.prototype.drawShadow = effect.drawShadow;
Texture.prototype.colorizePixels = effect.colorizePixels;