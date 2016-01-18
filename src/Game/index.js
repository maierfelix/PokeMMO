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

import Wheel from "../libs/wheel";

import Engine from "../Engine";
import Input from "../Engine/Input";
import Renderer from "../Renderer";

import * as Events from "./events.js";

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

    this.input = new Input();

    this.renderer.dimension = DIMENSION;
    this.renderer.lightning = true;
    this.renderer.shadowCasting = true;
    this.renderer.imageSmoothing = false;

    this.addListeners();
    this.addLayers();
    this.addEntities();
    this.registerKeys();
    this.registerMouse();
    this.renderer.render();

    this.engine.z = MIN_SCALE;

  }

  /**
   * Register keys
   */
  registerKeys() {

    for (let key of Events.keys) {
      this.input.KeyBoard.registerKey(
        key.name,
        key.fire.bind(this)
      );
    };

  }

  /**
   * Register mouse
   */
  registerMouse() {

    for (let ev of Events.mouse) {
      this.input.Mouse.registerEvent(ev, this);
    };

  }

  /**
   * Add event listeners
   */
  addListeners() {

    window.addEventListener('resize', e => this.renderer.resize(), false);

    Wheel.addWheelListener(this.node, function(e) {
      let amount = (e.deltaY ? -e.deltaY : e.deltaY);
      amount = amount / 2 / (math.distance(0, 0, this.renderer.width, this.renderer.height) / Math.PI) * math.zoomScale(this.engine.z);
      this.engine.z += amount / 2;
      if (this.engine.z < MIN_SCALE) this.engine.z = MIN_SCALE;
      if (this.engine.z > MAX_SCALE) this.engine.z = MAX_SCALE;
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
   * Add entities
   */
  addEntities() {

    this.engine.addEntity({ zIndex: 1, sprite: "assets/0.png",   width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 2, sprite: "assets/0.png",   width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 2, sprite: "assets/0.png",   width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 2, sprite: "assets/0.png",   width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 2, sprite: "assets/200.png", width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 4, sprite: "assets/200.png", width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 4, sprite: "assets/200.png", width: 16, height: 16 });
    this.engine.addEntity({ zIndex: 5, sprite: "assets/200.png", width: 16, height: 16 });

  }

}

window.game = new Game();