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
  this.context.strokeRect(
    x, y,
    width, height
  );
  this.context.stroke();

  this.context.closePath();

  this.renderSelectionText(entity, x, y);

  //this.renderEntityCollisionBox();

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

  let xx = 0;
  let yy = 0;

  let xxx = 0;
  let yyy = 0;

  let xLength = 0;
  let yLength = collision.length;

  let dim = DIMENSION * resolution;

  for (; yy < yLength; ++yy) {
    for (!(xxx = xx = 0) && (xLength = collision[yy].length) > 0; xx < xLength; ++xx) {
      xxx += DIMENSION;
      if ((tile = collision[yy][xx]) === 0) continue;
      this.context.fillStyle = "red";
      this.context.fillRect(
        x + ((xxx - DIMENSION) * resolution),
        y + (yyy * resolution),
        dim, dim
      );
      this.context.fill();
    };
    yyy += DIMENSION;
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