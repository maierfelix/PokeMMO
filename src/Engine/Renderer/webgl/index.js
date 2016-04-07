/**
 * Code inspired by gles.js webgl renderer
 */

import { canvasToImage } from "../../utils";

import * as shaders from "./shaders";

/**
 * WebGL Renderer
 * @class WGL_Renderer
 * @export
 */
export default class WGL_Renderer {

  /**
   * @param {Object} instance
   * @constructor
   */
  constructor(instance) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    let options = {
      antialiasing: false,
      transparent: false,
      resolution: 1,
      view: this.instance.glNode
    };

    this.renderer = new PIXI.WebGLRenderer(
      this.instance.width, this.instance.height,
      options
    );

    this.entities = [];

    this.containers = {};

    this.stage = new PIXI.Container();

    this.ready = false;

  }

  /**
   * Initialise
   */
  init() {

    this.renderer.view.style["transform"] = "translatez(0)";

    this.ready = true;

  }

  addEntity(entity) {

    let texture = this.containers[entity.name];

    let sprite = new PIXI.Sprite(texture);

    sprite.position = entity.position;

    this.entities.push(entity);

    if (this.containers[entity.name] === void 0) {
      this.buildContainer(entity);
    }

    this.containers[entity.name].addChild(sprite);

  }

  buildContainer(entity) {

    let texture = null;

    this.containers[entity.name] = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
    this.stage.addChild(this.containers[entity.name]);
    for (var jj = 0; jj < entity.texture.effect_sprites.length; ++jj) {
      texture = new PIXI.Sprite(
        new PIXI.Texture.fromCanvas(entity.texture.effect_sprites[jj].canvas)
      );
      this.containers[entity.name].addChild(texture);
    };

  }

  /**
   * Build batched textures
   */
  buildTextures() {

    let map = this.instance.instance.currentMap;

    let ii = 0;
    let length = 0;

    let texture = null;
    let entity = null;
    let entities = map.entities;

    length = entities.length;

    return void 0;

  }

  /**
   * Draw webgl based
   */
  draw() {

    let entity = null;
    let entities = this.instance.instance.currentMap.entities;

    let resolution = this.instance.camera.resolution;

    let camX = this.instance.camera.position.x;
    let camY = this.instance.camera.position.y;

    let ii = 0;
    let length = entities.length;

    let scaling = .0;

    for (; ii < length; ++ii) {
      entity = entities[ii];
      scaling = entity.scale + (-entity.z / resolution) / ((entity.size.x + entity.size.y) / 2);
      if (entity.renderable === false) continue;
      this.renderEntity(
        entity,
        /** Position */
        (camX + (entity.position.x + entity.xMargin + ((entity.z / (entity.size.x / 2)) / 2)) * resolution) << 0,
        (camY + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0,
        /** Size */
        (entity.size.x * resolution) * scaling << 0, (entity.size.y * resolution) * scaling << 0,
        /** Scale */
        ((entity.size.x /scaling) * 2) * scaling << 0, ((entity.size.y / scaling) * 2) * scaling << 0
      );
    };

    this.renderer.render(this.stage);

    return void 0;

  }

  /**
   * Render a single entity
   * @param {Object} entity
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} eWidth
   * @param {Number} eHeight
   */
  renderEntity(entity, x, y, width, height, eWidth, eHeight) {

    let texture = this.containers[entity.name];

    return void 0;

  }

  /**
   * Resize gl viewport
   * @param {Number} width
   * @param {Number} height
   */
  resize(width, height) {

    this.renderer.resize(width, height);

  }

  /**
   * Clear
   */
  clear() {

  }

}