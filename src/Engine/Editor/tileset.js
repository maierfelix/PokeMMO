import {
  FREE_CAMERA,
  Y_DEPTH_HACK,
  DIMENSION,
  MIN_SCALE, MAX_SCALE,
  PIXEL_SCALE
} from "../../cfg";

import { tileContainsImageData } from "../utils";

export function updateTilesetPosition() {
  if (this.instance.currentMap !== null) {
    let width = this.instance.currentMap.texture.width;
    let height = this.instance.currentMap.texture.height;
    this.tileset.x = DIMENSION + this.instance.width - width;
    this.tileset.y = 0;
  }
}

/**
 * @param {Number} x
 * @param {Number} y
 */
export function clickedInsideTileset(x, y) {
  let tileX = this.instance.editor.tileset.x;
  let tileY = this.instance.editor.tileset.y;
  let tileWidth = this.instance.currentMap.texture.width;
  let tileHeight = this.instance.currentMap.texture.height;
  return (
    x >= tileX && x <= tileX + tileWidth &&
    y >= tileY && y <= tileY + tileHeight
  );
}

/**
 * @param {Number} x
 * @param {Number} y
 */
export function selectTile(x, y) {

  console.log(x, y);

}