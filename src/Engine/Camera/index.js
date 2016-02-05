import {
  PIXEL_SCALE
} from "../../cfg";
import math from "../../Math";

import DisplayObject from "../DisplayObject";

/**
 * Camera
 * @class Camera
 * @export
 */
export default class Camera extends DisplayObject {

  /**
   * @constructor
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {

    super(null);

    /**
     * Viewport
     * @type {Object}
     */
    this.viewport = new math.Point();

    /**
     * Animation queue
     * @type {Array}
     */
    this.queue = [];

    /** Camera size */
    this.size.set(
      width  || 0,
      height || 0
    );

    /**
     * Camera scaling
     * @type {Number}
     */
    this.scale = .0;

    /** Camera resolution */
    Object.defineProperty(this, "resolution", {
      get: function() {
        return (
          math.roundTo(
            parseFloat(math.zoomScale(this.scale))
          , PIXEL_SCALE)
        );
      },
      set: function(value) {
        this.scale = value;
      }
    });

  }

  /**
   * Cubic in view
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @return {Boolean}
   */
  inView(x, y, width, height) {

    return (
      x + width >= 0 && x - width <= this.width &&
      y + height >= 0 && y - height <= this.height
    );

  }

  /**
   * Is in view
   * @param {Object} obj
   */
  isInView(obj) {

    return (
      this.inView(
        ((obj.x * this.scale) + this.x) << 0,
        ((obj.y * this.scale) + this.y) << 0,
        (obj.width * this.scale) << 0,
        (obj.height * this.scale) << 0
      )
    );

  }

}