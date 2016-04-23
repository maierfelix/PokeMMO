import {
  DIMENSION,
  VOLUME,
  BGS
} from "../cfg";

import math from "../Math";

import Audio from "./Audio";

/**
 * Update noisy entities
 */
export function updateSound() {

  let map = this.currentMap;

  if (
    map === null ||
    map.entityNoises.length <= 0
  ) return void 0;

  let entity = null;

  let ii = 0;
  let length = map.entityNoises.length;

  for (; ii < length; ++ii) {
    entity = map.entityNoises[ii];
    this.updateEntityNoise(entity, map.distance(entity, this.camera));
  };

  return void 0;

}

/**
 * Update entity noise
 * @param {Object} entity
 * @param {Object} distance
 */
export function updateEntityNoise(entity, dist) {

  let radius = 0;

  let cx = 0;
  let cy = 0;
  let dx = 0;
  let dy = 0;

  if (BGS === false) {
    dist.x = 99999;
    dist.y = 99999;
    radius = 0;
  }

  radius = (entity.noiseRadius - DIMENSION) || DIMENSION;
  cx = radius / 2;
  cy = radius / 2;
  dx = Math.floor(dist.x * 1e2) + cx;
  dy = Math.floor(dist.y * 1e2) + cy;

  if (entity.STATES.NOISE === false) {
    entity.noise = Audio.playNoise(entity.noise, VOLUME.ENTITY_NOISE, dist.x, dist.y);
    entity.STATES.NOISE = true;
  }

  if (math.pointIntersectsCircle(dx, dy, cx, cy, radius) === true) {
    if (entity.noise.isInView === false) {
      if (entity.noise.fadingOut === true) {
        entity.noise.volume(.0);
      }
      entity.noise.fadingIn = true;
      entity.noise.fadeIn(VOLUME.ENTITY_NOISE / 1e2, VOLUME.FADE_SPEED, () => entity.noise.fadingIn = false);
      entity.noise.isInView = true;
    }
  } else {
    if (entity.noise.isInView === true) {
      if (entity.noise.fadingIn === true) {
        entity.noise.volume(VOLUME.ENTITY_NOISE / 1e2);
      }
      entity.noise.fadingOut = true;
      entity.noise.fadeOut(.0, VOLUME.FADE_SPEED, () => entity.noise.fadingOut = false);
      entity.noise.isInView = false;
    }
  }

  entity.noise.pos3d(dist.x, dist.y, 0);

  return void 0;

}

/**
 * Recursive entity noise fading
 * @param {Number} volume
 */
export function fade(volume) {

  entity.noise.fade = () => {
    
  };

  entity.noise.volume(.0);

  this.fade();

}