import { SHADOWX, SHADOWY } from "../cfg";
import math from "../Math";
import { drawGrid } from "./grid";
import { TextureCache } from "../Engine/utils";

/**
 * Rendering
 */
export function render() {

  /** Pixel friendly scaling */
  this.instance.scale = math.roundTo(parseFloat(math.zoomScale(this.instance.z)), 0.125);

  this.update();

  this.sort();

  this.clear();

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

  drawGrid(
    this.context,
    this.camera.x, this.camera.y,
    this.width, this.height,
    this.dimension,
    this.instance.scale,
    .05,
    "#FFF"
  );

  this.context.beginPath();

  var ln = 1 * this.instance.scale;

  /** Draw scene */
  this.context.strokeStyle = "red";
  this.context.lineWidth = ln;

  this.context.strokeRect(
    this.camera.x + (ln / 2),
    this.camera.y + (ln / 2),
    (this.scene.size.x * this.instance.scale) - ln << 0, (this.scene.size.y * this.instance.scale) - ln << 0
  );
  this.context.stroke();

  this.context.closePath();

  this.renderLayers();

  window.rAF(() => this.render());

}

/**
 * Render layers
 */
export function renderLayers() {

  var ii = 0;
  var length = 0;

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

  var entity = null;

  var ii = 0;
  var length = 0;

  length = entities.length;

  var x = .0;
  var y = .0;

  var width  = .0;
  var height = .0;

  var dim = this.dimension;

  var scale = this.instance.scale;

  var shadowX = SHADOWX;
  var shadowY = SHADOWY;

  for (; ii < length; ++ii) {

    entity = entities[ii];

    x = Math.ceil(this.camera.x + entity.x * scale);
    y = Math.ceil(this.camera.y + entity.y * scale);

    width  = entity.size.x * scale;
    height = entity.size.y * scale

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

    /** Shadow */
    this.context.drawImage(
      entity.texture.texture_shadow.canvas,
      /** Frame */
      (entity.frames[1] * (entity.size.x + dim)),
      (entity.size.y + dim) * (entity.facing),
      /** Scale */
      entity.size.x * 2, entity.size.y * 2,
      x << 0, y + (dim / 1.055 * scale) << 0,
      width / SHADOWX << 0, height / SHADOWY << 0
    );

    /** Sprite */
    this.context.drawImage(
      entity.texture.texture.canvas,
      /** Frame */
      (entity.frames[1] * (entity.size.x + dim)),
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

  };

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