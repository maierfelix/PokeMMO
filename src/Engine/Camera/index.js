import {
  DEBUG_FPS,
  FREE_CAMERA,
  EASING_CAMERA,
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
     * Object to focus
     * @type {Object}
     */
    this.objectFocus = null;

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

    let amount = (delta > 0 ? -100 : 100);

    amount = amount / 2 / (math.hypot(this.size.x, this.size.y) / Math.PI) * math.zoomScale(this.scale);

    this.drag.pz = this.resolution;

    this.scale += amount / 2;

    if (this.scale < MIN_SCALE) this.scale = MIN_SCALE;
    if (this.scale > MAX_SCALE) this.scale = MAX_SCALE;

    let focus = this.objectFocus;

    if (FREE_CAMERA === true) {
      this.position.x -= (this.drag.sx) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
      this.position.y -= (this.drag.sy) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
    } else {
      if (focus !== null) {
        this.position.x -= (focus.position.x + (focus.size.x * focus.scale / 2) + focus.xMargin) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
        this.position.y -= (focus.position.y + ((focus.size.y * focus.scale / 2) + focus.yMargin + focus.z)) * (math.zoomScale(this.resolution) - math.zoomScale(this.drag.pz));
      }
    }

  }

  /**
   * Get x center position
   * @param  {Object} object
   * @return {Number}
   */
  getX(object) {
    return (
      this.size.x / 2 - ((object.position.x + (object.size.x * object.scale / 2) + object.xMargin) * this.resolution)
    );
  }

  /**
   * Get y center position
   * @param  {Object} object
   * @return {Number}
   */
  getY(object) {
    return (
      this.size.y / 2 - ((object.position.y + ((object.size.y * object.scale / 2) + object.yMargin + object.z)) * this.resolution)
    );
  }

  /**
   * Update object focus
   * @param  {Number} object
   */
  updateFocus(object) {

    this.base = {
      x: this.position.x,
      y: this.position.y
    };

    this.target = {
      x: this.getX(object),
      y: this.getY(object)
    };

    this.deltaX = this.target.x - this.base.x;
    this.deltaY = this.target.y - this.base.y;

    return void 0;

  }

  /**
   * Play camera animations
   * @param {Object} object
   */
  animate(object) {

    if (FREE_CAMERA === true) return void 0;

    this.updateFocus(object);

    let velocity = EASING_CAMERA === true ? 0 : math.ease(Math.atan(DEBUG_FPS / 60 + .05));

    let x = this.target.x - (this.base.x + (velocity * this.deltaX));
    let y = this.target.y - (this.base.y + (velocity * this.deltaY));

    if (Math.abs(this.position.x + x - this.target.x) > Math.abs(this.position.x - this.target.x)) {
      this.position.x = this.target.x;
      this.base.x = this.target.x;
    } else {
      this.position.x += x;                
    }

    if (Math.abs(this.position.y + y - this.target.y) > Math.abs(this.position.y - this.target.y)) {
      this.position.y = this.target.y;
      this.base.y = this.target.y;
    } else {
      this.position.y += y;                
    }

    return void 0;

  }

  /**
   * Animate focus
   * @param {Object} object
   */
  animateFocus(object) {
    this.updateFocus(object);
    this.objectFocus = object;
  }

  /**
   * Focus a object
   * @param {Object}  object
   * @param {Boolean} instant
   */
  focus(object, instant) {
    if (instant === true) {
      if (
        object === null ||
        object === void 0
      ) return void 0;
      this.objectFocus = object;
      this.position.x = this.getX(object);
      this.position.y = this.getY(object);
      return void 0;
    }
    this.animateFocus(object);
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