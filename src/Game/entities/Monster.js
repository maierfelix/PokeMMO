import Entity from "../../Engine/Entity";

export class Monster extends Entity {

  /**
   * @constructor
   * @param {Object} obj
   */
  constructor(obj) {
    super(obj);
    this.init(obj)
  }

  init() { console.log(this); }

}