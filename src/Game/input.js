import {
  WALK_BY_KEYBOARD,
  LEFT, RIGHT, UP, DOWN
} from "../cfg";

export const keys = [
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
      if (WALK_BY_KEYBOARD) local.move(LEFT);
    }
  },
  {
    name: "→",
    fire: function() {
      let local = this.engine.localEntity;
      if (WALK_BY_KEYBOARD) local.move(RIGHT);
    }
  },
  {
    name: "↑",
    fire: function() {
      let local = this.engine.localEntity;
      if (WALK_BY_KEYBOARD) local.move(UP);
    }
  },
  {
    name: "↓",
    fire: function() {
      let local = this.engine.localEntity;
      if (WALK_BY_KEYBOARD) local.move(DOWN);
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
    name: "contextmenu",
    fire: function(e) {
      e.preventDefault();
      if (!WALK_BY_KEYBOARD) {
        this.engine.walkTo(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
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