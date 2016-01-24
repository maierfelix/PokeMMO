import {
  DEBUG, DEBUG_FPS,
  SHADOW_X, SHADOW_Y
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

  this.clear();

  drawGrid(
    this.context,
    this.camera.position.x, this.camera.position.y,
    this.width, this.height,
    this.dimension,
    this.scale,
    .05,
    "#FFF"
  );

  if (this.spriteQueue.length >= 1) {
    this.drawPixelText(
      "Loading" + "...",
      15, 30,
      20, 1.5);
    this.loadSprites(this.spriteQueue, function() {
      window.rAF(() => this.render());
      return void 0;
    }.bind(this));
    return void 0;
  }

  if (DEBUG === true) {
    this.renderScene();
  }

  this.renderLayers();

  if (DEBUG === true) {
    this.renderDebugScene();
    setTimeout(() => this.render(), 1E3 / DEBUG_FPS);
    return void 0;
  }

  window.rAF(() => this.render());

}

/**
 * Render scene
 */
export function renderScene() {

  let ln = 1 * this.scale;

  this.context.beginPath();

  /** Draw scene */
  this.context.strokeStyle = "red";
  this.context.lineWidth = ln;

  this.context.strokeRect(
    this.camera.position.x + (ln / 2),
    this.camera.position.y + (ln / 2),
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

    if (TextureCache[entity.sprite] !== void 0 && entity.texture === null) {
      entity.texture = TextureCache[entity.sprite];
    }

    /** Sprite already queued */
    if (TextureCache[entity.sprite] === void 0) {
      if (this.spriteQueue.find(key => key === entity.sprite) === void 0) {
        this.spriteQueue.push(entity.sprite);
      }
      continue;
    }

    if (!this.instance.isInView(entity)) continue;

    entity.animate();

    this.renderEntity(entity);

  };

  return void 0;

}

/**
 * Render a entity
 * @param {Object} entity
 */
export function renderEntity(entity) {

  const dim = this.dimension;

  const shadowX = SHADOW_X;
  const shadowY = SHADOW_Y;

  let scale = this.scale;

  let x = Math.ceil(this.camera.position.x + entity.x * scale);
  let y = Math.ceil(this.camera.position.y + entity.y * scale);

  let width  = entity.size.x * scale;
  let height = entity.size.y * scale

  /** Shadow */
  this.context.drawImage(
    entity.texture.texture_shadow.canvas,
    /** Frame */
    (entity.frames[entity.frame] * (entity.size.x + dim)),
    (entity.size.y + dim) * entity.shadowFacing(entity.facing),
    /** Scale */
    entity.size.x * 2, entity.size.y * 2,
    x << 0, y + (dim / 1.1175 * scale) << 0,
    width / shadowX << 0, height / shadowY << 0
  );

  /** Sprite */
  this.context.drawImage(
    entity.texture.texture.canvas,
    /** Frame */
    (entity.frames[entity.frame] * (entity.size.x + dim)),
    (entity.size.y + dim) * entity.facing,
    /** Scale */
    entity.size.x * 2, entity.size.y * 2,
    x << 0, y << 0,
    width << 0, height << 0
  );

  /** Tag */
  this.drawPixelText(
    "Entity: " + entity.id,
    x, y,
    5 * scale, 1.5 * scale
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