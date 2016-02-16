import {
  MIN_SCALE,
  LEFT, RIGHT, UP, DOWN
} from "../cfg";

import {
  ajax as $GET
} from "../Engine/utils";

import Map from "../Engine/Map";
import Input from "../Engine/Input";
import Engine from "../Engine";

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
      case 4:
        this.animateNPC();
        this.setup(stage);
      return void 0;
      case 5:
        /** Instant focus local player */
        this.engine.camera.focus(this.engine.localEntity, true);
        this.setup(stage);
      return void 0;
      case 6:
        this.engine.renderer.render();
        this.setup(stage);
      return void 0;
    };

    return void 0;

  }

  animateNPC() {
    setTimeout(this::function() {
      let entity = this.engine.entities[1];
      let move = [LEFT, RIGHT, UP, DOWN][(Math.random() * 3) << 0];
      entity.move(move);
      this.animateNPC();
    }, 2e3);
  }

  /**
   * Add map
   * @param {Function} resolve
   */
  addMap(resolve) {
    $GET(
      "shared/maps/town.json"
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

    let player = this.entities.Player;

    this.engine.addEntity(new player({ map: "Town", x: 8, y: 0, zIndex: 1, sprite: "assets/img/0.png", width: 16, height: 16, scale: 1, isLocalPlayer: true, collidable: true, shadow: true, static: true }));

    this.engine.addEntity(new player({ map: "Town", x: 40, y: 16, zIndex: 1, sprite: "assets/img/200.png", width: 16, height: 16, shadow: true, collidable: true }));

    return (resolve());

  }

}

window.game = new Game();