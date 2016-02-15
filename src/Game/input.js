import {
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
    name: "mousemove",
    fire: function(e) {
      this.engine.move(e.clientX, e.clientY);
    }
  },
  {
    name: "mousedown",
    fire: function(e) {
      this.engine.dragging = true;
      this.engine.click(e.clientX, e.clientY);
    }
  },
  {
    name: "mouseup",
    fire: function(e) {
      this.engine.dragging = false;
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
      if (this.engine.camera.queue.length <= 0) {
        this.engine.zoom(e);
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