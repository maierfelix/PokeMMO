"use strict";

import math from "../Math";

import {
  __dirname,
  MIN_SCALE, MAX_SCALE,
  DIMENSION
} from "../cfg";

import {
  ajax as $GET,
  TextureCache
} from "../Engine/utils";

import Engine from "../Engine";
import Input from "../Engine/Input";
import Renderer from "../Renderer";

import * as Events from "./events.js";
import * as entities from "./entities";

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

    this.entities = entities;

    this.input = new Input(Events, this);

    this.engine = new Engine(this.node);

    this.engine.sceneWidth = 256;
    this.engine.sceneHeight = 128;

    this.renderer = new Renderer(this.engine);

    this.renderer.dimension = DIMENSION;
    this.renderer.lightning = true;
    this.renderer.shadowCasting = true;
    this.renderer.imageSmoothing = false;
    this.renderer.render();

    this.addListeners();
    this.addLayers();
    this.addEntities();

    this.engine.camera.scale = MIN_SCALE;

  }

  /**
   * Add event listeners
   */
  addListeners() {

    window.addEventListener('resize', e => this.renderer.resize(), false);

  }

  /**
   * Zoom
   * @param {Object} e
   */
  zoom(e) {

    var camera = this.engine.camera;
    var amount = (e.deltaY ? -e.deltaY : e.deltaY);

    amount = amount / 2 / (math.distance(0, 0, this.renderer.width, this.renderer.height) / Math.PI) * math.zoomScale(camera.scale);

    camera.scale += amount / 2;

    if (camera.scale < MIN_SCALE) camera.scale = MIN_SCALE;
    if (camera.scale > MAX_SCALE) camera.scale = MAX_SCALE;

    if (this.engine.dragging) {
      this.engine.move(e.clientX, e.clientY);
    }

    this.engine.click(e.clientX, e.clientY);

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
   * Add entities
   */
  addEntities() {

    var player = this.entities.Player;

    this.engine.addEntity(new player({ zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16, isLocalPlayer: true, shadow: true, static: true }));
    this.engine.addEntity(new player({ zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16, solid: true }));
    this.engine.addEntity(new player({ zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16 }));
    this.engine.addEntity(new player({ zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16 }));
    this.engine.addEntity(new player({ zIndex: 2, sprite: "assets/img/200.png", width: 16, height: 16 }));
    this.engine.addEntity(new player({ zIndex: 1, sprite: "assets/img/3.png", width: 16, height: 16, scale: 2}));

  }

}

window.game = new Game();