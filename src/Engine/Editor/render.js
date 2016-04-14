import {
  DIMENSION
} from "../../cfg";

import math from "../../Math";

/**
 * Edit mode
 */
export function renderEditorMode() {

  this.renderSelection();

  if (this.instance.editor.STATES.SELECTING === true) {
    //this.renderSelectedEntities();
  }

  this.renderEntitySelection();

}

/**
 * Render selected entities
 */
export function renderSelectedEntities() {

  let ii = 0;
  let length = 0;

  let entity = null;
  let entities = this.instance.editor.selectedEntities;

  length = entities.length;

  let resolution = 0;

  let x = 0;
  let y = 0;

  let width  = 0;
  let height = 0;

  for (; ii < length; ++ii) {

    entity = entities[ii];

    resolution = this.camera.resolution;

    x = (this.camera.x + (entity.position.x + entity.xMargin) * resolution) << 0;
    y = (this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;

    width  = (entity.size.x * resolution) << 0;
    height = (entity.size.y * resolution) << 0;

    this.context.beginPath();

    this.context.strokeStyle = "red";
    this.context.lineWidth = (resolution / 2) << 0;
    this.context.strokeRect(
      x, y,
      width, height
    );
    this.context.stroke();

    this.context.closePath();

  };

}

/**
 * Render selection
 */
export function renderSelection() {

  if (this.instance.editor.STATES.SELECTING === false) return void 0;

  let selection = this.instance.editor.selection;

  let resolution = this.camera.resolution;

  let x = (this.camera.x + selection.x1 * resolution) << 0;
  let y = (this.camera.y + selection.y1 * resolution) << 0;

  let width  = ((selection.x2 - selection.x1) * resolution) << 0;
  let height = ((selection.y2 - selection.y1) * resolution) << 0;

  this.context.beginPath();

  this.context.strokeStyle = "red";
  this.context.lineWidth = (resolution / 2) << 0;
  this.context.strokeRect(
    x, y,
    width, height
  );
  this.context.stroke();

  this.context.closePath();

  return void 0;

}

/**
 * Render entity selection
 */
export function renderEntitySelection() {

  let entity = this.instance.editor.entitySelection;

  if (entity === null) return void 0;

  if (this.camera.isInView(
    entity.position.x, entity.position.y,
    entity.size.x * entity.scale, entity.size.y * entity.scale
  ) === false) return void 0;
  if (entity.opacity === .0) return void 0;
  if (entity.texture === null) return void 0;

  let resolution = this.camera.resolution;

  let x = (this.camera.x + (entity.position.x + entity.xMargin) * resolution) << 0;
  let y = (this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;

  let width  = ((entity.size.x * entity.scale) * resolution) << 0;
  let height = ((entity.size.y * entity.scale) * resolution) << 0;

  if (entity.noise !== null) {
    this.renderEntityNoise(entity, x, y, width, height);
  }

  this.context.beginPath();

  this.context.strokeStyle = "red";
  this.context.lineWidth = (resolution / 2) << 0;
  this.context.strokeRect(
    x, y,
    width, height
  );
  this.context.stroke();

  this.context.closePath();

  this.renderSelectionText(entity, x, y);

  this.context.globalAlpha = .25;

  if (entity.collidable === true) {
    if (entity.collisionBox.length > 0) {
      this.renderEntityCollisionBox(entity, x, y);
    } else {
      this.context.fillStyle = "red";
      this.context.fillRect(
        x, y,
        width, height
      );
      this.context.fill();
    }
  }

  this.context.globalAlpha = 1.0;

  return void 0;

}

/**
 * Render entity noise radius
 * @param {Object} entity
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
export function renderEntityNoise(entity, x, y, width, height) {

  let resolution = this.camera.resolution;

  let radius = ((entity.noiseRadius - DIMENSION) || DIMENSION) * resolution;

  x += width / 2;
  y += height / 2;

  this.context.globalAlpha = .2;

  this.context.beginPath();

  this.context.fillStyle = "green";
  this.context.lineWidth = (resolution / 2) << 0;
  this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
  this.context.fill();

  this.context.closePath();

  this.context.globalAlpha = 1.0;

  return void 0;

}

/**
 * Render entity collision box
 * @param {Object} entity
 * @param {Number} x
 * @param {Number} y
 */
export function renderEntityCollisionBox(entity, x, y) {

  let collision = entity.collisionBox;

  let resolution = this.camera.resolution;

  let tile = 0;

  let ii = 0;

  let xx = 0;
  let yy = 0;

  let dim = DIMENSION * entity.scale * resolution;

  let width  = (entity.width) / DIMENSION;
  let height = (entity.height) / DIMENSION;

  let length = width * height;

  for (; ii < length; ++ii) {
    tile = collision[yy + xx];
    if (tile === 1) {
      this.context.fillStyle = "red";
      this.context.fillRect(
        x + (xx * dim),
        y + ((yy / width) * dim),
        dim, dim
      );
      this.context.fill();
    }
    ++xx;
    if (xx >= width) {
      yy += width;
      xx = 0;
    }
  };

  return void 0;

}

/**
 * Render entity selection text
 * @param {Object} entity
 * @param {Number} x
 * @param {Number} y
 */
export function renderSelectionText(entity, x, y) {

  let resolution = this.camera.resolution;

  let color = "red";

  let ln = .5 * resolution;
  let size = 2.5 * resolution;

  let xx = x;
  let yy = y - (ln * 1.25) - size;

  let decimals = 1;

  let txtX = `X: ${entity.position.x.toFixed(decimals)}`;
  let txtY = `Y: ${entity.position.y.toFixed(decimals)}`;

  this.instance.renderer.drawPixelText(
    txtX,
    xx, yy,
    size, ln,
    color
  );

  this.instance.renderer.drawPixelText(
    txtY,
    xx, yy += size,
    size, ln,
    color
  );

  return void 0;

}