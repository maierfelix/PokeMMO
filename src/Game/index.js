"use strict";

import Engine from "./Engine";
import Renderer from "./Renderer";

let node = document.querySelector("#main");

window.engine = new Engine(node);
window.renderer = new Renderer(engine);

window.addEventListener('resize', e => renderer.resize(), false);

renderer.lightning = true;
renderer.shadowCasting = true;

engine.addLayer({
  name: "Collisions",
  zIndex: 0
});

engine.addLayer({
  name: "Background",
  zIndex: 1
});

engine.addLayer({
  name: "Entities",
  zIndex: 2,
  zShadow: 1,
  shadowCast: true
});

engine.addLayer({
  name: "Foreground",
  zIndex: 3,
  zShadow: 2,
  shadowCast: true
});

engine.addLayer({
  name: "Sky",
  zIndex: 4,
  zShadow: 3,
  shadowCast: true
});

engine.addEntity({ zIndex: 1});
engine.addEntity({ zIndex: 2});
engine.addEntity({ zIndex: 2});
engine.addEntity({ zIndex: 2});
engine.addEntity({ zIndex: 2});
engine.addEntity({ zIndex: 4});
engine.addEntity({ zIndex: 4});
engine.addEntity({ zIndex: 5});

renderer.imageSmoothing = false;
renderer.render();