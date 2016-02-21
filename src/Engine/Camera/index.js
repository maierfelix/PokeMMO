import {
  DIMENSION,
  MIN_SCALE, MAX_SCALE,
  PIXEL_SCALE
} from "../../cfg";
import math from "../../Math";

import DisplayObject from "../DisplayObject";

/**
 * Camera
 * @class Camera
 * @export
 */
export default class Camera extends DisplayObject {

  /**
   * @constructor
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {

    super(null);

    /**
     * Drag offset
     * @type {Object}
     */
    this.drag = new math.Point();

    /**
     * Dragging state
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Animation queue
     * @type {Array}
     */
    this.queue = [];

    /** Camera size */
    this.size.set(
      width  || 0,
      height || 0
    );

    /**
     * Camera scaling
     * @type {Number}
     */
    this.scale = .0;

    /**
     * Entity to focus
     * @type {Object}
     */
    this.entityFocus = null;

    /** Camera resolution */
    Object.defineProperty(this, "resolution", {
      get: function() {
        return (
          math.roundTo(
            parseFloat(math.zoomScale(this.scale))
          , PIXEL_SCALE)
        );
      },
      set: function(value) {
        this.scale = value;
      }
    });

  }

  /**
   * Zoom
   * @param {Object} e
   */
  zoom(e) {

    let amount = (e.deltaY ? -e.deltaY : e.deltaY);

    amount = amount / 2 / (math.hypot(this.width, this.height) / Math.PI) * math.zoomScale(this.scale);

    this.scale += amount / 2;

    if (this.scale < MIN_SCALE) this.scale = MIN_SCALE;
    if (this.scale > MAX_SCALE) this.scale = MAX_SCALE;

  }

  /**
   * Get x center position
   * @param  {Object} entity
   * @return {Number}
   */
  getX(entity) {
    return (
      this.width / 2 - (entity.x * this.resolution) - ((((entity.width) / DIMENSION)) * this.resolution)
    );
  }

  /**
   * Get y center position
   * @param  {Object} entity
   * @return {Number}
   */
  getY(entity) {
    return (
      this.height / 2 - (entity.y * this.resolution) - ((((entity.height) / DIMENSION)) * this.resolution)
    );
  }

  /**
   * Play camera animations
   */
  animate() {

    if (this.queue.length <= 0) return void 0;

    let velocity = this.queue[0];

    let x = this.getX(this.queue[0].entity);
    let y = this.getY(this.queue[0].entity);

    /**
     * TODO: Get camera movement working
     * while change resolution
     */
 
    /**
     * Immediate camera value injection
     * ?: so we do grid based movement
     */
    if (this.position.x !== x) {
      this.position.x += this.position.x < x ? this.resolution : -this.resolution;
    } else {
      this.position.y += this.position.y < y ? this.resolution : -this.resolution;
    }

    if (
      this.position.x === x &&
      this.position.y === y
    ) {
      this.entityFocus = this.queue[0].entity;
      this.queue.shift();
    }

    return void 0;

  }

  /**
   * Animate focus
   * @param {Object} entity
   */
  animateFocus(entity) {
    this.queue.push({
      entity: entity
    });
  }

  /**
   * Focus focusEntity
   */
  focusEntity() {

    if (
      this.entityFocus === null ||
      this.entityFocus === void 0
    ) return void 0;

    /** Immediate camera value injection */
    this.position.x = this.getX(this.entityFocus);
    this.position.y = this.getY(this.entityFocus);

  }

  /**
   * Focus a entity
   * @param {Object}  entity
   * @param {Boolean} instant
   */
  focus(entity, instant) {
    if (instant === true) {
      this.entityFocus = entity;
      return void 0;
    }
    this.animateFocus(entity);
  }

  /**
   * Cubic in view
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @return {Boolean}
   */
  inView(x, y, width, height) {

    return (
      x + width >= 0 && x - width <= this.width &&
      y + height >= 0 && y - height <= this.height
    );

  }

  /**
   * Is in view
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  isInView(x, y, width, height) {

    return (
      this.inView(
        ((x * this.resolution) + this.x) << 0,
        ((y * this.resolution) + this.y) << 0,
        width * this.resolution << 0,
        height * this.resolution << 0
      )
    );

  }

}