import {
  DIMENSION,
  LEFT, UP, RIGHT, DOWN
} from "./cfg";

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
   * Clamp
   * @param  {Number} value
   * @param  {Number} min
   * @param  {Number} max
   * @return {Number}
   */
  static clamp(value, min, max) {
    return (
      window.Math.min(max, window.Math.max(min, value))
    );
  }

  /**
   * Get closest point
   * @param  {Array} array
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number} index
   */
  static get2DClosest(array, x, y) {

    let ii = 0;
    let length = array.length;

    let distance = null;

    let distances = [];

    for (; ii < length; ++ii) {
      distance = this.distance(array[ii].x, array[ii].y, x, y);
      distance.index = ii;
      distances.push(distance);
    };

    distances.sort(function(a, b){
      if (a.y === b.y) return (a.x - b.x);
      return (a.y - b.y);
    });

    return (distances[distances.length - 1].index);

  }

  /**
   * Cubic collision
   * @param {Number} xx
   * @param {Number} yy
   * @param {Number} width
   * @param {Number} height
   * @param {Number} x
   * @param {Number} y
   * @param {Number} scale
   * @return {Boolean}
   */
  static cubicCollision(xx, yy, width, height, x, y, scale) {
    return (
      window.Math.abs(2 * (x - ((xx * scale))) + -(width * scale)) <= (width * scale) &&
      window.Math.abs(2 * (y - ((yy * scale))) + -(height * scale)) <= (height * scale)
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

  /**
   * Get tile position
   * @param {Number} x
   * @param {Number} y
   * @param {Number} dir
   */
  static getTilePosition(x, y, dir) {

    var facing = -1;

    var x = x;
    var y = y;

    switch (dir) {
      case LEFT:
        x -= DIMENSION;
        facing = 3;
      break;
      case UP:
        y -= DIMENSION;
        facing = 1;
      break;
      case RIGHT:
        x += DIMENSION;
        facing = 2;
      break;
      case DOWN:
        y += DIMENSION;
        facing = 0;
      break;
      default:
        facing = 0;
      break;
    };

    return ({
      x: x,
      y: y,
      facing: facing
    });

  }

}