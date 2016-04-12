import {
  DIMENSION,
  TYPES
} from "../../cfg";

import math from "../../Math";

import { TextureCache, getSprite, createCanvasBuffer } from "../utils";

import Entity from "../Entity";

/**
 * Notification
 * @class Notification
 * @export
 */
export default class Notification extends Entity {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    /**
     * Entity to follow
     * @type {Object}
     */
    this.follow = obj.follow || null;

    if (this.follow !== null) {
      this.position = this.follow.position;
    }

    /**
     * Has shadow
     * @type {Boolean}
     */
    this.hasShadow = false;

    /**
     * Attach type
     * @type {Number}
     */
    this.type = TYPES.Notification;

    /**
     * Message
     * @type {String}
     */
    this.msg = obj.msg || "undefined";

    /**
     * Top left texture
     * @type {String}
     */
    this.topLeft = "assets/img/chat/tleft.png";

    /**
     * Top right texture
     * @type {String}
     */
    this.topRight = "assets/img/chat/tright.png";

    /**
     * Bottom left texture
     * @type {String}
     */
    this.bottomLeft = "assets/img/chat/bleft.png";

    /**
     * Bottom right texture
     * @type {String}
     */
    this.bottomRight = "assets/img/chat/bright.png";

    /**
     * Pointer texture
     * @type {String}
     */
    this.pointer = "assets/img/chat/point.png";

    /**
     * Fill texture
     * @type {String}
     */
    this.fill = "assets/img/chat/fill.png";

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    this.sprite = null;

    this.padding = 3;

    this.msgMaxWidth = 100;

    this.heightOfMessage = 20;

    this.loadTexture();

  }

  /**
   * Get frame index
   * @return {Number}
   */
  getFrameIndex() {
    return (0);
  }

  /**
   * Load texture
   */
  loadTexture() {

    var self = this;

    function load(sprite, resolve) {
      getSprite(
        self[sprite], self.width, self.height, self::function(texture) {
        this[sprite] = texture;
        resolve();
      });
    }

    load("topLeft", () =>
      load("topRight", () =>
        load("bottomLeft", () =>
          load("bottomRight", () =>
            load("pointer", () =>
              load("fill", this::function() {
                this.draw();
              })
            )
          )
        )
      )
    )

  }

  /**
   * Draw
   */
  draw() {

    this.texture = createCanvasBuffer(this.width, this.height + this.pointer.height);

    let ctx = this.texture;

    let cornerWidth = this.topLeft.width;
    let cornerHeight = this.topLeft.height;

    ctx.drawImage(
      this.fill.texture.canvas,
      this.padding, this.padding,
      this.width - this.padding * 2, this.height - this.padding * 2
    );

    ctx.drawImage(
      this.fill.texture.canvas,
      0, this.padding,
      this.padding, this.height - this.padding * 2
    );
    ctx.drawImage(
      this.fill.texture.canvas,
      this.width - this.padding, this.padding,
      this.padding, this.height - this.padding * 2
    );

    ctx.drawImage(
      this.fill.texture.canvas,
      this.padding, 0,
      this.width - this.padding * 2, this.padding
    );
    ctx.drawImage(
      this.fill.texture.canvas,
      this.padding, this.height - this.padding,
      this.width - this.padding * 2, this.padding
    );

    ctx.drawImage(
      this.topLeft.texture.canvas,
      0, 0
    );
    ctx.drawImage(
      this.topRight.texture.canvas,
      this.width - this.topRight.width, 0
    );
    ctx.drawImage(
      this.bottomLeft.texture.canvas,
      0, this.height - this.bottomLeft.height
    );
    ctx.drawImage(
      this.bottomRight.texture.canvas,
      this.width - this.topRight.width,
      this.height - this.bottomLeft.height
    );

    ctx.drawImage(
      this.pointer.texture.canvas,
      this.width / 2, this.height
    );

    let txt = createCanvasBuffer(this.width, this.height + this.pointer.height);

    txt.font = 20 + "px AdvoCut";
    txt.strokeStyle = "#000";
    txt.lineWidth = 2;
    txt.strokeText(this.msg, this.width / 2, (this.height + this.pointer.height) / 2);
    txt.fillStyle = "white";
    txt.fillText(this.msg, this.width / 2, (this.height + this.pointer.height) / 2);

    let resolution = .75;

    ctx.drawImage(
      txt.canvas,
      0, 0,
      (this.width * resolution) << 0, ((this.height + this.pointer.height) * resolution) << 0
    );

    return void 0;

  }

}