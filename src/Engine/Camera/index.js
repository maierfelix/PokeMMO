import {
  PIXEL_SCALE
} from "../../cfg";
import math from "../../Math";

/**
 * Camera
 * @class Camera
 * @export
 */
export default class Camera {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Position
     * @type {Object}
     */
    this.position = new math.Point();

    /**
     * Viewport
     * @type {Object}
     */
    this.viewport = new math.Point();

    /**
     * Scaling
     * @type {Number}
     */
    this.scale = .0;

    /**
     * Animation queue
     * @type {Array}
     */
    this.queue = [];

  }

  /**
   * Camera scale
   * @param  {Number} scale
   * @return {Number}
   */
  getScale(scale) {
    return (
      math.roundTo(
        parseFloat(math.zoomScale(this.scale))
      , PIXEL_SCALE)
    );
  }

}