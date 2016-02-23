import { TextureCache } from "../utils";
import {
  DIMENSION,
  GOD_MODE, EDIT_MODE,
  FREE_CAMERA
} from "../../cfg";

/**
 * Render debug scene
 */
export function renderDebugScene() {

  let color = '#313131';

  this.drawPixelText(
    `WIDTH: ${this.width} HEIGHT ${this.height}`,
    15, 30,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `DIMENSION: ${DIMENSION}`,
    15, 60,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `X: ${this.camera.x} Y: ${this.camera.y}`,
    15, 90,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `DELTA: ${this.delta * 1E3} ms`,
    15, 120,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `SCALE: ${this.camera.resolution.toFixed(6)}`,
    15, 150,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `ENTITIES: ${this.instance.currentMap.entities.length}`,
    15, 180,
    20, 1.5,
    color
  );

  var ii = 0;
  var kk = 0;

  var length = 0;

  var entities = this.instance.currentMap.entities;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (this.instance.camera.isInView(
      entities[ii].x, entities[ii].y,
      entities[ii].width, entities[ii].height,
    ) && ++kk) {}
  };

  this.drawPixelText(
    `ENTITIES IN VIEW: ${kk}`,
    15, 210,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `TEXTURES: ${Object.keys(TextureCache).length}`,
    15, 240,
    20, 1.5
  );

  if (this.instance.localEntity !== null) {
    this.drawPixelText(
      `LOCAL X: ${this.instance.localEntity.x} Y: ${this.instance.localEntity.y}`,
      15, 270,
      20, 1.5,
    color
    );
  }

  this.drawPixelText(
    `GOD MODE: ${GOD_MODE === true ? "enabled" : "disabled"}`,
    15, 300,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `FREE CAMERA: ${FREE_CAMERA === true ? "enabled" : "disabled"}`,
    15, 330,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `EDIT MODE: ${EDIT_MODE === true ? "enabled" : "disabled"}`,
    15, 360,
    20, 1.5,
    color
  );

}