import {
  DIMENSION,
  TYPES
} from "../../cfg";

import math from "../../Math";

import { TextureCache, getSprite, createCanvasBuffer } from "../utils";

import Audio from "../Audio";
import Entity from "../Entity";

/**
 * Notification
 * @class Notification
 * @export
 */
export default class Notification extends Entity {

  /**
   * @param {Object} instance
   * @param {Object} obj
   * @constructor
   */
  constructor(instance, obj) {

    super(obj);

    /**
     * Instance
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Entity to follow
     * @type {Object}
     */
    this.follow = obj.follow || null;

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
     * Notification style
     * @type {String}
     */
    this.style = obj.style || "MapMessage";

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

    /**
     * Padding
     * @type {Number}
     */
    this.padding = 3;

    /**
     * zIndex
     * @type {Number}
     */
    this.zIndex = 9999;

    /**
     * Max lifetime
     * @type {Number}
     */
    this.maxLifeTime = 3e3 + Date.now();

    /**
     * Lifetime
     * @type {Number}
     */
    this.lifeTime = Date.now() + (60 * (this.msg.length * 4));

    /** Follow */
    if (this.follow !== null) {
      this.position = this.follow.position;
    }

    /** Fade notification */
    if (obj.fade === true) {
      this.opacity = .0;
      this.fadeIn(2);
    } else {
      this.opacity = 1.0;
    }

    /** Play notification sound */
    if (obj.sound === true) {
      this.playSound();
    }

    /** Dont let notifications stay too long */
    if (this.lifeTime > this.maxLifeTime) {
      this.lifeTime = this.maxLifeTime;
    }

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
   * Play notifcation sound
   */
  playSound() {

    let dist = this.instance.currentMap.distance(this.follow, this.instance.camera);

    Audio.playSound("notice", 75, dist.x, dist.y);

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

    if (this.style === "ChatBubble") {
      this.drawChatBubble();
    }
    else if (this.style === "MapMessage") {
      this.drawMapMessage();
    }
    else if (this.style === "MessageBox") {
      this.drawMessageBox();
    }

    return void 0;

  }

  /**
   * Draw a chat bubble
   */
  drawChatBubble() {

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

  }

}