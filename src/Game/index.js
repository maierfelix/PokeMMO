"use strict";

import math from "../Math";

import {
  __dirname,
  MIN_SCALE, MAX_SCALE,
  DIMENSION
} from "../cfg";

import {
  ajax as $GET
} from "../Engine/utils";

import Map from "../Engine/Map";
import Input from "../Engine/Input";
import Engine from "../Engine";
import Renderer from "../Renderer";

import * as Events from "./input.js";
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

    this.maps = {};

    this.input = new Input(Events, this);
    this.engine = new Engine(this);
    this.renderer = new Renderer(this.engine);

    this.engine.sceneWidth = 256;
    this.engine.sceneHeight = 128;

    this.renderer.dimension = DIMENSION;
    this.renderer.lightning = true;
    this.renderer.shadowCasting = true;
    this.renderer.imageSmoothing = false;
    this.renderer.render();

    this.engine.camera.scale = MIN_SCALE;

    this.setup();

  }

  /**
   * Setup
   * @param {Number} stage
   */
  setup(stage = stage === void 0 ? 0 : stage) {

    switch (++stage) {
      case 1:
        this.addMap(() => this.setup(stage));
      return void 0;
      case 2:
        this.addLayers(() => this.setup(stage));
      return void 0;
      case 3:
        this.addEntities(() => this.setup(stage));
      return void 0;
    };

    return void 0;

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
   * Add map
   * @param {Function} resolve
   */
  addMap(resolve) {
    $GET(
      "assets/maps/town.json"
    ).then(
      JSON.parse
    ).then(this::function(data) {
      this.engine.addMap(new Map(data));
      return (resolve());
    });
  }

  /**
   * Add layers
   * @param {Function} resolve
   */
  addLayers(resolve) {

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

    return (resolve());

  }

  /**
   * Add entities
   * @param {Function} resolve
   */
  addEntities(resolve) {

    var player = this.entities.Player;

    this.engine.addEntity(new player({ map: "Town", x: 8, y: 0, zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16, scale: 1, isLocalPlayer: true, shadow: true, static: true }));

    this.engine.addEntity(new player({ map: "Town", x: 40, y: 16, zIndex: 1, sprite: "assets/img/200.png", width: 16, height: 16, shadow: true, collidable: true }));

    return (resolve());

  }

}

window.game = new Game();