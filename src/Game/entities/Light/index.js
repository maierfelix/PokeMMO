import {
  LEFT, RIGHT, UP, DOWN,
  OFFLINE_MODE,
  DIMENSION, GRAVITY
} from "../../../cfg";

import math from "../../../Math";

import {
  Maps
} from "../../../Engine/utils";

import MapEntity from "../../../Engine/Map/MapEntity";

export class Light extends MapEntity {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {

    super(obj);

    this.scale = .25;

    this.name = "light" + this.id;

    this.zIndex = 999999;

    this.isLight = true;

    this.lightSize = obj.lightSize === void 0 ? 512 : obj.lightSize;

    this.jumpable = false;

    this.hasShadow = false;

  }

}