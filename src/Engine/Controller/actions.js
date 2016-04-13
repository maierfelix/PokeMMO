import * as cfg from "../../cfg";

export let actions = {};

actions["SHIFT"] = {
  action: function() {
    this.engine.editor.STATES.SELECTING = false;
    this.engine.editor.selectedEntities = [];
  },
  rule: () => cfg.EDIT_MODE
};

actions["CTRL+Z"] = {
  action: function() {
    this.engine.editor.commander.undo();
  },
  rule: () => cfg.EDIT_MODE
};

actions["CTRL+Y"] = {
  action: function() {
    this.engine.editor.commander.redo();
  },
  rule: () => cfg.EDIT_MODE
};

actions["CTRL+C"] = {
  action: function() {
    this.engine.editor.copyEntity();
  },
  rule: () => cfg.EDIT_MODE
};

actions["CTRL+V"] = {
  action: function() {
    this.engine.editor.pasteEntity();
  },
  rule: () => cfg.EDIT_MODE
};

actions["CTRL+X"] = {
  action: function() {
    this.engine.editor.cutEntity();
  },
  rule: () => cfg.EDIT_MODE
};

actions["DELETE"] = {
  action: function() {
    this.engine.editor.deleteEntity();
  },
  rule: () => cfg.EDIT_MODE
};

actions["F1"] = {
  action: function() {
    cfg.DEBUG_MODE = cfg.DEBUG_MODE ? false : true;
    if (!cfg.DEBUG_MODE) {
      cfg.FREE_CAMERA = false;
      this.engine.camera.focus(this.engine.localEntity, false);
    }
    this.engine.renderer.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);
    this.engine.renderer.resize(true);
    this.engine.renderer.clear();
    this.engine.renderer.draw();
  },
  rule: () => true
};

actions["F2"] = {
  action: function() {
    cfg.EDIT_MODE = cfg.EDIT_MODE ? false : true;
  },
  rule: () => cfg.DEBUG_MODE
};

actions["F3"] = {
  action: function() {
    cfg.FREE_CAMERA = cfg.FREE_CAMERA ? false : true;
    if (!cfg.FREE_CAMERA) {
      this.engine.camera.dragging = false;
    }
  },
  rule: () => cfg.DEBUG_MODE
};

actions["F4"] = {
  action: function() {
    cfg.GOD_MODE = cfg.GOD_MODE ? false : true;
  },
  rule: () => cfg.DEBUG_MODE
};

actions["ESCAPE"] = {
  action: function() {
    if (this.engine.scenes.Pause.active) {
      this.engine.scenes.Pause.hide();
    } else {
      this.engine.scenes.Pause.show();
    }
  },
  rule: () => true
};

actions["B"] = {
  action: function() {
    this.engine.notify(this.engine.localEntity, "Hello World");
  },
  rule: () => true
};

actions["Z"] = {
  action: function() {
    let local = this.engine.localEntity;
    local.action();
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["X_FIRE"] = {
  action: function() {
    let local = this.engine.localEntity;
    local.velocity = 2;
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["X_LEAVE"] = {
  action: function() {
    let local = this.engine.localEntity;
    local.velocity = 1;
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["C"] = {
  action: function() {
    let local = this.engine.localEntity;
    if (!this.engine.activeScene) {
      local.jump();
    }
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["←"] = {
  action: function() {
    let local = this.engine.localEntity;
    if (!this.engine.activeScene) {
      local.move(cfg.LEFT);
    }
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["→"] = {
  action: function() {
    let local = this.engine.localEntity;
    if (!this.engine.activeScene) {
      local.move(cfg.RIGHT);
    }
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["↑"] = {
  action: function() {
    let local = this.engine.localEntity;
    if (!this.engine.activeScene) {
      local.move(cfg.UP);
    }
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["↓"] = {
  action: function() {
    let local = this.engine.localEntity;
    if (!this.engine.activeScene) {
      local.move(cfg.DOWN);
    }
  },
  rule: function() { return (this.engine.localEntity !== null); }
};

actions["SPACE"] = {
  action: function() {
    let local = this.engine.localEntity;
    this.engine.camera.focus(local, true);
    cfg.FREE_CAMERA = false;
  },
  rule: function() {
    return (
      cfg.FREE_CAMERA ||
      this.engine.camera.objectFocus !== null &&
      this.engine.camera.objectFocus.id !== this.engine.localEntity.id
    );
  }
};

actions["DBLCLICK"] = {
  action: function(e) {
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
  },
  rule: () => true
};

actions["MOUSEDOWN"] = {
  action: function(e) {
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
  },
  rule: () => true
};

actions["RESIZE"] = {
  action: function() {
    this.engine.renderer.resize(true);
  },
  rule: () => true
};

actions["MOUSEUP"] = {
  action: function(e) {
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
  },
  rule: () => true
};

actions["MOUSEMOVE"] = {
  action: function(e) {
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
  },
  rule: () => true
};

actions["MOUSEWHEEL"] = {
  action: function(e) {
    e.preventDefault();
    if (cfg.FREE_CAMERA) {
      this.engine.camera.click(e.clientX, e.clientY);
    }
    this.engine.camera.zoom(e);
  },
  rule: () => true
};