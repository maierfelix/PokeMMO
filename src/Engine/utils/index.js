import Texture from "../Texture";

let rx = {
  path: /[^\\/]+$/
};

/**
 * Cached textures
 * @type {Object}
 */
export let TextureCache = {};

let hashIndex = -1;
let hashes = [];

/**
 * Parsed maps
 * @type {Object}
 */
export let Maps = {};

/**
 * Check if webgl is supported
 * @return {Boolean}
 */
export function supportWGL() { 

  let canvas = null;

  try {
    canvas = document.createElement("canvas");
    if (WebGLRenderingContext !== void 0) {
      return (!!getWGLContext(canvas));
    }
   } catch(e) {
    return (false);
  };

  return (false);

}

/**
 * Get local host
 * @return {String}
 */
export function getLocalHost() {
  if (typeof document === "undefined") return void 0;
  return (
    document.location.host.replace(/:.*/, "")
  );
}

/**
 * Get wgl context of a canvas
 * @return {Object}
 */
export function getWGLContext(canvas) {
  let options = {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: false
  };
  return (
    canvas.getContext("webgl", options) ||
    canvas.getContext("experimental-webgl", options)
  );
}

/**
 * Get a sprite
 * @param {String}   sprite
 * @param {Number}   width
 * @param {Number}   height
 * @param {Function} resolve
 */
export function getSprite(sprite, width, height, resolve) {

  if (TextureCache[sprite]) {
    resolve(TextureCache[sprite]);
    return void 0;
  }

  new Texture(sprite, width, height, function(instance) {
    resolve(TextureCache[sprite] = instance);
  });

  return void 0;

}

/**
 * Generate a unique hash
 * @export
 */
export function uHash() {

  let index = ++hashIndex;

  if (hashes.indexOf(index) > -1) return (this.uHash());

  hashes.push(index);

  return (index);

}

/**
 * Get path without file ext
 * @param  {String} path
 * @return {String}
 */
export function getPath(path) {
  return (
    path.replace(rx.path.exec(path)[0], "")
  );
}

/**
 * @param {Object} cls
 * @param {Object} prot
 * @export
 */
export function inherit(cls, prot) {

  let key = null;

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

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  ctx.setImageSmoothing(false);

  canvas.width = width;
  canvas.height = height;

  return (ctx);

}

/**
 * @param  {Object} img
 * @return {Object}
 */
export function imageToCanvas(img) {

  let ctx = createCanvasBuffer(
    img.width, img.height
  );

  ctx.drawImage(
    img,
    0, 0,
    img.width, img.height
  );

  return (ctx);

}

/**
 * @param  {Object} canvas
 * @return {Object}
 */
export function canvasToImage(canvas) {

  let image = new Image();

  image.src = canvas.toDataURL("image/png");

  return (image);

}

/**
 * Check if a tile contains any image data
 * @param {Object} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Boolean}
 */
export function tileContainsImageData(ctx, x, y, width, height) {

  let ii = 0;
  let length = 0;

  let data = ctx.getImageData(x * 2, y * 2, width * 2, height * 2).data;

  length = data.length;

  for (; ii < length; ii += 4) {
    if (data[ii] > 0)     return (true);
    if (data[ii + 1] > 0) return (true);
    if (data[ii + 2] > 0) return (true);
    if (data[ii + 3] > 0) return (true);
  };

  return (false);

}

/**
 * Get current time
 * @return {Object}
 */
export function getTime() {

  let date = new Date();

  return ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

}

/**
 * Ajax
 * @param {String} url
 */
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