import { DIMENSION } from "../../cfg";

import Entity from "../Entity";

/**
 * MapEntity
 * @class MapEntity
 * @export
 */
export default class MapEntity extends Entity {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

    this.frames = [0, 0];

    this.facing = 0;

    this.opacity = obj.opacity === void 0 ? 1.0 : obj.opacity;

    this.scale = obj.scale === void 0 ? 1.0 : obj.scale;

    this.frame = 1;

    this.reversed = [0, 0];

    this.reverseShadow = [0, 0];

    return (this);

  }

  /**
   * Get frame index
   * @return {Number}
   */
  getFrameIndex() {
    return (0);
  }

}