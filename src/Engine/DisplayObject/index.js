import { uHash } from "../utils";
import math from "../../Math";

/**
 * Display object
 * @class DisplayObject
 * @export
 */
export default class DisplayObject {

  /**
   * @constructor
   * @param {Number} width
   * @param {Number} height
   */
  constructor(x, y, width, height) {

    /**
     * Unique id
     * @type {Number}
     */
    this.id = uHash();

    /**
     * Position
     * @type {Object}
     */
    this.position = new math.Point(
      x !== void 0 ? x : 0,
      y !== void 0 ? y : 0
    );

    /** 
     * Size
     * @type {Object}
     */
    this.size = new math.Point(
      width  !== void 0 ? width  : 0,
      height !== void 0 ? height : 0
    );

    /** 
     * Scale factor
     * @type {Object}
     */
    this.scale = new math.Point(1, 1);

    Object.defineProperty(this, "x", {
      get: function() {
        return (this.position.x);
      },
      set: function(value) {
        this.position.x = value;
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(this, "y", {
      get: function() {
        return (this.position.y);
      },
      set: function(value) {
        this.position.y = value;
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(this, "width", {
      get: function() {
        return (this.size.x);
      },
      set: function(value) {
        this.size.x = value;
      },
      configurable: true,
      enumerable: true
    });

    Object.defineProperty(this, "height", {
      get: function() {
        return (this.size.y);
      },
      set: function(value) {
        this.size.y = value;
      },
      configurable: true,
      enumerable: true
    });

  }

}