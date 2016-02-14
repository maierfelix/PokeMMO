import { DIMENSION } from "./cfg";

/**
 * Math
 * @class Math
 * @export
 */
export default class Math {

  constructor() {}

  static get Point() {

    return (
      /**
       * Point
       * @class Point
       */
      class Point {

        /**
         * @param {Number} x
         * @param {Number} y
         * @constructor
         */
        constructor(x, y) {
          this.x = x || 0;
          this.y = y || 0;
        }

        /**
         * @param {Number} x
         * @param {Number} y
         */
        set(x, y) {
          this.x = x;
          this.y = y;
        }

        /**
         * Round point
         */
        round() {
          this.x <<= 0;
          this.y <<= 0;
        }

      }
    );

  }

  /**
   * Round integer to its nearst X integer
   * @param  {Number} a Number
   * @param  {Number} b Round to
   * @return {Number}
   */
  static roundTo(a, b) {
    b = 1 / (b);
    return (window.Math.round(a * b) / b);
  }

  /**
   * Zoom scale
   * @param {Number} factor
   */
  static zoomScale(factor) {

    return (
      factor >= 0 ? factor + 1    :
      factor < 0  ? -(factor) + 1 :
      factor + 1
    );

  }

  /**
   * Hypotenuse
   * @param {Number} x
   * @param {Number} y
   * @return {Number}
   */
  static hypot(x, y) {

    return (window.Math.sqrt((x * x) + (y * y)));

  }

  /**
   * Distance between two points
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @return {Object}
   */
  static distance(x1, y1, x2, y2) {

    let x = this.roundTo(window.Math.sqrt(window.Math.pow((x1 - x2), 2)), DIMENSION);
    let y = this.roundTo(window.Math.sqrt(window.Math.pow((y1 - y2), 2)), DIMENSION);

    return ({
      x: x1 - x2 < 0 ? -x : x,
      y: y1 - y2 < 0 ? -y : y,
    });

  }

}