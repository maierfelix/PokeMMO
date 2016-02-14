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
    this.player = new window.Sound();
    this.sounds = [];
    this.file = {
      name: null,
      volume: 0,
      x: 0,
      y: 0
    };
    this.player.onloadcomplete = this::this.onLoadComplete;
  }

  onLoadComplete() {
    this.sounds.push(
      this.player.create(this.file.name)
    );
    let sound = this.sounds[this.sounds.length - 1];
    this.player.setX(sound, this.file.x * 1e2);
    this.player.setY(sound, this.file.y * 1e2);
    this.player.setZ(sound, this.file.volume * 1e1);
    this.player.play(sound, false);
  }

  /**
   * Play a sound with default settings
   * @param {String} name
   */
  playSoundDefault(name) {
    console.log(name);
  }

  /**
   * Play a sound with custom volume
   * @param {String} name
   * @param {Number} vol
   * @param {Number} x
   * @param {Number} y
   */
  playSound(name, vol, x, y) {
    let path = `assets/audio/${name}.ogg`;
    this.file.name = path;
    this.file.volume = vol;
    this.file.x = x;
    this.file.y = y;
    this.player.load(path);
  }

}

export default Audio = new Audio();