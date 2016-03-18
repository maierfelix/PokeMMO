import Element from "../../Engine/UI/Element";

/**
 * Label
 * @class Label
 * @export
 */
export class Label extends Element {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {

    super(obj);

    /**
     * Background color
     * @type {String}
     */
    this.backgroundColor = obj.backgroundColor;

    /**
     * Text color
     * @type {String}
     */
    this.color = obj.color || "#fff";

    /**
     * Z Index
     * @type {Number}
     */
    this.zIndex = Number(obj.zIndex) || 0;

    /**
     * Text
     * @type {String}
     */
    this.text = obj.text || "undefined";

    /**
     * Font size
     * @type {Number}
     */
    this.fontSize = 25;

  }

  /**
   * Render
   */
  render() {

    this.drawContext.globalAlpha = this.opacity;

    this.drawContext.font = this.fontSize + "px AdvoCut";
    this.drawContext.strokeStyle = "white";
    this.drawContext.lineWidth = 1.0;

    this.drawContext.fillStyle = "white";
    this.drawContext.fillText(this.text, this.x, this.y);

    this.drawContext.globalAlpha = 1.0;

  }

}