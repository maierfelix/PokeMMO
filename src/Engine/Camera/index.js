import {
  DIMENSION,
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

    let velocity = this.queue[0].velocity;

    let oldX = this.getX(this.entityFocus);
    let oldY = this.getY(this.entityFocus);

    let newX = this.getX(this.queue[0].entity);
    let newY = this.getY(this.queue[0].entity);

    let distance = math.distance(
      oldX, oldY,
      newX, newY
    );

    let amount = math.roundTo(velocity, DIMENSION);

    /**
     * Immediate camera value injection
     * ?: so we do grid based movement
     */
    if (this.position.x !== newX) {
      this.position.x += this.position.x < newX ? velocity : -velocity;
    } else {
      if (this.position.y !== newY) {
        this.position.y += this.position.y < newY ? velocity : -velocity;
      }
    }

    if (
      this.position.x === newX &&
      this.position.y === newY
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
      entity: entity,
      velocity: 4.0
    });
  }

  /**
   * Focus focusEntity
   */
  focusEntity() {

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
        ((x * this.scale) + this.x) << 0,
        ((y * this.scale) + this.y) << 0,
        width * this.scale << 0,
        height * this.scale << 0
      )
    );

  }

}