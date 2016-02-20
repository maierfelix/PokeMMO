import {
  DEBUG, DEBUG_FPS,
  GRID_WIDTH,
  DIMENSION,
  SHADOW_X, SHADOW_Y
} from "../../cfg";

import math from "../../Math";

import { drawGrid } from "./grid";

/**
 * Rendering
 */
export function render() {

  if (DEBUG === true) {
    this.clear();
  }

  this.update();

  this.sort();

  this.draw();

  if (DEBUG === true) {
    this.renderDebugScene();
    setTimeout(() => this.render(), 1E3 / DEBUG_FPS);
    return void 0;
  }

  window.rAF(() => this.render());

  return void 0;

}

/**
 * Clear
 */
export function clear() {
  this.node.width = this.node.width;
  this.context.setImageSmoothing(this.imageSmoothing);
}

/**
 * Draw
 */
export function draw() {

  this.renderMap();

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
  }

  return void 0;

}

/**
 * Render map
 */
export function renderMap() {

  let map = null;

  if ((map = this.instance.maps["Town"]) === void 0) return void 0;
  if (map.buffers[1] === void 0) return void 0;

  let buffer = null;

  let ii = 0;
  let length = 0;

  length = this.layers.length;

  for (; ii < length; ++ii) {
    if ((buffer = map.buffers[this.layers[ii].zIndex]) === void 0) continue;
    if (this.layers[ii].name === "Entities") {
      this.renderEntities(this.layers[ii].entities);
      this.renderEntities(map.entities);
    } else {
      this.context.drawImage(
        buffer.canvas,
        this.camera.x << 0,
        this.camera.y << 0,
        (map.width * this.dimension) * this.scale << 0,
        (map.height * this.dimension) * this.scale << 0
      );
    }
  };

  return void 0;

}

/**
 * Render map entities
 * @param {Object} map
 */
export function renderMapEntities(map) {

  let entity = null;

  let ii = 0;
  let length = 0;

  length = map.entities.length;

  for (; ii < length; ++ii) {
    entity = map.entities[ii];
    if (!this.instance.camera.isInView(
      entity.x, entity.y,
      entity.width, entity.height
    )) continue;
    this.renderEntity(entity);
  };

  return void 0;

}

/**
 * Get animation frame
 * @param  {Object} entity
 * @return {Number}
 */
export function getAnimationFrame(entity) {
  return (
    Math.floor(
      (this.now - entity.animationStart) / entity.animationSpeed
    ) %
    (entity.animationFrames + (entity.loop === true ? 1 : 0)) *
    ((entity.width * 2) << 0 * entity.width / entity.frames)
  );
}

/**
 * Render entities
 * @param {Array} entities
 */
export function renderEntities(entities) {

  let entity = null;

  let ii = 0;
  let length = entities.length;

  let x = .0;
  let y = .0;

  let width  = .0;
  let height = .0;

  let eWidth  = .0;
  let eHeight = .0;

  let frame = 0;

  let dim = DIMENSION;

  for (; ii < length; ++ii) {

    entity = entities[ii];

    entity.idleTime++;

    if (entity.static === false) entity.animate();

    if (this.instance.camera.isInView(
      entity.x, entity.y,
      entity.width, entity.height
    ) === false) continue;
    if (entity.opacity === .0) continue;
    if (entity.texture === null || entity.shadow === null) continue;

    x = (this.camera.x + entity.x * this.scale) - (((dim / 2) * entity.scale) * this.scale);
    y = (this.camera.y + (entity.y + entity.z) * this.scale) - ((dim * entity.scale) * this.scale);

    width  = entity.width  * this.scale;
    height = entity.height * this.scale;

    eWidth  = (entity.width  / entity.scale) * 2;
    eHeight = (entity.height / entity.scale) * 2;

    if (entity.animation === true) {
      frame = this.getAnimationFrame(entity);
    } else {
      frame = (entity.frames[entity.frame] + entity.getFrameIndex()) * eWidth;
    }

    /** Rendering */
    this.renderEntity(entity, frame, x, y, width, height, eWidth, eHeight);

  };

  return void 0;

}

/**
 * Render a single entity
 * @param {Object} entity
 * @param {Number} frame
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} eWidth
 * @param {Number} eHeight
 */
export function renderEntity(entity, frame, x, y, width, height, eWidth, eHeight) {

  let cOpacity = entity.customOpacity();

  if (cOpacity === true) {
    this.context.globalAlpha = entity.opacity;
  }

  /** Shadow */
  if (entity.hasShadow === true) {
    this.renderShadow(
      entity,
      frame,
      x, y,
      width, height,
      eWidth, eHeight
    );
  }

  /** Sprite */
  this.context.drawImage(
    entity.texture.texture_effect.canvas,
    /** Frame */
    frame,
    eHeight * entity.facing,
    /** Scale */
    eWidth, eHeight,
    x, y,
    width << 0, height << 0
  );

  /** Reset ctx opacity */
  if (cOpacity === true) {
    this.context.globalAlpha = 1.0;
  }

  return void 0;

}

/**
 * Render shadow
 * @param {Object} entity
 * @param {Number} frame
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} eWidth
 * @param {Number} eHeight
 */
export function renderShadow(entity, frame, x, y, width, height, eWidth, eHeight) {

  this.context.drawImage(
    /** Texture */
    entity.shadow.texture.canvas,
    /** Frame */
    frame,
    eHeight * entity.shadowFacing(entity.facing),
    /** Scale */
    eWidth,
    eHeight,
    /** Position */
    x + (entity.shadow.position.x * this.scale) << 0,
    y + (entity.shadow.position.y * this.scale) + ((eHeight / 2 * entity.scale) * this.scale) << 0,
    /** Scretch */
    ((width + (entity.shadow.scale.x * this.scale)) / SHADOW_X) << 0,
    ((height + (entity.shadow.scale.y * this.scale)) / SHADOW_Y) << 0
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