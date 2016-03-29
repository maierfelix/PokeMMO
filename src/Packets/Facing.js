/**
 * Facing packet
 * @class Facing
 * @export
 */
export class Facing {

  /**
   * @param  {Number} id
   * @param  {Number} dir
   * @param  {Number} x
   * @param  {Number} y
   * @return {Object}
   * @constructor
   */
  constructor(id, dir) {

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

    return (this.encode());

  }

  /**
   * Encode process
   * @return {Object}
   */
  encode() {

    let buffer = new ArrayBuffer(5);
    let view = new DataView(buffer);

    view.setUint8(0, 31, true);
    view.setUint16(1, this.id, true);
    view.setUint16(3, this.dir, true);

    return (view);

  }

}