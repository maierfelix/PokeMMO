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
    name: "←",
    fire: function() {
      console.log(LEFT);
    }
  },
  {
    name: "→",
    fire: function() {
      console.log(RIGHT);
    }
  },
  {
    name: "↑",
    fire: function() {
      console.log(UP);
    }
  },
  {
    name: "↓",
    fire: function() {
      console.log(DOWN);
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
    fire: function(root, e) {
      if (root.engine.dragging) {
        game.engine.move(e.clientX, e.clientY);
      }
    }
  },
  {
    name: "mousedown",
    fire: function(root, e) {
      root.engine.dragging = true;
      root.engine.click(e.clientX, e.clientY);
    }
  },
  {
    name: "mouseup",
    fire: function(root, e) {
      root.engine.dragging = false;
    }
  }
];