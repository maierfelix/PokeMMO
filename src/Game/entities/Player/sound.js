import {
  DIMENSION,
  BGS, VOLUME
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

import Audio from "../../../Engine/Audio";

/**
 * Play sound
 */
export function playStateSound() {

  if (BGS !== true) return void 0;

  let volume = this.isLocalPlayer === true ? VOLUME.NETWORK_PLAYER : VOLUME.LOCAL_PLAYER;

  let dist = Maps[this.map].distance(this, game.engine.camera);

  if (Math.abs(dist.x) + Math.abs(dist.y) >= 1.0) {
    dist.x *= 4;
    dist.y *= 4;
  }

  if (this.STATES.JUMPING === true && this.z === 0) {
    Audio.playSound("jump", volume, dist.x, dist.y);
  }

  /** Player is bumping */
  if (this.STATES.BUMPING === true) {
    Audio.playSound("bump", volume, dist.x, dist.y);
  /** Player is walking */
  } else {
    if (this.moving === true) {
      if (this.soundSteps >= DIMENSION * 2) {
        this.soundSteps = 0;
        if (this.STATES.RUNNING === true) {
          Audio.playSound("run_step", volume, dist.x, dist.y);
        } else {
          Audio.playSound("ground_step", volume, dist.x, dist.y);
        }
      }
    }
  }

}