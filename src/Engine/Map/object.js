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

    this.frames = [0, 0];

    this.facing = 0;

    this.opacity = 1.0;

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

  animate() {
    return void 0;
  }

}