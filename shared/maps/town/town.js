"use strict";

return (function() {

  var MAP = {
    entities: []
  };

  /** Follower */
  MAP.entities.push(
    {
      x: 84 - 16, y: 96 - 8,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 + 8,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 + 24,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 + 40,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 + 56,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 + 72,
      type: "tree"
    },
    {
      x: 84 - 16, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 16, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 32, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 48, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 64, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 80, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 96, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 112, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 128, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 144, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 160, y: 96 - 24,
      type: "tree"
    },
    {
      x: 84 + 176, y: 96 - 24,
      type: "tree"
    }
  );

  MAP.entities.push({
    x: 84 + 32, y: 96 + 40,
    type: "foutune"
  });

  MAP.entities.push({
    x: 148 + 16, y: 136 - 16,
    type: "windmill"
  });

  MAP.entities.push({
    x: 164, y: 120,
    type: "treestub"
  });

  return (MAP);

})();