import {
  OFFLINE_MODE,
  GRAVITY
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

export function jump() {

  if (
    this.STATES.JUMPING === true ||
    this.STATES.LOCK === true
  ) return void 0;

  this.animations.push({
    type: "jump"
  });

}

/**
 * Jump
 */
export function jumpAnimation() {

  if (this.jumpable === false) return void 0;

  this.refreshState();

  if (this.onJump !== null) {
    Maps[this.map].triggerEvent(this, this, "onJump");
  }

  if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
    this.instance.engine.connection.sendData(
      "Jumping",
      [this.id]
    );
  }

  this.idleTime = 0;

  this.jumping();

}

/**
 * Jumping
 */
export function jumping() {

  if (this.frame === 0 && this.z === 0) {
    this.playStateSound();
  }

  this.frame = 3;

  this.z += this.gravity;

  this.refreshState();

  if (this.z < 0) {
    this.gravity += .1;
    this.shadow.position.set(-(this.z / 2), this.shadowY - (this.z));
    this.shadow.scale.set(this.z, this.z);
  } else {
    this.gravity = GRAVITY;
    this.z = 0;
    this.resetFrame();
    this.refreshState();
    this.shadow.position.set(this.shadowX, this.shadowY);
    this.shadow.scale.set(0, 0);
    this.animations.shift();
  }

}