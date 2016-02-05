import {
  DIMENSION,
  LEFT, RIGHT, UP, DOWN
} from "../../cfg";
import math from "../../Math";
import { uHash } from "../../Engine/utils";

/**
 * Shadow
 * @class Shadow
 * @export
 */
export default class Shadow {

  /**
   * @param {Object} parent
   * @constructor
   */
  constructor(parent) {

    /**
     * Unique id
     * @type {Number}
     */
    this.id = uHash();

    this.parent = parent;

  }

}