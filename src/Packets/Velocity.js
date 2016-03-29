/**
 * Velocity packet
 * @class Velocity
 * @export
 */
export class Velocity {

  /**
   * @param  {Number} id
   * @param  {Number} velocity
   * @return {Object}
   * @constructor
   */
  constructor(id, velocity) {

    /**
     * Entity id
     * @type {Number}
     */
    this.id = id;

    /**
     * Velocity
     * @type {Number}
     */
    this.velocity = velocity;

    return (this.encode());

  }

  /**
   * Encode process
   * @return {Object}
   */
  encode() {

    let buffer = new ArrayBuffer(5);
    let view = new DataView(buffer);

    view.setUint8(0, 33, true);
    view.setUint16(1, this.id, true);
    view.setUint16(3, this.velocity, true);

    return (view);

  }

}