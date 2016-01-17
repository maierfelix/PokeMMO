import {
  TextureCache,
  createCanvasBuffer,
  imageToCanvas
} from "../utils";

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
      resolve();
    }.bind(this));

    img.src = url;

  }

}