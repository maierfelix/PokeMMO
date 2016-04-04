import {
  EDIT_MODE,
  DEBUG_MODE, DEBUG_FPS,
  GRID_WIDTH,
  DIMENSION,
  DISPLAY_SHADOWS, SHADOW_X, SHADOW_Y,
  RENDER_MODE, CANVAS, WGL,
  MINI_MAP
} from "../../cfg";

import math from "../../Math";

import { drawGrid } from "./grid";

/**
 * Rendering
 */
export function render() {

  this.clear();

  this.instance.sort();

  this.update();

  this.draw();

  if (DEBUG_MODE === true) {
    if (DEBUG_FPS === 60) {
      window.rAF(() => this.render());
    } else {
      setTimeout(() => this.render(), 1E3 / DEBUG_FPS);
    }
    return void 0;
  }

  window.rAF(() => this.render());

  return void 0;

}

/**
 * Clear
 */
export function clear() {
  if (RENDER_MODE === CANVAS) {
    this.node.width = this.node.width;
    this.context.setImageSmoothing(this.imageSmoothing);
  }
  if (RENDER_MODE === WGL) {
    this.glRenderer.gl.clearColor(0, 0, 0, 0);
    this.glRenderer.gl.clear(this.glRenderer.gl.COLOR_BUFFER_BIT);
  }
  return void 0;
}

/**
 * Draw
 */
export function draw() {

  if (RENDER_MODE === CANVAS) {
    this.renderMap();
  }

  this.renderEntities();

  if (DEBUG_MODE === true) {
    this.context.beginPath();
    drawGrid(
      this.context,
      this.camera.position.x, this.camera.position.y,
      this.width, this.height,
      this.dimension,
      this.camera.resolution * GRID_WIDTH,
      .05,
      "#FFF"
    );
    this.context.closePath();
    if (EDIT_MODE === true) {
      this.instance.editor.renderEditorMode();
    }
    this.renderDebugScene();
  }

  if (MINI_MAP === true) {
    if (this.instance.mini.redraw === true) {
      this.instance.mini.draw(0, this.instance.currentMap.entities);
      this.context.drawImage(
        this.instance.mini.bgBuffer.canvas,
        this.instance.mini.position.x, this.instance.mini.position.y,
        this.instance.mini.width, this.instance.mini.height
      );
    }
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
    ((map.size.y * dim) / 2 * this.camera.resolution) << 0
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
    ((entity.animationFrames - 1) + (entity.loop === true ? 1 : 0)) *
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
 * Orbit animation
 * @param  {Object} entity
 */
export function orbit(entity) {

  entity.orbitAngle += (entity.velocity * 2) * Math.PI / 180;

  let target = entity.orbitTarget;

  let radius = ((target.size.x * target.scale + target.size.y * target.scale) / DIMENSION) * 2;

  let xPadding = radius - (DIMENSION / 2);
  let yPadding = radius - (DIMENSION / 2);

  xPadding += target.xMargin;
  yPadding += target.yMargin / 2;

  entity.x = (target.position.x + xPadding) + radius * Math.cos(entity.orbitAngle);
  entity.y = (target.position.y + yPadding) + radius * Math.sin(entity.orbitAngle);

  /** Stop the orbit on a dimension friendly position */
  if (
    entity.stopOrbit === true &&
    (entity.x << 0) % 8 === 0 &&
    (entity.y << 0) % 8 === 0
  ) {
    entity.x = math.roundTo(entity.x, DIMENSION);
    entity.y = math.roundTo(entity.y, DIMENSION);
    entity.orbitAround(null);
    entity.stopOrbit = false;
  }

  /*if (entity.orbitAngle > 360) {
    entity.orbitAngle = 0;
  }*/

  return void 0;

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

  if (entity.orbit === true) {
    this.orbit(entity);
  }

  if (this.instance.camera.isInView(
    entity.position.x + entity.xMargin, entity.position.y + entity.yMargin,
    entity.size.x * entity.scale, ((entity.size.y * 2) * entity.scale) + entity.shadowY
  ) === false) {
    return (false);
  }

  if (entity.opacity === .0) {
    return (false);
  }

  if (entity.texture === null) {
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

  let gl = RENDER_MODE === WGL;

  let entities = this.instance.currentMap.entities;

  let entity = null;

  let resolution = this.camera.resolution;

  let camX = this.camera.position.x;
  let camY = this.camera.position.y;

  let ii = 0;
  let length = entities.length;

  let scaling = .0;

  for (; ii < length; ++ii) {
    entity = entities[ii];
    entity.idleTime++;
    if (this.updateEntity(entity) === false) continue;
    if (entity.opacity < 0) {
      this.instance.removeEntity(entity);
      --length;
      --ii;
      continue;
    }
    this.updateEntitySpriteFrame(entity);
    if (gl === true) continue;
    scaling = entity.scale + (-entity.z / resolution) / ((entity.size.x + entity.size.y) / 2);
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

  if (
    gl === true &&
    this.glRenderer.ready === true
  ) {
    this.glRenderer.draw();
  }

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
  if (
    DISPLAY_SHADOWS === true &&
    entity.hasShadow === true
  ) {
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

  this.context.drawImage(
    entity.texture.effect_sprites[entity.sFrame].canvas,
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

  if (EDIT_MODE === true) {
    this.context.globalAlpha = 1.0;
    this.context.globalCompositeOperation = "source-over";
  }

  this.context.resetTransform();

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
    x + ((entity.shadow.position.x * entity.scale) * resolution) << 0,
    y + ((entity.shadow.position.y * entity.scale) * resolution) + ((eHeight / 2 * entity.scale) * resolution) << 0,
    /** Scretch */
    ((width + ((entity.shadow.scale.x * entity.scale) * resolution)) / SHADOW_X) << 0,
    ((height + ((entity.shadow.scale.y * entity.scale) * resolution)) / SHADOW_Y) << 0
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
  this.context.fillStyle = "white";
  this.context.fillText(str, x, y);

  return void 0;

}