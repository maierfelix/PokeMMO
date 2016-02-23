import {
  EDIT_MODE,
  WALK_BY_KEYBOARD,
  LEFT, RIGHT, UP, DOWN
} from "../cfg";

export const keys = [
  {
    name: "CTRL+C",
    simultaneous: false,
    fire: function() {
      if (EDIT_MODE) {
        this.engine.editor.copyEntity();
      }
    }
  },
  {
    name: "CTRL+V",
    simultaneous: false,
    fire: function() {
      if (EDIT_MODE) {
        this.engine.editor.pasteEntity();
      }
    }
  },
  {
    name: "DELETE",
    fire: function() {
      if (EDIT_MODE) {
        this.engine.editor.deleteEntity();
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
      local.move(LEFT);
    }
  },
  {
    name: "→",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(RIGHT);
    }
  },
  {
    name: "↑",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(UP);
    }
  },
  {
    name: "↓",
    fire: function() {
      let local = this.engine.localEntity;
      local.move(DOWN);
    }
  },
    {
    name: "W",
    fire: function() {
      console.log(UP);
    }
  },
  {
    name: "A",
    fire: function() {
      console.log(LEFT);
    }
  },
  {
    name: "S",
    fire: function() {
      console.log(DOWN);
    }
  },
  {
    name: "D",
    fire: function() {
      console.log(RIGHT);
    }
  }
];

export const mouse = [
  {
    name: "mousedown",
    fire: function(e) {
      e.preventDefault();
      if (EDIT_MODE && e.which === 1) {
        this.engine.editor.dragging = true;
        this.engine.editor.selectEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mouseup",
    fire: function(e) {
      e.preventDefault();
      if (EDIT_MODE) {
        this.engine.editor.dragging = false;
        //this.engine.editor.looseEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mousemove",
    fire: function(e) {
      e.preventDefault();
      if (EDIT_MODE) {
        this.engine.editor.dragEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "contextmenu",
    fire: function(e) {
      e.preventDefault();
      if (EDIT_MODE) {
        this.engine.editor.editEntity(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
      event.preventDefault();
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
      this.engine.renderer.resize();
    }
  }
];