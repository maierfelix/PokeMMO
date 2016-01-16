/**
 * Generate a unique hash
 * @param {Number} index
 * @export
 */
export function uHash(index) {

  index = index === 0 ? (Math.random() * 1E7) << 0 : index;

  if (this.hashes.indexOf(index) > -1) {
    return (this.uHash((Math.random() * 1E7) << 0));
  }

  this.hashes.push(index);

  return (index);

}

/**
 * @param {Object} cls
 * @param {Object} prot
 * @export
 */
export function join(cls, prot) {

  var key = null;

  for (key in prot) {
    if (prot[key] instanceof Function) {
      cls.prototype[key] = prot[key];
    }
  };

}