/**
 * Logic loop
 */
export function logic() {

  let ii = 0;
  let length = 0;

  let entity = null;
  let entities = this.currentMap.entities;

  length = entities.length;

  for (; ii < length; ++ii) {
    entity = entities[ii];
    entity.idleTime++;
    entity.renderable = this.updateEntity(entity);
    if (entity.opacity < 0) {
      this.removeEntity(entity);
      --length;
      --ii;
      continue;
    }
  };

}

/**
 * Orbit animation
 * @param  {Object} entity
 */
export function orbit(entity) {

  entity.orbitAngle += (entity.velocity * 2) * Math.PI / 180;

  let target = entity.orbitTarget;

  let radius = ((target.size.x * target.scale + target.size.y * target.scale) / DIMENSION) * 2;

  let xPadding = radius - (DIMENSION / 2);
  let yPadding = radius - (DIMENSION / 2);

  xPadding += target.xMargin;
  yPadding += target.yMargin / 2;

  entity.x = (target.position.x + xPadding) + radius * Math.cos(entity.orbitAngle);
  entity.y = (target.position.y + yPadding) + radius * Math.sin(entity.orbitAngle);

  /** Stop the orbit on a dimension friendly position */
  if (
    entity.stopOrbit === true &&
    (entity.x << 0) % 8 === 0 &&
    (entity.y << 0) % 8 === 0
  ) {
    entity.x = math.roundTo(entity.x, DIMENSION);
    entity.y = math.roundTo(entity.y, DIMENSION);
    entity.orbitAround(null);
    entity.stopOrbit = false;
  }

  /*if (entity.orbitAngle > 360) {
    entity.orbitAngle = 0;
  }*/

  return void 0;

}

/**
 * Update entity
 * @param  {Object} entity
 * @return {Boolean} renderable
 */
export function updateEntity(entity) {

  if (entity.lifeTime > 0) {
    if (this.renderer.now >= entity.lifeTime) {
      entity.lifeTime = 0;
      entity.fadeOut(1, true);
    }
  }

  entity.animate();

  if (entity.orbit === true) {
    this.orbit(entity);
  }

  if (this.camera.isInView(
    entity.position.x + entity.xMargin, entity.position.y + entity.yMargin,
    entity.size.x * entity.scale, ((entity.size.y * 2) * entity.scale) + entity.shadowY
  ) === false) {
    return (false);
  }

  if (this.isRenderable(entity) === false) {
    return (false);
  }

  return (true);

}

/**
 * Entity is renderable
 * @param  {Object}  entity
 * @return {Boolean} renderable
 */
export function isRenderable(entity) {
  return (
    entity.texture !== null &&
    entity.opacity !== .0
  );
}