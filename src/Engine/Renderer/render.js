import {
  EDIT_MODE,
  DEBUG_MODE, DEBUG_FPS,
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

  if (DEBUG_MODE === true) {
    this.clear();
  }

  this.update();

  this.sort();

  this.draw();

  if (DEBUG_MODE === true) {
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

  this.renderEntities();

  if (DEBUG_MODE === true) {
    this.context.beginPath();
    drawGrid(
      this.context,
      this.camera.x, this.camera.y,
      this.width, this.height,
      this.dimension,
      this.camera.resolution,
      .05,
      "#FFF"
    );
    this.context.closePath();
  }

  if (EDIT_MODE === true) {
    this.renderEditorMode();
  }

  if (DEBUG_MODE === true) {
    this.renderDebugScene();
  }

  return void 0;

}

/**
 * Render map
 */
export function renderMap() {

  let map = this.instance.currentMap;

  /** Render background layer */
  this.context.drawImage(
    map.buffers[1].canvas,
    this.camera.x << 0,
    this.camera.y << 0,
    (map.width * this.dimension) * this.camera.resolution << 0,
    (map.height * this.dimension) * this.camera.resolution << 0
  );

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
    ((entity.size.x * 2) << 0 * entity.size.x / entity.frames)
  );
}

/**
 * Render entities
 */
export function renderEntities() {

  let entities = this.instance.currentMap.entities;

  let entity = null;

  let resolution = this.camera.resolution;

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

    if (entity.lifeTime > 0) {
      if (this.now >= entity.lifeTime) {
        entity.lifeTime = 0;
        entity.fadeOut(1, true);
      }
    }

    if (entity.static === false) entity.animate();

    if (entity.opacity === .0) continue;
    if (entity.texture === null || entity.shadow === null) continue;

    x = (this.camera.x + (entity.position.x + entity.xMargin) * resolution) << 0;
    y = (this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;

    width  = (entity.size.x * resolution) << 0;
    height = (entity.size.y * resolution) << 0;

    eWidth  = ((entity.size.x / entity.scale) * 2) << 0;
    eHeight = ((entity.size.y / entity.scale) * 2) << 0;

    if (entity.animation === true) {
      frame = this.getAnimationFrame(entity) / (entity.size.x * 2);
    } else {
      frame = (((entity.frames[entity.frame] + entity.getFrameIndex()) * eWidth) / (entity.size.x * 2)) + entity.facing * (entity.texture.yMul);
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
    entity.texture.effect_sprites[frame].canvas,
    0, 0,
    /** Scale */
    eWidth, eHeight,
    x, y,
    width, height
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

  let resolution = this.camera.resolution;

  this.context.drawImage(
    /** Texture */
    entity.shadow.texture.sprites[frame].canvas,
    0, 0,
    /** Scale */
    eWidth,
    eHeight,
    /** Position */
    x + (entity.shadow.position.x * resolution) << 0,
    y + (entity.shadow.position.y * resolution) + ((eHeight / 2 * entity.scale) * resolution) << 0,
    /** Scretch */
    ((width + (entity.shadow.scale.x * resolution)) / SHADOW_X) << 0,
    ((height + (entity.shadow.scale.y * resolution)) / SHADOW_Y) << 0
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
 * @param {String} color
 */
export function drawPixelText(str, x, y, fontSize, lineWidth, color) {

  this.context.font = fontSize + "px AdvoCut";
  this.context.strokeStyle = color;
  this.context.lineWidth = lineWidth;
  this.context.strokeText(str, x, y);
  this.context.fillStyle = 'white';
  this.context.fillText(str, x, y);

  return void 0;

}