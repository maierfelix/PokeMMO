/**
 * Cached textures
 * @type {Object}
 */
export let TextureCache = {}

let hashIndex = -1;
let hashes = [];

/**
 * Generate a unique hash
 * @export
 */
export function uHash() {

  var index = ++hashIndex;

  if (hashes.indexOf(index) > -1) return (this.uHash());

  hashes.push(index);

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

/**
 * @param {Number} width
 * @param {Number} height
 */
export function createCanvasBuffer(width, height) {

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  ctx.setImageSmoothing(false);

  canvas.width = width;
  canvas.height = height;

  return (ctx);

}

/**
 * @param {Object} img
 * @return {Object}
 */
export function imageToCanvas(img) {

  var ctx = createCanvasBuffer(
    img.width, img.height
  );

  ctx.drawImage(
    img,
    0, 0,
    img.width, img.height
  );

  return (ctx);

}

export function ajax(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error("Network error"));
    };
    req.send();
  });
}