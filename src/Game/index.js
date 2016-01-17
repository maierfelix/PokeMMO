"use strict";

let __dirname = "./src/";

import {
  ajax as $GET,
  TextureCache
} from "../Engine/utils";

/*$GET(__dirname + "Math.js").then(function() {
  console.log(1);
});*/

import Wheel from "../libs/wheel";

import Engine from "../Engine";
import Texture from "../Engine/Texture";
import Renderer from "../Renderer";

/**
 * Game
 * @class Game
 * @export
 */
export default class Game {

  /**
   * @constructor
   */
  constructor() {

    this.node = document.querySelector("#main");

    this.engine = new Engine(this.node);

    this.renderer = new Renderer(this.engine);

    this.renderer.dimension = 16;
    this.renderer.lightning = true;
    this.renderer.shadowCasting = true;
    this.renderer.imageSmoothing = false;

    this.addListeners();
    this.addLayers();
    this.loadSprites(e => this.addEntities);
    this.renderer.render();

  }

  /**
   * Add event listeners
   */
  addListeners() {

    window.addEventListener('resize', e => this.renderer.resize(), false);

    Wheel.addWheelListener(this.node, function(e) {
      this.engine.scale += e.deltaY > 0 ? -.1 : .1;
    }.bind(this));

  }

  /**
   * Add layers
   */
  addLayers() {

    this.engine.addLayer({
      name: "Collisions",
      zIndex: 0
    });

    this.engine.addLayer({
      name: "Background",
      zIndex: 1
    });

    this.engine.addLayer({
      name: "Entities",
      zIndex: 2,
      zShadow: 1,
      shadowCast: true
    });

    this.engine.addLayer({
      name: "Foreground",
      zIndex: 3,
      zShadow: 2,
      shadowCast: true
    });

    this.engine.addLayer({
      name: "Sky",
      zIndex: 4,
      zShadow: 3,
      shadowCast: true
    });

  }

  /**
   * Load sprites
   * @param {Function} resolve
   */
  loadSprites(resolve) {

    var sprite1 = null;
    var sprite2 = null;

    sprite1 = new Texture("assets/0.png", function() {
      sprite2 = new Texture("assets/200.png", resolve);
    });

  }

  /**
   * Add entities
   */
  addEntities() {

    this.engine.addEntity({ zIndex: 1, texture: TextureCache["assets/0.png"] });
    this.engine.addEntity({ zIndex: 2, texture: TextureCache["assets/0.png"] });
    this.engine.addEntity({ zIndex: 2, texture: TextureCache["assets/0.png"] });
    this.engine.addEntity({ zIndex: 2, texture: TextureCache["assets/0.png"] });
    this.engine.addEntity({ zIndex: 2, texture: TextureCache["assets/200.png"] });
    this.engine.addEntity({ zIndex: 4, texture: TextureCache["assets/200.png"] });
    this.engine.addEntity({ zIndex: 4, texture: TextureCache["assets/200.png"] });
    this.engine.addEntity({ zIndex: 5, texture: TextureCache["assets/200.png"] });

  }

}

let game = new Game();