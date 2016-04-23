import {
  OFFLINE_MODE
} from "../../../cfg";

/**
 * Change facing
 * @param {Number} dir
 */
export function changeFacing(dir) {

  if (this.STATES.LOCK === true || this.moving === true) return void 0;

  this.idleTime = 0;

  if (
    this.moving === false &&
    this.STATES.BUMPING === false
  ) {
    this.lastFacing = this.facing;
    this.facing = dir;
    if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
      this.instance.engine.connection.sendData(
        "Facing",
        [this.id, this.facing]
      );
    }
    this.frame = (this.frame + 3 + this.getFrameIndex()) % 4;
  }

  /** TODO: Avoid settimeout */
  setTimeout(this::function() {
    if (
      this.moving === false &&
      this.STATES.BUMPING === false &&
      this.STATES.JUMPING === false
    ) {
      this.resetFrame();
    }
  }, 30);

}