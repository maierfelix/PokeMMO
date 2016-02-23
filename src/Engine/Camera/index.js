import {
  FREE_CAMERA,
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
    this.drag = {
      px: 0,
      py: 0,
      pz: 0,
      sx: 0,
      sy: 0
    };

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
    this.scaling = .0;

    /**
     * Camera calculated resolution
     * @type {Number}
     */
    this.resolution = .0;

    /**
     * Entity to focus
     * @type {Object}
     */
    this.entityFocus = null;

    /**
     * Scale
     * @type {Number}
     * @getter
     * @setter
     */
    Object.defineProperty(this, "scale", {
      get: function() {
        return (this.scaling);
      },
      set: function(value) {
        this.scaling = value;
        this.refreshResolution();
      }
    });

  }

  /**
   * Move
   * @param {Number} x
   * @param {Number} y
   */
  move(x, y) {

    this.x += x - this.drag.px;
    this.y += y - this.drag.py;

    this.drag.px = x;
    this.drag.py = y;

  }

  /**
   * Click
   * @param {Number} x
   * @param {Number} y
   */
  click(x, y) {

    this.drag.sx = (x - this.x) / this.resolution;
    this.drag.sy = (y - this.y) / this.resolution;

    this.drag.px = x;
    this.drag.py = y;

  }

  /**
   * Refresh the resolution
   */
  refreshResolution() {
    this.resolution = math.roundTo(parseFloat(math.zoomScale(this.scale)), PIXEL_SCALE);
  }

  /**
   * Zoom
   * @param {Object} e
   */
  zoom(e) {

    let amount = (e.deltaY ? -e.deltaY : e.deltaY);

    amount = amount / 2 / (math.hypot(this.width, this.height) / Math.PI) * math.zoomScale(this.scale);

    this.drag.pz = this.resolution;

    this.scale += amount / 2;

    if (this.scale < MIN_SCALE) this.scale = MIN_SCALE;
    if (this.scale > MAX_SCALE) this.scale = MAX_SCALE;

    this.x -= (this.drag.sx) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
    this.y -= (this.drag.sy) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));

  }

  /**
   * Get x center position
   * @param  {Number} x
   * @return {Number}
   */
  getX(x) {
    return (
      this.size.x / 2 - (x * this.resolution) - ((DIMENSION / 2) * this.resolution)
    );
  }

  /**
   * Get y center position
   * @param  {Number} y
   * @return {Number}
   */
  getY(y) {
    return (
      this.size.y / 2 - (y * this.resolution)
    );
  }

  /**
   * Play camera animations
   */
  animate() {

    if (this.queue.length <= 0) return void 0;

    let velocity = this.queue[0];

    let x = this.getX(this.queue[0].entity.x);
    let y = this.getY(this.queue[0].entity.y);

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

    if (FREE_CAMERA === true) {
      return void 0;
    }

    if (
      this.entityFocus === null ||
      this.entityFocus === void 0
    ) return void 0;

    this.position.x = this.getX(this.entityFocus.x);
    this.position.y = this.getY(this.entityFocus.y);

    return void 0;

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
      x + width >= 0 && x - width <= this.size.x &&
      y + height >= 0 && y - height <= this.size.y
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
        ((x * this.resolution) + this.position.x) << 0,
        ((y * this.resolution) + this.position.y) << 0,
        width * this.resolution << 0,
        height * this.resolution << 0
      )
    );

  }

}