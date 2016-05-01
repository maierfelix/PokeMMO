import {
  DIMENSION,
  TYPES,
  BGS
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
     * Z position
     * @type {Number}
     */
    this.z = 0;

    /**
     * Sprite frame
     * @type {Number}
     */
    this.sFrame = 0;

    /**
     * Absolute position
     * @type {Boolean}
     */
    this.absolute = obj.absolute || false;

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

    this.frames = [0, 0];

    this.frame = obj.frame === void 0 ? 1 : obj.frame;

    this.reversed = [0, 0];

    this.reverseShadow = [0, 0];

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

    if (BGS === false) return void 0;

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

    this.glTexture = window.game.engine.renderer.glRenderer.bufferTexture([this.texture]);

    return void 0;

  }

  /**
   * Draw a map message
   */
  drawMapMessage() {

    this.position = {
      x: DIMENSION,
      y: DIMENSION
    };

    let height = this.size.y;

    this.size = this.instance.size;

    this.size.y = height * 7.5;

    this.size.x = (this.instance.width * 2) - this.padding * 10;

    this.z = 0;

    this.texture = createCanvasBuffer(this.width, this.height + this.pointer.height);

    let ctx = this.texture;

    this.drawBox(ctx, this.width, this.height, this.padding);

    this.drawText(ctx, this.width, this.height, this.msg, 1.5);

  }

  /**
   * Draw a chat bubble
   */
  drawChatBubble() {

    this.texture = createCanvasBuffer(this.width, this.height + this.pointer.height);

    let ctx = this.texture;

    this.drawBox(ctx, this.width, this.height, this.padding);

    ctx.drawImage(
      this.pointer.texture.canvas,
      this.width / 2, this.height
    );

    this.drawText(ctx, this.width, this.height + this.pointer.height, this.msg, .75);

  }

  /**
   * Draw chat box
   * @param {Object} ctx
   * @param {Number} width
   * @param {Number} height
   * @param {Number} padding
   */
  drawBox(ctx, width, height, padding) {

    ctx.drawImage(
      this.fill.texture.canvas,
      padding, padding,
      width - padding * 2, height - padding * 2
    );

    ctx.drawImage(
      this.fill.texture.canvas,
      0, padding,
      padding, height - padding * 2
    );
    ctx.drawImage(
      this.fill.texture.canvas,
      width - padding, padding,
      padding, height - padding * 2
    );

    ctx.drawImage(
      this.fill.texture.canvas,
      padding, 0,
      width - padding * 2, padding
    );
    ctx.drawImage(
      this.fill.texture.canvas,
      padding, height - padding,
      width - padding * 2, padding
    );

    ctx.drawImage(
      this.topLeft.texture.canvas,
      0, 0
    );
    ctx.drawImage(
      this.topRight.texture.canvas,
      width - this.topRight.width, 0
    );
    ctx.drawImage(
      this.bottomLeft.texture.canvas,
      0, height - this.bottomLeft.height
    );
    ctx.drawImage(
      this.bottomRight.texture.canvas,
      width - this.topRight.width,
      height - this.bottomLeft.height
    );

  }

  /**
   * Draw a text
   * @param {Object} ctx
   * @param {Number} width
   * @param {Number} height
   * @param {String} msg
   * @param {Number} resolution
   */
  drawText(ctx, width, height, msg, resolution) {

    let txt = createCanvasBuffer(width, height);
    let margin = 0;

    txt.font = 25 + "px AdvoCut";
    txt.strokeStyle = "#000";
    txt.lineWidth = 2.75;
    txt.strokeText(msg, width / 4, height);
    txt.fillStyle = "white";
    txt.fillText(msg, width / 4, height);

    ctx.drawImage(
      txt.canvas,
      0, 0,
      (width * resolution) << 0, (height * resolution) << 0
    );

  }

}