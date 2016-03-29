import {
  FREE_CAMERA,
  FIX_CAMERA,
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
   * @param {Object} instance
   */
  constructor(instance) {

    super(null);

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Camera size
     * @type {Number}
     */
    this.width = instance.width;
    this.height = instance.height;

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

    /** Camera size */
    this.size.set(
      this.width  || 0,
      this.height || 0
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
     * Base offset
     * @type {Object}
     */
    this.base = new math.Point(.0, .0);

    /**
     * Target offset
     * @type {Object}
     */
    this.target = new math.Point(.0, .0);

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
   * Get game relative mouse offset
   * @param  {Number} x clientX
   * @param  {Number} y clientY
   * @return {Object}
   */
  getGameMouseOffset(x, y) {

    let xx = ((x - this.x) / this.resolution);
    let yy = ((y - this.y) / this.resolution);

    return ({
      x: (Math.ceil(xx / DIMENSION) * DIMENSION) - DIMENSION,
      y: (Math.ceil(yy / DIMENSION) * DIMENSION) - DIMENSION
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

    let delta = e.deltaY === -0 ? e.deltaX : e.deltaY;

    let amount = (delta ? -delta : delta);

    amount = amount / 2 / (math.hypot(this.size.x, this.size.y) / Math.PI) * math.zoomScale(this.scale);

    this.drag.pz = this.resolution;

    this.scale += amount / 2;

    if (this.scale < MIN_SCALE) this.scale = MIN_SCALE;
    if (this.scale > MAX_SCALE) this.scale = MAX_SCALE;

    if (FREE_CAMERA === true) {
      this.position.x -= (this.drag.sx) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
      this.position.y -= (this.drag.sy) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
    } else {
      if (this.entityFocus !== null) {
        this.position.x -= (this.entityFocus.x) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
        this.position.y -= (this.entityFocus.y) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
      }
    }

  }

  /**
   * Get x center position
   * @param  {Number} x
   * @return {Number}
   */
  getX(x) {
    x -= (DIMENSION / 2);
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
   * Update entity focus
   * @param  {Number} entity
   */
  updateFocus(entity) {

    this.base = {
      x: this.position.x,
      y: this.position.y
    };

    this.target = {
      x: this.getX(entity.x),
      y: this.getY(entity.y + entity.z)
    };

    this.deltaX = this.target.x - this.base.x;
    this.deltaY = this.target.y - this.base.y;

    return void 0;

  }

  /**
   * Play camera animations
   */
  animate(entity) {

    if (FREE_CAMERA === true) return void 0;

    this.updateFocus(entity);

    let velocity = FIX_CAMERA === true ? 0 : math.ease(Math.atan(1.05));

    let x = this.target.x - (this.base.x + (velocity * this.deltaX));
    let y = this.target.y - (this.base.y + (velocity * this.deltaY));

    if (Math.abs(this.x + x - this.target.x) > Math.abs(this.x - this.target.x)) {
      this.x = this.target.x;
      this.base.x = this.target.x;
    } else {
      this.x += x;                
    }

    if (Math.abs(this.y + y - this.target.y) > Math.abs(this.y - this.target.y)) {
      this.y = this.target.y;
      this.base.y = this.target.y;
    } else {
      this.y += y;                
    }

    return void 0;

  }

  /**
   * Animate focus
   * @param {Object} entity
   */
  animateFocus(entity) {
    this.updateFocus(entity);
    this.entityFocus = entity;
  }

  /**
   * Focus a entity
   * @param {Object}  entity
   * @param {Boolean} instant
   */
  focus(entity, instant) {
    if (instant === true) {
      if (
        entity === null ||
        entity === void 0
      ) return void 0;
      this.entityFocus = entity;
      this.position.x = this.getX(entity.x);
      this.position.y = this.getY(entity.y);
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
      x + width  >= 0 && x <= this.size.x &&
      y + height >= 0 && y <= this.size.y
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