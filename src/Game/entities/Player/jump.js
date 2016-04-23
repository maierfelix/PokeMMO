import {
  OFFLINE_MODE,
  GRAVITY
} from "../../../cfg";

import {
  Maps
} from "../../../Engine/utils";

/**
 * Jump
 */
export function jump() {

  if (this.jumpable === false) return void 0;

  this.refreshState();

  if (
    this.STATES.JUMPING === true ||
    this.STATES.LOCK === true
  ) return void 0;

  this.STATES.JUMPING = true;

  if (this.onJump !== null) {
    Maps[this.map].triggerEvent(this, this, "onJump");
  }

  this.jumping();

  if (this.isLocalPlayer === true && OFFLINE_MODE === false) {
    this.instance.engine.connection.sendData(
      "Jumping",
      [this.id]
    );
  }

  this.idleTime = 0;

}

/**
 * Jumping
 */
export function jumping() {

  this.frame = 3;

  if (this.z === 0) {
    this.playStateSound();
  }

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

    if (this.isLocalPlayer === true) {
      let ii = 0;
      for (let entity of game.engine.currentMap.entities) {
        ++ii;
        if (entity.id === this.id) continue;
        setTimeout(function() {
          entity.jump();
        }, ii * 25);
      };
    }

  }

}