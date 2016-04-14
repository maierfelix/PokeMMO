import {
  DIMENSION,
  LEFT, UP, RIGHT, DOWN
} from "./cfg";

import * as randSeed from "./libs/seed";

/**
 * Mathematical
 * @class Mathematical
 * @export
 */
export default class Mathematical {

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Seed
   * @getter
   */
  static get Seed() {

    return (
      /**
       * Seed
       * @class Seed
       */
      class Seed {

        /**
         * @constructor
         * @param {String} seed
         */
        constructor(seed) {

          /**
           * Seed
           * @type {String}
           */
          this.seed = seed;

          this.generator = randSeed.create(this.seed);

        }

        /**
         * Get a randomized float
         * based on own seed
         * @return {Number}
         */
        random() {
          return (this.generator(1e9));
        }

      }
    );

  }

  /**
   * Point
   * @getter
   */
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
      Math.min(max, Math.max(min, value))
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
      distance = this.distance(array[ii].x, array[ii].y, x, y + (array[ii].height / 2));
      distance.index = ii;
      distance.width = array[ii].width;
      distance.height = array[ii].height;
      distances.push(distance);
    };

    /**
     * Depth sorting
     * ^= y - (width * height)
     */
    (function(array) {

      let ii = 0;
      let jj = 0;

      let key = null;

      let length = array.length;

      for (; ii < length; ++ii) {
        jj = ii;
        key = array[jj];
        for (; jj > 0 && array[jj - 1].y > key.y; --jj) {
          array[jj] = array[jj - 1];
        };
        array[jj] = key;
      };

      return void 0;

    })(distances);

    return (distances[distances.length - 1].index);

  }

  /**
   * Linear intersection
   * @param {Number} xx
   * @param {Number} yy
   * @param {Number} width
   * @param {Number} height
   * @param {Number} x
   * @param {Number} y
   * @param {Number} scale
   * @return {Boolean}
   */
  static linearIntersect(xx, yy, width, height, x, y, scale) {
    return (
      Math.abs(2 * (x - ((xx * scale))) + -(width * scale)) <= (width * scale) &&
      Math.abs(2 * (y - ((yy * scale))) + -(height * scale)) <= (height * scale)
    );
  }

  /**
   * Cubic collision
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} w1
   * @param {Number} h1
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} w2
   * @param {Number} h2
   * @return {Boolean}
   */
  static cubicCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
      y1 + h1 < y2 ||
      y1 > y2 + h2 ||
      x1 + w1 < x2 ||
      x1 > x2 + w2
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
    return (Math.round(a * b) / b);
  }

  /**
   * Zoom scale
   * @param  {Number} factor
   * @return {Number}
   */
  static zoomScale(factor) {
    return (
      factor >= 0 ? factor + 1 :
      factor < 0 ? -(factor) + 1 :
      factor + 1
    );
  }

  /**
   * Hypotenuse
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number}
   */
  static hypot(x, y) {
    return (Math.sqrt((x * x) + (y * y)));
  }

  /**
   * 2d point intersects circle
   * @param  {Number} x
   * @param  {Number} y
   * @param  {Number} cx
   * @param  {Number} cy
   * @param  {Number} r
   * @return {Number}
   */
  static pointIntersectsCircle(x, y, cx, cy, r) {
    return (
      (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2
    );
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

    let x = Math.sqrt((x1 - x2) ** 2);
    let y = Math.sqrt((y1 - y2) ** 2);

    return ({
      x: x1 - x2 < 0 ? -x : x,
      y: y1 - y2 < 0 ? -y : y,
    });

  }

  /**
   * Sinus ease
   * @param  {Number} n
   * @return {Number}
   */
  static ease(n) {
    return (
      .5 + (Math.sin((n - .5) * Math.PI) / 2)
    );
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