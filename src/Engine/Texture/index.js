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
    this.hasLoaded = false;

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
      TextureCache[url] = this;
      this.texture = imageToCanvas(img);
      this.renderEffects();
      resolve();
    });

    img.src = url;

    return void 0;

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

    var width  = this.texture.canvas.width;
    var height = this.texture.canvas.height;

    var texture = createCanvasBuffer(width, height);

    this.drawTimeLightning(
      this.texture,
      texture,
      0, 0,
      width, height,
      ColorPalette
    );

    this.texture_effect = texture;

  }

}

inherit(Texture, effect);