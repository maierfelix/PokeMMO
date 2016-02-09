import {
  DEBUG, DEBUG_FPS,
  GRID_WIDTH
} from "../cfg";
import math from "../Math";
import { drawGrid } from "./grid";

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

  this.renderMap();

  this.renderLayers();

}

/**
 * Render map
 */
export function renderMap() {

  var map = null;

  if ((map = this.instance.maps["Town"]) === void 0) return void 0;
  if (map.buffers[1] === void 0) return void 0;

  this.context.drawImage(
    map.buffers[1].canvas,
    this.camera.x << 0,
    this.camera.y << 0,
    (map.width * this.dimension) * this.scale << 0,
    (map.height * this.dimension) * this.scale << 0
  );

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

    entity.render(this);

  };

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