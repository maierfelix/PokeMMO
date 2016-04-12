/**
 * Audio
 * @class Audio
 * @export
 */
class Audio {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Audio res path
     * @type {String}
     */
    this.path = "assets/audio/";

  }

  /**
   * Play a sound with custom volume
   * @param {String} name
   * @param {Number} vol
   * @param {Number} x
   * @param {Number} y
   */
  playSound(name, vol, x, y) {
    let path = this.path + `${name}.ogg`;
    var sound = new Howl({
      urls: [path],
      autoplay: true,
      loop: false,
      pos3d: [x, y, vol / 1e3]
    });
  }

  /**
   * Play a song
   * @param {String} name
   * @param {Number} vol
   */
  playSong(name, vol) {
    let path = this.path + `${name}.ogg`;
    var song = new Howl({
      urls: [path],
      autoplay: true,
      loop: true,
      volume: vol / 1e2
    });
  }

}

export default Audio = new Audio();