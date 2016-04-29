import { TextureCache } from "../utils";
import {
  DIMENSION,
  GOD_MODE, EDIT_MODE,
  FREE_CAMERA,
  SHADOW_Y
} from "../../cfg";

/**
 * Render debug scene
 */
export function renderDebugScene() {

  let color = '#313131';

  let get = (str) => this.instance.getUpperCaseString(str);

  this.drawPixelText(
    `${get("Width")}: ${this.width} ${get("Height")}: ${this.height}`,
    15, 30,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("Dimension")}: ${DIMENSION}`,
    15, 60,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("X")}: ${this.camera.x.toFixed(2)} ${get("Y")}: ${this.camera.y.toFixed(2)}`,
    15, 90,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("Delta")}: ${this.delta * 1E3} ${get("MS")}`,
    15, 120,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("Scale")}: ${this.camera.resolution.toFixed(6)}`,
    15, 150,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("Entities")}: ${this.instance.currentMap.entities.length}`,
    15, 180,
    20, 1.5,
    color
  );

  let ii = 0;
  let kk = 0;

  let length = 0;

  let entities = this.instance.currentMap.entities;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (this.instance.camera.isInView(
      entities[ii].position.x, entities[ii].position.y,
      entities[ii].size.x, (entities[ii].size.y * 2) + entities[ii].shadowY
    ) && ++kk) {}
  };

  this.drawPixelText(
    `${get("EntitiesInView")}: ${kk}`,
    15, 210,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("Textures")}: ${Object.keys(TextureCache).length}`,
    15, 240,
    20, 1.5
  );

  if (this.instance.localEntity !== null) {
    this.drawPixelText(
      `${get("Local")} ${get("X")}: ${this.instance.localEntity.x} ${get("Y")}: ${this.instance.localEntity.y.toFixed(2)} ${get("Local")} Z: ${-this.instance.localEntity.z.toFixed(4)}`,
      15, 270,
      20, 1.5,
      color
    );
  }

  this.drawPixelText(
    `${get("CommandStack")}: ${this.instance.editor.commander.position + 1} | ${this.instance.editor.commander.stack.length}`,
    15, 300,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("GodMode")}: ${GOD_MODE === true ? get("Enabled") : get("Disabled")}`,
    15, 330,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("FreeCamera")}: ${FREE_CAMERA === true ? get("Enabled") : get("Disabled")}`,
    15, 360,
    20, 1.5,
    color
  );

  this.drawPixelText(
    `${get("EditMode")}: ${EDIT_MODE === true ? get("Enabled") : get("Disabled")}`,
    15, 390,
    20, 1.5,
    color
  );

}