import * as cfg from "../cfg";

export const keys = [
  {
    name: "CTRL+C",
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.copyEntity();
      }
    }
  },
  {
    name: "CTRL+V",
    simultaneous: false,
    fire: function() {
      if (cfg.EDIT_MODE) {
        this.engine.editor.pasteEntity();
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
    fire: function() {
      console.log("Escape", this);
    }
  },
  {
    name: "X",
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
      local.jump();
    }
  },
  {
    name: "←",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.LEFT);
    }
  },
  {
    name: "→",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.RIGHT);
    }
  },
  {
    name: "↑",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.UP);
    }
  },
  {
    name: "↓",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.DOWN);
    }
  },
    {
    name: "W",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.UP);
    }
  },
  {
    name: "A",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.LEFT);
    }
  },
  {
    name: "S",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.DOWN);
    }
  },
  {
    name: "D",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(cfg.RIGHT);
    }
  }
];

export const mouse = [
  {
    name: "mousedown",
    fire: function(e) {
      e.preventDefault();
      if (cfg.FREE_CAMERA && e.which !== 1) {
        this.engine.camera.dragging = true;
        this.engine.camera.click(e.clientX, e.clientY);
      }
      if (cfg.EDIT_MODE && e.which === 1) {
        this.engine.editor.dragging = true;
        this.engine.editor.selectEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mouseup",
    fire: function(e) {
      e.preventDefault();
      if (cfg.FREE_CAMERA) {
        this.engine.camera.dragging = false;
      }
      if (cfg.EDIT_MODE && e.which === 1) {
        this.engine.editor.dragging = false;
      }
    }
  },
  {
    name: "mousemove",
    fire: function(e) {
      e.preventDefault();
      if (cfg.FREE_CAMERA && this.engine.camera.dragging) {
        this.engine.camera.move(e.clientX, e.clientY);
      }
      if (cfg.EDIT_MODE && this.engine.editor.dragging === true) {
        this.engine.editor.dragEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "contextmenu",
    fire: function(e) {
      e.preventDefault();
      if (cfg.EDIT_MODE) {
        this.engine.editor.editEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
      event.preventDefault();
      if (cfg.FREE_CAMERA) {
        this.engine.camera.click(e.clientX, e.clientY);
      }
      if (this.engine.camera.queue.length <= 0) {
        this.engine.camera.zoom(e);
      }
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