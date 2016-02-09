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
   * Play a sound with default settings
   * @param {String} name
   */
  playSoundDefault(name) {
    let sound = new Sound({
      id: "sfx-1",
      src: `assets/audio/${name}.ogg`,
      loop: false,
      volume: 1,
      tag: "sfx",
      channel: 2,
      useWebAudio: true
    });
    sound.load();
    sound.onLoad = function(){
      this.play();
    }
  }

  /**
   * Play a sound with custom volume
   * @param {String} name
   * @param {Number} value
   */
  playSound(name, value) {
    let sound = new Sound({
      id: "sfx-1",
      src: `assets/audio/${name}.ogg`,
      loop: false,
      volume: value / 1E2,
      tag: "sfx",
      channel: 2,
      useWebAudio: true
    });
    sound.load();
    sound.onLoad = function(){
      this.play();
    }
  }

}

export default Audio = new Audio();