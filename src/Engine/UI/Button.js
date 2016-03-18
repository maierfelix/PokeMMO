import Element from "../../Engine/UI/Element";

/**
 * Button
 * @class Button
 * @export
 */
export class Button extends Element {

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

    this.width = obj.width || 250;
    this.height = obj.height || 75;

    this.render();

  }

  /**
   * Update position
   */
  updatePosition() {

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    this.x -= this.width / 2;
    this.y -= this.height / 2;

  }

  /**
   * Render
   */
  render() {

    this.updatePosition();

    let width = this.buffer.canvas.width  = this.width;
    let height = this.buffer.canvas.height = this.height;

    this.buffer.fillStyle = this.backgroundColor;
    this.buffer.fillRect(
      0, 0,
      this.width, this.height
    );

    this.drawContext.drawImage(
      this.buffer.canvas,
      0, 0,
      width, height,
      this.x, this.y,
      width, height
    );

  }

}