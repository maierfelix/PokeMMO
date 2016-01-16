import math from "../../Math";

/**
 * Layer
 * @class Layer
 * @export
 */
export default class Layer {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    /**
     * Name
     * @type {String}
     */
    this.name = obj.name || "";

    /**
     * Z priority
     * @type {Number}
     */
    this.zIndex = obj.zIndex || 0;

    /**
     * Z shadow priority
     * @type {Number}
     */
    this.zShadow = obj.zShadow || 0;

    /**
     * Shadow casting
     * @type {Boolean}
     */
    this.shadowCast = typeof obj.shadowCast === "boolean" ? obj.shadowCast : false;

    /**
     * Entities in this layer
     * @type {Array}
     */
    this.entities = [];

  }

  /**
   * Layer contains a entity
   * @param  {Number}  id
   * @return {Number}
   */
  hasEntity(id) {

    var ii = 0;
    var length = 0;

    length = this.entities.length;

    for (; ii < length; ++ii) {
      if (this.entities[ii].id === id) return (ii);
    };

    return (-1);

  }

}