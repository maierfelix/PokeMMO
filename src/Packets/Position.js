/**
 * Position packet
 * @class Position
 * @export
 */
export class Position {

  /**
   * @param  {Number} id
   * @param  {Number} dir
   * @param  {Number} x
   * @param  {Number} y
   * @return {Object}
   * @constructor
   */
  constructor(id, dir, x, y) {

    /**
     * Entity id
     * @type {Number}
     */
    this.id = id;

    /**
     * Direction
     * @type {Number}
     */
    this.dir = dir;

    /**
     * X
     * @type {Number}
     */
    this.x = x;

    /**
     * Y
     * @type {Number}
     */
    this.y = y;

    return (this.encode());

  }

  /**
   * Encode process
   * @return {Object}
   */
  encode() {

    let buffer = new ArrayBuffer(9);
    let view = new DataView(buffer);

    view.setUint8(0, 32, true);
    view.setUint16(1, this.id, true);
    view.setUint16(3, this.dir, true);
    view.setUint16(5, this.x, true);
    view.setUint16(7, this.y, true);

    return (view);

  }

}