import Element from "../../Engine/UI/Element";

/**
 * Background
 * @class Background
 * @export
 */
export class Background extends Element {

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
    this.backgroundColor = obj.color || "#1f1f1f";

    /**
     * Text color
     * @type {String}
     */
    this.color = obj.color || "#fff";

    this.x = this.y = 0;

    /**
     * Z Index
     * @type {Number}
     */
    this.zIndex = Number(obj.zIndex) || 0;

    this.render();

  }

  /**
   * Render
   */
  render() {

    let width = this.buffer.canvas.width  = this.width = window.innerWidth;
    let height = this.buffer.canvas.height = this.height = window.innerHeight;

    this.buffer.globalAlpha = this.opacity;

    this.buffer.fillStyle = this.backgroundColor;
    this.buffer.fillRect(
      this.x, this.y,
      this.width, this.height
    );

    this.drawContext.drawImage(
      this.buffer.canvas,
      0, 0,
      width, height,
      0, 0,
      width, height
    );

  }

}