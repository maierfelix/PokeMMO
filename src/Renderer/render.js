import math from "../Math";
import { drawGrid } from "./grid";
import { TextureCache } from "../Engine/utils";

/**
 * Rendering
 */
export function render() {

  /** Pixel friendly scaling */
  this.instance.scale = Math.roundTo(parseFloat(math.zoomScale(this.instance.z)), 0.125);

  this.clear();

  if (this.spriteQueue.length >= 1) {
    this.drawPixelText("Loading" + "...", 20, 15, 30);
    this.loadSprites(this.spriteQueue, function() {
      window.rAF(() => this.render());
      return void 0;
    }.bind(this));
    return void 0;
  }

  this.sort();

  drawGrid(
    this.context,
    this.instance.position.x, this.instance.position.y,
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
  console.log
  this.context.strokeRect(
    (this.instance.position.x + this.scene.position.x) + (ln / 2),
    (this.instance.position.y + this.scene.position.y) + (ln / 2),
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

  var scale = this.instance.scale;

  for (; ii < length; ++ii) {

    entity = entities[ii];

    x = this.instance.position.x + (entity.x << 4) * scale;
    y = this.instance.position.y + (entity.y << 4) * scale;

    width  = entity.size.x * scale;
    height = entity.size.y * scale

    /** Loaded entity texture */
    if (entity.texture === void 0 && TextureCache[entity.texture] !== void 0) {
      entity.texture = TextureCache[entity.texture];
      continue;
    } else {
      /** Sprite already queued */
      if (TextureCache[entity.sprite] === void 0 && this.spriteQueue.find(key => key === entity.sprite) === void 0) {
        this.spriteQueue.push(entity.sprite);
      }
    }

    this.context.fillStyle = "red";
    this.context.fillRect(
      x, y,
      width, height
    );
    this.context.fill();

  };

}

/**
 * Draw pixel based text
 * @param {String} str
 * @param {Number} fontSize
 * @param {Number} x
 * @param {Number} y
 */
export function drawPixelText(str, fontSize, x, y) {

  this.context.font = fontSize + "px AdvoCut";
  this.context.strokeStyle = '#313131';
  this.context.lineWidth = 1.5 * this.instance.scale << 0;
  this.context.strokeText(str, x, y);
  this.context.fillStyle = 'white';
  this.context.fillText(str, x, y);

  return void 0;

}