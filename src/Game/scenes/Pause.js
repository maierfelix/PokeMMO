import {
  DIMENSION
} from "../../cfg";

import Element from "../../Engine/UI/Element";

import * as elements from "../../Engine/UI";

import Input from "../../Engine/Input";

export class Pause extends Element {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    super({});

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Active state
     * @type {Boolean}
     */
    this.active = false;

    /**
     * Background color
     * @type {String}
     */
    this.backgroundColor = "#1f1f1f";

    /**
     * Text color
     * @type {String}
     */
    this.color = "#fff";

    /**
     * Selected menu item
     * @type {Object}
     */
    this.selectedItem = null;

    var input = {
      keys: [
      {
        name: "↑",
        spam: false,
        fire: function() {
          if (this.active) {
            this.navigate(-1);
          }
        }
      },
      {
        name: "↓",
        spam: false,
        fire: function() {
          if (this.active) {
            this.navigate(1);
          }
        }
      }
    ]};

    this.input = new Input(input, this);

    this.x = this.y = 0;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.children.push(
      new elements.Label({
        zIndex: 2,
        text: "Game Paused"
      }),
      new elements.Label({
        zIndex: 2,
        text: "Editor"
      }),
      new elements.Label({
        zIndex: 2,
        text: "Exit"
      })
    );

    this.children.push(
      new elements.Background({})
    );

    this.selectedItem = this.children[1];

    this.hide();

  }

  /**
   * Render
   */
  render() {}

  /**
   * Navigate
   * @param {Number} dir
   */
  navigate(dir) {

    let index = this.getChildrenIndexById(this.selectedItem.id);

    let length = this.children.length;

    if (index + dir >= length) {
      this.selectedItem = this.children[2];
    } else if (index + dir <= 1) {
      this.selectedItem = this.children[length - 1];
    } else {
      this.selectedItem = this.children[index + dir];
    }

    this.refresh();

  }

  /**
   * Update positions
   */
  updatePositions() {

    let element = null;

    let x = this.width / 2;
    let y = this.height / 2;

    let width  = 0;
    let height = 0;

    for (let key in this.children) {

      element = this.children[key];

      if (element.id === this.id) continue;
      if (!(element instanceof elements.Label)) continue;

      if (element.id === this.selectedItem.id) {
        element.opacity = 1.0;
      } else {
        element.opacity = .25;
      }

      width = element.drawContext.measureText(element.text).width;
      height = element.fontSize << 0;

      element.x = x - width;
      element.y = y - height;

      y += element.fontSize * 2;

    };

  }

  /**
   * Refresh
   */
  refresh() {
    this.hide();
    this.show();
  }

  /**
   * Show
   */
  show() {
    this.active = true;
    this.instance.activeScene = true;
    this.updatePositions();
    this.render();
    this.draw();
  }

  /**
   * Hide
   */
  hide() {
    this.active = false;
    this.instance.activeScene = false;
    this.drawContext.canvas.width = this.width;
  }

}