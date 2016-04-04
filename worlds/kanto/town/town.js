return (function() {

  "use strict";

  var MAP = {
    entities: [],
    settings: {}
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
        type: "tree"
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
        type: "tree"
      }
    );
    x += 16;
    if (x === xx && y < yy) {
      x = 0;
      y += 16;
    }
  };

  MAP.entities.push({
    x: -112, y: -112,
    type: "ping"
  });

  MAP.entities.push({
    x: 208, y: 168,
    type: "ping",
    opacity: .0,
    collidable: true,
    onCollide: {
      EngelScript: `
        trigger.lock = true;
        @ trigger.move(0);
        @ trigger.move(0);
        trigger.lock = false;
      `
    }
  });

  /*MAP.entities.push({
    x: 144, y: 40,
    type: "cloud",
    opacity: .75,
    scale: .1
  });*/

  MAP.entities.push({
    x: 168, y: 136,
    type: "water1",
    collidable: false,
    shadow: false
  });

  MAP.entities.push(
    {
      x: 176,
      y: 104,
      type: "tree",
      collisionBox: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 1, 1, 0
      ]
    }
  );

  MAP.entities.push({
    x: 160, y: 128,
    type: "treestub",
    onCollide: {
      /*JavaScript: function(entity) {
        if (entity.facing === 2) {
          entity.jump();
        }
      },*/
      EngelScript: `
        if (trigger.facing == 2) {
          @ this.jump();
          @ this.jump();
          @ this.fadeOut(1, false);
          @ this.fadeIn(1);
          @ trigger.fadeOut(1, false);
          @ trigger.fadeIn(1);
          trigger.jump();
          @ trigger.move(0);
          @ trigger.move(0);
          @ trigger.move(2);
          @ trigger.move(2);
          @ trigger.move(2);
          @ trigger.move(1);
          @ trigger.move(1);
          @ trigger.move(1);
          trigger.jump();
          @ trigger.move(3);
          @ trigger.move(3);
          @ trigger.move(3);
          @ trigger.move(0);
          @ trigger.move(0);
          @ trigger.move(2);
          @ trigger.move(2);
        }
      `
    }
  });

  MAP.entities.push({
    x: 112, y: 136,
    type: "foutune"
  });

  MAP.entities.push({
    x: 192, y: 120,
    type: "windmill",
    scale: 1
  });

  MAP.entities.push({
    x: 256, y: 120,
    type: "windmill",
    scale: 2
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