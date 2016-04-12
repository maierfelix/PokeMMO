import * as cfg from "../cfg";

export const keys = [
  {
    name: "SHIFT",
    fire: function() {},
    leave: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.STATES.SELECTING = false;
        this.engine.editor.selectedEntities = [];
      }
    }
  },
  {
    name: "CTRL+Z",
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.commander.undo();
      }
    }
  },
  {
    name: "CTRL+Y",
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.commander.redo();
      }
    }
  },
  {
    name: "CTRL+C",
    spam: false,
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.copyEntity();
      }
    }
  },
  {
    name: "CTRL+V",
    spam: false,
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.pasteEntity();
      }
    }
  },
  {
    name: "CTRL+X",
    spam: false,
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.cutEntity();
      }
    }
  },
  {
    name: "DELETE",
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.deleteEntity();
      }
    }
  },
  {
    name: "F1",
    spam: false,
    fire: function() {
      cfg.DEBUG_MODE = cfg.DEBUG_MODE ? false : true;
      if (!cfg.DEBUG_MODE) {
        cfg.FREE_CAMERA = false;
        this.engine.camera.focus(this.engine.localEntity, false);
      }
      this.engine.renderer.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);
      this.engine.renderer.resize(true);
      this.engine.renderer.clear();
      this.engine.renderer.draw();
    }
  },
  {
    name: "F2",
    spam: false,
    fire: function() {
      if (cfg.DEBUG_MODE) {
        cfg.EDIT_MODE = cfg.EDIT_MODE ? false : true;
      }
    }
  },
  {
    name: "F3",
    spam: false,
    fire: function() {
      if (cfg.DEBUG_MODE) {
        cfg.FREE_CAMERA = cfg.FREE_CAMERA ? false : true;
        if (!cfg.FREE_CAMERA) {
          this.engine.camera.dragging = false;
        }
      }
    }
  },
  {
    name: "F4",
    spam: false,
    fire: function() {
      if (cfg.DEBUG_MODE) {
        cfg.GOD_MODE = cfg.GOD_MODE ? false : true;
      }
    }
  },
  /** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
  {
    name: "Y",
    fire: function() {}
  },
  /** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
  {
    name: "G",
    fire: function() {}
  },
  /** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
  {
    name: "V",
    fire: function() {}
  },
  /** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
  {
    name: "CTRL",
    fire: function() {}
  },
  {
    name: "ESCAPE",
    spam: false,
    fire: function() {
      if (this.engine.scenes.Pause.active) {
        this.engine.scenes.Pause.hide();
      } else {
        this.engine.scenes.Pause.show();
      }
    }
  },
  {
    name: "B",
    spam: false,
    fire: function() {
      this.engine.notify(this.engine.localEntity, "Hello World");
    }
  },
  {
    name: "Z",
    spam: false,
    fire: function() {
      let local = this.engine.localEntity;
      local.action();
    }
  },
  {
    name: "X",
    spam: false,
    fire: function() {
      let local = this.engine.localEntity;
      local.velocity = 2;
    },
    leave: function() {
      let local = this.engine.localEntity;
      local.velocity = 1;
    }
  },
  {
    name: "C",
    spam: false,
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.jump();
      }
    }
  },
  {
    name: "←",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.LEFT);
      }
    }
  },
  {
    name: "→",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.RIGHT);
      }
    }
  },
  {
    name: "↑",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.UP);
      }
    }
  },
  {
    name: "↓",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.DOWN);
      }
    }
  },
    {
    name: "W",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.UP);
      }
    }
  },
  {
    name: "A",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.LEFT);
      }
    }
  },
  {
    name: "S",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.DOWN);
      }
    }
  },
  {
    name: "D",
    fire: function() {
      let local = this.engine.localEntity;
      if (!this.engine.activeScene) {
        local.move(cfg.RIGHT);
      }
    }
  },
  {
    name: "SPACE",
    fire: function() {
      let local = this.engine.localEntity;
      if (
        cfg.FREE_CAMERA ||
        this.engine.camera.objectFocus !== null &&
        this.engine.camera.objectFocus.id !== local.id
      ) {
        this.engine.camera.focus(local, true);
        cfg.FREE_CAMERA = false;
      }
    }
  }
];

export const mouse = [
  {
    name: "dblclick",
    fire: function(e) {
      e.preventDefault();
      if (!cfg.DEBUG_MODE) return void 0;
      cfg.FREE_CAMERA = false;
      if (cfg.EDIT_MODE) {
        if (!this.engine.editor.dragging) {
          let entity = this.engine.editor.getEntityByMouse(e.clientX, e.clientY);
          if (entity !== null) {
            this.engine.camera.focus(entity, false);
          }
          this.engine.editor.editEntity(e.clientX, e.clientY);
        }
      }
    }
  },
  {
    name: "mousedown|touchstart",
    fire: function(e) {
      if (e.target.id !== this.engine.node.id) {
        return void 0;
      }
      let x = e.touches ? e.touches[0].clientX : e.clientX;
      let y = e.touches ? e.touches[0].clientY : e.clientY;
      e.preventDefault();
      if (this.input.KeyBoard.isKeyPressed("G")) {
        this.engine.ping(x, y, "notify");
        return void 0;
      }
      if (!cfg.DEBUG_MODE) return void 0;
      if (cfg.EDIT_MODE && e.which === 1 && this.input.KeyBoard.isKeyPressed("SHIFT")) {
        this.engine.editor.STATES.SELECTING = true;
        this.engine.editor.selectFrom(x, y);
        this.engine.editor.selectTo(x, y);
        return void 0;
      }
      if (e.which !== 1 && !this.input.KeyBoard.isKeyPressed("SPACE")) {
        cfg.FREE_CAMERA = true;
      }
      if (cfg.FREE_CAMERA && (e.touches || e.which !== 1)) {
        this.engine.camera.dragging = true;
        this.engine.camera.click(x, y);
      }
      if (cfg.EDIT_MODE && (e.touches || e.which === 1)) {
        this.engine.editor.dragging = true;
        this.engine.editor.selectEntity(x, y);
      }
    }
  },
  {
    name: "mouseup|touchend",
    fire: function(e) {
      e.preventDefault();
      if (!cfg.DEBUG_MODE) return void 0;
      if (cfg.FREE_CAMERA) {
        this.engine.camera.dragging = false;
      }
      if (cfg.EDIT_MODE) {
        if (e.touches || e.which === 1) {
          this.engine.editor.dragging = false;
          this.engine.editor.STATES.SELECTING = false;
          this.engine.editor.selectedEntities = [];
        }
      }
      this.engine.camera.moving = false;
    }
  },
  {
    name: "mousemove|touchmove",
    fire: function(e) {
      let x = e.touches ? e.touches[0].clientX : e.clientX;
      let y = e.touches ? e.touches[0].clientY : e.clientY;
      e.preventDefault();
      if (!cfg.DEBUG_MODE) return void 0;
      if (
        cfg.FREE_CAMERA &&
        this.engine.camera.dragging &&
        !this.input.KeyBoard.isKeyPressed("SPACE")
      ) {
        this.engine.camera.move(x, y);
        this.engine.camera.moving = true;
      }
      if (this.input.KeyBoard.isKeyPressed("SHIFT") && this.engine.editor.STATES.SELECTING) {
        this.engine.editor.selectTo(x, y);
        return void 0;
      }
      if (cfg.EDIT_MODE && this.engine.editor.dragging) {
        this.engine.editor.dragEntity(x, y);
      }
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
      e.preventDefault();
      if (cfg.FREE_CAMERA) {
        this.engine.camera.click(e.clientX, e.clientY);
      }
      this.engine.camera.zoom(e);
    }
  },
  {
    name: "contextmenu",
    fire: function(e) {
      e.preventDefault();
    }
  }
];

export const global = [
  {
    name: "resize",
    fire: function(e) {
      this.engine.renderer.resize(true);
    }
  }
];