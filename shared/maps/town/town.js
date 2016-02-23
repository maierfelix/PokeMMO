"use strict";

return (function() {

  var MAP = {
    entities: []
  };

  var x = 0;
  var y = 0;
  var xx = 272;
  var yy = 68;

  while (x < xx) {
    MAP.entities.push(
      {
        x: x,
        y: y,
        type: "tree",
        static: false
      }
    );
    x += 16;
    if (x === xx && y < yy) {
      x = 0;
      y += 16;
    }
  };

  var x = 0;
  var y = 96;
  var xx = 80;
  var yy = 96 * 2;

  while (x < xx) {
    MAP.entities.push(
      {
        x: x,
        y: y,
        type: "tree",
        static: false
      }
    );
    x += 16;
    if (x === xx && y < yy) {
      x = 0;
      y += 16;
    }
  };

  MAP.entities.push({
    x: 160, y: 112,
    type: "treestub"
  });

  MAP.entities.push({
    x: 112, y: 136,
    type: "foutune"
  });

  MAP.entities.push({
    x: 160, y: 120,
    type: "windmill"
  });

  MAP.entities.push({
    x: 92 + 4, y: 120 - 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 104, y: 120 - 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 112, y: 120 - 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 120, y: 120 - 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 128, y: 120 - 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 96, y: 120,
    type: "flower"
  });

  MAP.entities.push({
    x: 104, y: 120,
    type: "flower"
  });

  MAP.entities.push({
    x: 112, y: 120,
    type: "flower"
  });

  MAP.entities.push({
    x: 120, y: 120,
    type: "flower"
  });

  MAP.entities.push({
    x: 128, y: 120,
    type: "flower"
  });

  MAP.entities.push({
    x: 96, y: 120 + 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 104, y: 120 + 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 112, y: 120 + 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 120, y: 120 + 8,
    type: "flower"
  });

  MAP.entities.push({
    x: 128, y: 120 + 8,
    type: "flower"
  });

  return (MAP);

})();