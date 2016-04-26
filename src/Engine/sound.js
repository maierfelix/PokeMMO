import {
  DIMENSION,
  VOLUME,
  BGS
} from "../cfg";

import math from "../Math";

import Audio from "./Audio";

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
    entity.noise._audioNode[0].gain.value = 0;
  }

  radius = (entity.noiseRadius - DIMENSION) || DIMENSION;
  cx = radius / 2;
  cy = radius / 2;
  dx = Math.floor(dist.x * 1e2) + cx;
  dy = Math.floor(dist.y * 1e2) + cy;

  if (entity.STATES.NOISE === false) {
    entity.noiseSrcPath = entity.noise;
    entity.noise = Audio.playNoise(entity.noise, VOLUME.ENTITY_NOISE, dist.x, dist.y);
    entity.STATES.NOISE = true;
  }

  if (math.pointIntersectsCircle(dx, dy, cx, cy, radius) === true) {
    if (entity.noise.isInView === false) {
      let gainNode = entity.noise._audioNode[0];
      entity.noise.fadingIn = true;
      let start = gainNode.context.currentTime;
      let end = start + 1;
      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, start);
      gainNode.gain.linearRampToValueAtTime(VOLUME.ENTITY_NOISE / 1e2, end);
      entity.noise.isInView = true;
    }
  } else {
    if (entity.noise.isInView === true) {
      let gainNode = entity.noise._audioNode[0];
      entity.noise.fadingOut = true;
      let start = gainNode.context.currentTime;
      let end = start + 1;
      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, start);
      gainNode.gain.linearRampToValueAtTime(.0, end);
      entity.noise.isInView = false;
    }
  }

  entity.noise.pos3d(dist.x, dist.y, 0);

  return void 0;

}