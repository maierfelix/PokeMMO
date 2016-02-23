import {
  EDIT_MODE,
  MIN_SCALE,
  LEFT, RIGHT, UP, DOWN
} from "../cfg";

import Engine from "../Engine";
import Input  from "../Engine/Input";
import Editor from "../Engine/Editor";

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
        this.addEntities(() => this.setup(stage));
      return void 0;
      case 3:
        this.animateNPC();
        this.setup(stage);
      return void 0;
      case 4:
        /** Instant focus local player */
        this.engine.camera.focus(this.engine.localEntity, true);
        this.setup(stage);
      return void 0;
      case 5:
        if (EDIT_MODE) {
          this.engine.editor = new Editor(this.engine);
        }
        this.setup(stage);
      return void 0;
      case 6:
        this.engine.renderer.render();
        this.setup(stage);
      return void 0;
      case 7:
        this.input = new Input(Events, this);
        this.setup(stage);
      return void 0;
    };

    return void 0;

  }

  animateNPC() {
    setTimeout(this::function() {
      let entity = this.engine.getEntityByProperty("Joy", "name");
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
    this.engine.addMap("shared/maps/town/town.json", resolve);
  }

  /**
   * Add entities
   * @param {Function} resolve
   */
  addEntities(resolve) {

    let player = this.entities.Player;

    this.engine.addEntity(new player({ name: "Felix", map: "Town", x: 112, y: 112, zIndex: 4, sprite: "assets/img/0.png", width: 16, height: 16, isLocalPlayer: true, collidable: true, shadow: true }));

    this.engine.addEntity(new player({ name: "Joy", map: "Town", x: 120, y: 120, zIndex: 4, sprite: "assets/img/200.png", width: 16, height: 16, shadow: true, collidable: true }));

    return (resolve());

  }

}

window.game = new Game();