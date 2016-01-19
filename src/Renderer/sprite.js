import Texture from "../Engine/Texture";
import { TextureCache } from "../Engine/utils";

/**
 * Load sprites
 * @param {Array}    sprites
 * @param {Function} resolve
 */
export function loadSprites(sprites, resolve) {

  var item = null;

  var ii = 0;
  var length = 0;

  length = sprites.length;

  for (; ii < length; ++ii) {
    ((ii) => {
      item = String(sprites[ii]);
      TextureCache[item] = new Texture(item, function() {
        sprites.shift();
        if (sprites.length <= 0) {
          resolve();
          return void 0;
        }
      });
    })(ii);
  };

  return void 0;

}