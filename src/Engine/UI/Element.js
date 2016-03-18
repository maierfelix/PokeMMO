import DisplayObject from "../DisplayObject";

import {
  createCanvasBuffer
} from "../utils";

/**
 * Element
 * @class Element
 * @export
 */
export default class Element extends DisplayObject {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {

    super(null);

    /**
     * X
     * @type {Number}
     */
    this.x = Number(obj.x) || 0;

    /**
     * Y
     * @type {Number}
     */
    this.y = Number(obj.y) || 0;

    /**
     * Width
     * @type {Number}
     */
    this.width = Number(obj.width) || 250;

    /**
     * Height
     * @type {Number}
     */
    this.height = Number(obj.height) || 75;

    /**
     * Scale factor
     * @type {Number}
     */
    this.scale = 1.0;

    /**
     * Opacity
     * @type {Number}
     */
    this.opacity = obj.opacity || 1.0;

    /**
     * Z index
     * @type {Number}
     */
    this.zIndex = obj.zIndex || 0;

    /**
     * Child nodes
     * @type {Array}
     */
    this.children = [];

    /**
     * Node
     * @type {Object}
     */
    this.node = document.querySelector("#ui");

    /**
     * Main drawing context
     * @type {Object}
     */
    this.drawContext = this.node.getContext("2d");

    /**
     * 2d buffer
     * @type {Object}
     */
    this.buffer = createCanvasBuffer(this.width, this.height);

    /**
     * Resolution
     * @type {Number}
     * @getter
     * @setter
     */
    Object.defineProperty(this, "resolution", {
      get: function() {
        return (this.scale);
      },
      set: function(value) {
        this.scale = value;
        this.render();
      }
    });

    this.children.push(this);

    this.render();

  }

  /**
   * Get children index by id
   * @param  {Number} id
   * @return {Number} index
   */
  getChildrenIndexById(id) {

    let ii = 0;
    let length = 0;

    length = this.children.length;

    for (; ii < length; ++ii) {
      if (this.children[ii].id === id) return (ii);
    };

    return (-1);

  }

  /**
   * @param {Array} array
   */
  depthSort(array) {

    let ii = 0;
    let jj = 0;

    let key = null;

    let length = array.length;

    for (; ii < length; ++ii) {
      jj = ii;
      key = array[jj];
      for (; jj > 0 && array[jj - 1].zIndex > key.zIndex; --jj) {
        array[jj] = array[jj - 1];
      };
      array[jj] = key;
    };

    return void 0;

  }

  /**
   * Render
   */
  render() {}

  /**
   * Sort attached children
   */
  sort() {
    this.depthSort(this.children);
  }

  /**
   * Draw
   */
  draw() {

    let ii = 0;
    let length = 0;

    length = this.children.length;

    this.sort();

    for (; ii < length; ++ii) {
      this.children[ii].render();
      if (this.children[ii].id === this.id) continue;
      this.children[ii].draw();
    };

    return void 0;

  }

}