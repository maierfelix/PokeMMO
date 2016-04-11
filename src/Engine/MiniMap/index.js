import {
  DIMENSION
} from "../../cfg";

import {
  TextureCache,
  createCanvasBuffer
} from "../utils";

import math from "../../Math";

import MapEntity from "../Map/MapEntity";

import Camera from "../Camera";

/**
 * MiniMap
 * @class MiniMap
 * @export
 */
export default class MiniMap {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    /**
     * Game instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Camera ref
     * @type {Object}
     */
    this.camera = new Camera(this);

    /**
     * Camera size ref
     * @type {Object}
     */
    this.camera.size = this.instance.camera.size;

    /**
     * Camera pos ref
     * @type {Object}
     */
    this.camera.position = this.instance.camera.position;

    /**
     * Width
     * @type {Number}
     */
    this.width = 300;

    /**
     * Height
     * @type {Number}
     */
    this.height = 200;

    /**
     * Minimap buffer
     * @type {Object}
     */
    this.buffer = null;

    /**
     * Minimap background buffer
     * @type {Object}
     */
    this.bgBuffer = null;

    /**
     * Minimap front buffer
     * @type {Object}
     */
    this.frBuffer = null;

    /**
     * Redraw state
     * @type {Boolean}
     */
    this.redraw = true;

    this.entities = {};

    this.resolution = 1.0;

    this.position = new math.Point();

    this.init();

  }

  /**
   * Initialise
   */
  init() {

    this.buffer = createCanvasBuffer(this.width, this.height);

    this.bgBuffer = createCanvasBuffer(this.width, this.height);

    this.frBuffer = createCanvasBuffer(this.width, this.height);

    this.createEntityBuffer("Player", "#DBB78A", "#905A23");
    this.createEntityBuffer("Entity", "#697a21", "#c9db8a");
    this.createEntityBuffer("LocalPlayer", "#119617", "#abf4c0");
    this.createEntityBuffer("Tree", "#697a21", "darkgreen");

    this.resize();

    this.draw();

  }

  /**
   * Resize
   */
  resize() {

    this.position.x = this.camera.width - this.width;
    this.position.y = this.camera.height - this.height;

  }

  /**
   * Mouse inside this map offset
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  inside(x, y) {

    return (
      math.cubicCollision(
        x, y,
        1, 1,
        this.position.x, this.position.y,
        this.width, this.height
      )
    );

  }

  /**
   * Create a entity buffer
   * @param {String} type
   * @param {String} fillColor
   * @param {String} strokeColor
   */
  createEntityBuffer(type, fillColor, strokeColor) {

    let radius = 6;

    let width = 16;
    let height = 16;

    let link = null;

    this.entities[type] = createCanvasBuffer(width, height);

    link = this.entities[type];

    link.beginPath();
    link.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, false);
    link.fillStyle = fillColor;
    link.fill();
    link.lineWidth = 1.5;
    link.strokeStyle = strokeColor;
    link.stroke();

  }

  /**
   * Draw mini map
   * @param {Number} mode
   * @param {Array}  entities
   */
  draw(mode, entities) {

    this.buffer.clear();
    this.bgBuffer.clear();
    this.frBuffer.clear();

    /** Redraw everything */
    if (mode === 0) {
      this.drawBackground();
      this.drawFront(entities);
      return void 0;
    }

    /** Redraw front only */
    if (mode === 1) {
      this.drawFront(entities);
      return void 0;
    }

    return void 0;

  }

  /**
   * Draw a background
   */
  drawBackground() {

    this.bgBuffer.strokeStyle = "red";
    this.bgBuffer.strokeRect(
      0, 0,
      this.width, this.height
    );
    this.bgBuffer.stroke();

    return void 0;

  }

  /**
   * Draw the front layer
   * @param {Array} entities
   */
  drawFront(entities) {

    let entity = null;

    let ii = 0;
    let length = 0;

    length = entities.length;

    let resolution = this.instance.camera.resolution;
    let scaling = .0;

    let camX = (this.width / 2) - (((this.camera.size.x / 2) - this.camera.position.x) / resolution);
    let camY = (this.height / 2) - (((this.camera.size.y / 2) - this.camera.position.y) / resolution);

    let color = null;

    let x = 0;
    let y = 0;

    let width = 0;
    let height = 0;

    for (; ii < length; ++ii) {
      entity = entities[ii];
      scaling = entity.scale + (-entity.z / this.resolution) / ((entity.width + entity.height) / 2);
      if (entity.texture === null) continue;
      x = ((camX + entity.x + entity.xMargin + ((entity.z / (entity.width / 2)) / 2)) * this.resolution) << 0;
      y = ((camY + entity.y + entity.yMargin + entity.z) * this.resolution) << 0;
      width = (entity.size.x) * scaling << 0;
      height = (entity.size.y) * scaling << 0;
      this.drawEntity(entity, x, y, width, height);
    };

    this.drawCameraViewport(camX, camY);

    return void 0;

  }

  /**
   * Draw a entity
   * @param  {Object} entity
   * @param  {Number} x
   * @param  {Number} y
   * @param  {Number} width
   * @param  {Number} height
   */
  drawEntity(entity, x, y, width, height) {

    let tmpl = null;

    let Player = this.instance.instance.entities.Player;

    if (
      this.instance.localEntity !== null &&
      entity.id === this.instance.localEntity.id
    ) {
      tmpl = this.entities["LocalPlayer"];
    }
    else if (entity instanceof Player) {
      tmpl = this.entities["Player"];
    }
    else if (entity.name === "Tree") {
      tmpl = this.entities["Tree"];
    }
    else {
      tmpl = this.entities["Entity"];
    }

    this.bgBuffer.drawImage(
      tmpl.canvas,
      x, y
    );

    return void 0;

  }

  /**
   * Draw camera viewport
   */
  drawCameraViewport(x, y) {

    let resolution = this.instance.camera.resolution;

    this.bgBuffer.lineWidth = 1;
    this.bgBuffer.strokeStyle = "red";
    this.bgBuffer.strokeRect(
      x - (this.camera.position.x / resolution),
      y - (this.camera.position.y / resolution),
      this.camera.size.x / resolution,
      this.camera.size.y / resolution
    );
    this.bgBuffer.stroke();

    return void 0;

  }

}