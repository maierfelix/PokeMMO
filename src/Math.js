/**
 * Math
 * @class Math
 * @export
 */
export default class Math {

  constructor() {}

  /**
   * Point
   * @class Math.Point
   */
  static get Point() {

    return (
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

      }
    );

  }

}