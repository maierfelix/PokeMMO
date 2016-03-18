/**
 * Audio
 * @class Audio
 * @export
 */
class Audio {

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Play a sound with custom volume
   * @param {String} name
   * @param {Number} vol
   * @param {Number} x
   * @param {Number} y
   */
  playSound(name, vol, x, y) {
    let path = `assets/audio/${name}.ogg`;
    var sound = new Howl({
      urls: [path],
      autoplay: true,
      loop: false,
      pos3d: [x, y, vol / 1e3]
    });
  }

}

export default Audio = new Audio();