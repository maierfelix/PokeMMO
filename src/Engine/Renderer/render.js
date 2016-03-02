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

  this.sort();

  this.update();

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
  return void 0;
}

/**
 * Draw
 */
export function draw() {

  this.clear();

  this.renderMap();

  this.renderEntities();

  if (DEBUG_MODE === true) {
    this.context.beginPath();
    drawGrid(
      this.context,
      this.camera.position.x, this.camera.position.y,
      this.width, this.height,
      this.dimension,
      this.camera.resolution,
      .05,
      "#FFF"
    );
    this.context.closePath();
    if (EDIT_MODE === true) {
      this.renderEditorMode();
    }
    this.renderDebugScene();
  }

  return void 0;

}

/**
 * Render map
 */
export function renderMap() {

  let map = this.instance.currentMap;

  let dim = DIMENSION;

  /** Render background layer */
  this.context.drawImage(
    map.buffers[1].canvas,
    0, 0,
    /** Scale */
    map.size.x * dim, map.size.y * dim,
    this.camera.position.x << 0, this.camera.position.y << 0,
    ((map.size.x * dim) / 2 * this.camera.resolution) << 0,
    ((map.size.y * dim) / 2 * this.camera.resolution) << 0,
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
 * Check if entity is in selection range
 * @param  {Number}  id
 * @return {Boolean}
 */
export function entityInSelectionRange(id) {

  let ii = 0;
  let length = 0;

  let entities = this.instance.editor.selectedEntities;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (entities[ii] === id) return (true);
  };

  return (false);

}

/**
 * Update entity
 * @param  {Object} entity
 * @return {Boolean} renderable
 */
export function updateEntity(entity) {

  if (entity.lifeTime > 0) {
    if (this.now >= entity.lifeTime) {
      entity.lifeTime = 0;
      entity.fadeOut(1, true);
    }
  }

  entity.animate();

  if (this.instance.camera.isInView(
    entity.position.x, entity.position.y,
    entity.size.x, (entity.size.y * 2) + entity.shadowY
  ) === false) {
    return (false);
  }

  if (entity.opacity === .0) {
    return (false);
  }

  if (entity.texture === null || entity.shadow === null) {
    return (false);
  }

  return (true);

}

/**
 * Update a entitys sprite frame
 * @param {Object} entity
 */
export function updateEntitySpriteFrame(entity) {

  if (entity.animation === true) {
    entity.sFrame = this.getAnimationFrame(entity) / (entity.size.x * 2);
  } else {
    entity.sFrame = (((entity.frames[entity.frame] + entity.getFrameIndex()) * ((entity.size.x / entity.scale) * 2)) / (entity.size.x * 2)) + entity.facing * (entity.texture.yMul);
  }

  return void 0;

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

  for (; ii < length; ++ii) {

    entity = entities[ii];

    entity.idleTime++;

    if (this.updateEntity(entity) === false) {
      continue;
    }

    if (entity.opacity < 0) {
      this.instance.removeEntity(entity);
      --length;
      --ii;
      continue;
    }

    this.updateEntitySpriteFrame(entity);

    this.renderEntity(
      entity,
      (this.camera.position.x + (entity.position.x + entity.xMargin) * resolution) << 0,
      (this.camera.position.y + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0,
      (entity.size.x * resolution) << 0, (entity.size.y * resolution) << 0,
      ((entity.size.x / entity.scale) * 2) << 0, ((entity.size.y / entity.scale) * 2) << 0
    );

  };

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
export function renderEntity(entity, x, y, width, height, eWidth, eHeight) {

  let resolution = this.camera.resolution;

  let cOpacity = entity.customOpacity();

  if (cOpacity === true) {
    this.context.globalAlpha = entity.opacity;
  }

  /** Shadow */
  if (entity.static === false && entity.hasShadow === true) {
    this.renderShadow(
      entity,
      x, y,
      width, height,
      eWidth, eHeight
    );
  }

  if (EDIT_MODE === true) {
    if (this.entityInSelectionRange(entity.id)) {
      this.context.globalAlpha = .75;
      this.context.globalCompositeOperation = "screen";
    }
  }

  if (entity.static === true) {
    this.context.drawImage(
      entity.shadow.texture.static_sprites[entity.sFrame].canvas,
      0, 0,
      /** Scale */
      eWidth, eHeight,
      x, y,
      width, height
    );
  } else {
    this.context.drawImage(
      entity.texture.effect_sprites[entity.sFrame].canvas,
      0, 0,
      /** Scale */
      eWidth, eHeight,
      x, y,
      width, height
    );
  }

  /** Reset ctx opacity */
  if (cOpacity === true) {
    this.context.globalAlpha = 1.0;
  }

  if (EDIT_MODE === true) {
    this.context.globalAlpha = 1.0;
    this.context.globalCompositeOperation = "source-over";
  }

  return void 0;

}

/**
 * Render shadow
 * @param {Object} entity
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} eWidth
 * @param {Number} eHeight
 */
export function renderShadow(entity, x, y, width, height, eWidth, eHeight) {

  let resolution = this.camera.resolution;

  this.context.drawImage(
    /** Texture */
    entity.shadow.texture.sprites[entity.sFrame].canvas,
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