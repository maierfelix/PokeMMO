import { TextureCache } from "../Engine/utils";
import { DIMENSION } from "../cfg";

/**
 * Render debug scene
 */
export function renderDebugScene() {

  this.drawPixelText(
    "Width: " + this.width + " Height: " + this.height,
    15, 30,
    20, 1.5
  );

  this.drawPixelText(
    "Dimension: " + DIMENSION,
    15, 60,
    20, 1.5
  );

  this.drawPixelText(
    "Camera: " + this.camera.viewport.x + "x" + this.camera.viewport.y,
    15, 90,
    20, 1.5
  );

  this.drawPixelText(
    "X: " + this.camera.position.x + " Y: " + this.camera.position.y,
    15, 120,
    20, 1.5
  );

  this.drawPixelText(
    "Delta: " + this.delta * 1E3 + "ms",
    15, 150,
    20, 1.5
  );

  this.drawPixelText(
    "Scale: " + this.camera.scale.toFixed(6),
    15, 180,
    20, 1.5
  );

  this.drawPixelText(
    "Entities: " + this.instance.entities.length,
    15, 210,
    20, 1.5
  );

  var ii = 0;
  var kk = 0;

  var length = 0;

  var entities = this.instance.entities;

  length = entities.length;

  for (; ii < length; ++ii) {
    if (this.instance.isInView(entities[ii]) && ++kk) {}
  };

  this.drawPixelText(
    "Entities in view: " + kk,
    15, 240,
    20, 1.5
  );

  this.drawPixelText(
    "Textures: " + Object.keys(TextureCache).length,
    15, 270,
    20, 1.5
  );

  if (this.instance.localEntity !== null) {
    this.drawPixelText(
      "Local X: " + this.instance.localEntity.x + " Y: " + this.instance.localEntity.y,
      15, 300,
      20, 1.5
    );
  }

}