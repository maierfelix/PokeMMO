import {
  DEBUG, DEBUG_FPS,
  SHADOW_X, SHADOW_Y,
  GRID_WIDTH
} from "../cfg";
import math from "../Math";
import { drawGrid } from "./grid";
import { TextureCache } from "../Engine/utils";

/**
 * Rendering
 */
export function render() {

  this.update();

  this.sort();

  if (this.spriteQueue.length >= 1) {
    this.drawPixelText(
      "Loading" + "...",
      15, 30,
      20, 1.5);
    this.loadSprites(this.spriteQueue, () => window.rAF(() => this.render()));
    return void 0;
  }

  this.draw();

  if (DEBUG === true) {
    this.renderDebugScene();
    setTimeout(() => this.render(), 1E3 / DEBUG_FPS);
    return void 0;
  }

  window.rAF(() => this.render());

}

export function draw() {

  this.clear();

  if (DEBUG === true) {
    drawGrid(
      this.context,
      this.camera.x, this.camera.y,
      this.width, this.height,
      this.dimension,
      this.scale,
      .05,
      "#FFF"
    );
    this.renderScene();
  }

  this.renderLayers();

}

/**
 * Render scene
 */
export function renderScene() {

  let ln = GRID_WIDTH * this.scale;

  this.context.beginPath();

  /** Draw scene */
  this.context.strokeStyle = "red";
  this.context.lineWidth = ln;

  this.context.strokeRect(
    this.camera.x + (ln / 2),
    this.camera.y + (ln / 2),
    (this.camera.viewport.x * this.scale) - ln << 0,
    (this.camera.viewport.y * this.scale) - ln << 0
  );

  this.context.stroke();

  this.context.closePath();

}

/**
 * Render layers
 */
export function renderLayers() {

  let ii = 0;
  let length = 0;

  length = this.layers.length;

  for (; ii < length; ++ii) {
    this.renderEntities(this.layers[ii].entities);
  };

}

/**
 * Render entities
 * @param {Array} entities
 */
export function renderEntities(entities) {

  let entity = null;

  let ii = 0;
  let length = 0;

  length = entities.length;

  for (; ii < length; ++ii) {

    entity = entities[ii];

    if (!this.instance.camera.isInView(entity)) continue;

    entity.animate();

    if (entity.texture !== null && entity.texture.hasLoaded === false) continue;

    this.renderEntity(entity);

  };

  return void 0;

}

/**
 * Render a entity
 * @param {Object} entity
 */
export function renderEntity(entity) {

  if (entity.texture === null) return void 0;

  let eWidth  = (entity.width  / entity.scale) * 2;
  let eHeight = (entity.height / entity.scale) * 2;

  let scale = this.scale;

  const shadowX = SHADOW_X;
  const shadowY = SHADOW_Y;

  let cX = ((this.dimension / 2) * entity.scale) * scale;
  let cY = (this.dimension * entity.scale) * scale;

  let x = (this.camera.x + entity.x * scale) - cX;
  let y = (this.camera.y + entity.y * scale) - cY;

  let width  = entity.width  * scale;
  let height = entity.height * scale;

  /** Shadow */
  if (entity.shadow !== null && entity.hasShadow === true) {
    this.context.drawImage(
      entity.shadow.texture.canvas,
      /** Frame */
      (entity.frames[entity.frame] * (eWidth)),
      (eHeight) * entity.shadowFacing(entity.facing),
      /** Scale */
      eWidth, eHeight,
      x + (entity.shadow.offset.x) << 0, y + ((eHeight / 2 * entity.scale) / entity.shadow.offset.y * scale) << 0,
      width / shadowX << 0, height / shadowY << 0
    );
  }

  /** Sprite */
  this.context.drawImage(
    entity.texture.texture_effect.canvas,
    /** Frame */
    (entity.frames[entity.frame] * (eWidth)),
    (eHeight) * entity.facing,
    /** Scale */
    eWidth, eHeight,
    x << 0, y << 0,
    width << 0, height << 0
  );

  return void 0;

}

/**
 * Draw pixel based text
 * @param {String} str
 * @param {Number} x
 * @param {Number} y
 * @param {Number} fontSize
 * @param {Number} lineWidth
 */
export function drawPixelText(str, x, y, fontSize, lineWidth) {

  this.context.font = fontSize + "px AdvoCut";
  this.context.strokeStyle = '#313131';
  this.context.lineWidth = lineWidth;
  this.context.strokeText(str, x, y);
  this.context.fillStyle = 'white';
  this.context.fillText(str, x, y);

  return void 0;

}