export const keys = [
  {
    name: "SHIFT",
    fire: function() {},
    leave: function() {
      this.action("SHIFT");
    }
  },
  {
    name: "CTRL+Z",
    simultaneous: false,
    fire: function() {
      this.action("CTRL+Z");
    }
  },
  {
    name: "CTRL+Y",
    simultaneous: false,
    fire: function() {
      this.action("CTRL+Y");
    }
  },
  {
    name: "CTRL+C",
    spam: false,
    simultaneous: false,
    fire: function() {
      this.action("CTRL+C");
    }
  },
  {
    name: "CTRL+V",
    spam: false,
    simultaneous: false,
    fire: function() {
      this.action("CTRL+V");
    }
  },
  {
    name: "CTRL+X",
    spam: false,
    simultaneous: false,
    fire: function() {
      this.action("CTRL+X");
    }
  },
  {
    name: "DELETE",
    fire: function() {
      this.action("DELETE");
    }
  },
  {
    name: "F1",
    spam: false,
    fire: function() {
      this.action("F1");
    }
  },
  {
    name: "F2",
    spam: false,
    fire: function() {
      this.action("F2");
    }
  },
  {
    name: "F3",
    spam: false,
    fire: function() {
      this.action("F3");
    }
  },
  {
    name: "F4",
    spam: false,
    fire: function() {
      this.action("F4");
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
      this.action("ESCAPE");
    }
  },
  {
    name: "B",
    spam: false,
    fire: function() {
      this.action("B");
    }
  },
  {
    name: "Z",
    spam: false,
    fire: function() {
      this.action("Z");
    }
  },
  {
    name: "X",
    spam: false,
    fire: function() {
      this.action("X_FIRE");
    },
    leave: function() {
      this.action("X_LEAVE");
    }
  },
  {
    name: "C",
    spam: false,
    fire: function() {
      this.action("C");
    }
  },
  {
    name: "←",
    fire: function() {
      this.action("←");
    }
  },
  {
    name: "→",
    fire: function() {
      this.action("→");
    }
  },
  {
    name: "↑",
    fire: function() {
      this.action("↑");
    }
  },
  {
    name: "↓",
    fire: function() {
      this.action("↓");
    }
  },
  {
    name: "SPACE",
    fire: function() {
      this.action("SPACE");
    }
  }
];

export const mouse = [
  {
    name: "dblclick",
    fire: function(e) {
      this.action("DBLCLICK", [e]);
    }
  },
  {
    name: "mousedown|touchstart",
    fire: function(e) {
      this.action("LEFTCLICK", [e]);
    }
  },
  {
    name: "contextmenu",
    fire: function(e) {
      this.action("RIGHTCLICK", [e]);
    }
  },
  {
    name: "mouseup|touchend",
    fire: function(e) {
      this.action("MOUSEUP", [e]);
    }
  },
  {
    name: "mousemove|touchmove",
    fire: function(e) {
      this.action("MOUSEMOVE", [e]);
    }
  },
  {
    name: "mousewheel",
    fire: function(e) {
      this.action("MOUSEWHEEL", [e]);
    }
  }
];

export const global = [
  {
    name: "resize",
    fire: function(e) {
      this.action("RESIZE");
    }
  }
];