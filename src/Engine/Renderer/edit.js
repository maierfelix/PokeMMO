import {
  DIMENSION
} from "../../cfg";

import math from "../../Math";

/**
 * Edit mode
 */
export function renderEditorMode() {

  this.renderSelection();

}

/**
 * Render entity selection
 */
export function renderSelection() {

  let entity = this.instance.editor.entitySelection;

  if (entity === null) return void 0;

  if (this.camera.isInView(
    entity.position.x, entity.position.y,
    entity.size.x, entity.size.y
  ) === false) return void 0;
  if (entity.opacity === .0) return void 0;
  if (entity.texture === null || entity.shadow === null) return void 0;

  let resolution = this.camera.resolution;

  let x = (this.camera.x + (entity.position.x + entity.xMargin) * resolution) << 0;
  let y = (this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;

  let width  = (entity.size.x * resolution) << 0;
  let height = (entity.size.y * resolution) << 0;

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

  let dim = DIMENSION * resolution;

  let width  = entity.width / DIMENSION;
  let height = entity.height / DIMENSION;

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

  this.drawPixelText(
    txtX,
    xx, yy,
    size, ln,
    color
  );

  this.drawPixelText(
    txtY,
    xx, yy += size,
    size, ln,
    color
  );

}