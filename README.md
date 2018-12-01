# Pokémon Engine

[![Join the chat at https://gitter.im/maierfelix/PokeMMO](https://badges.gitter.im/maierfelix/PokeMMO.svg)](https://gitter.im/maierfelix/PokeMMO?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Demo](http://maierfelix.github.io/PokeMMO)<br>
Runs best on Chrome.<br>
Uses the 2D canvas to render the editor mode and WebGL for the gameplay (unfinished).<br>
Graphics used in the demo are created by [EpicDay](http://epicday.deviantart.com/) and [Red_Ex](http://the-red-ex.deviantart.com/).</br>
Sounds are taken from [SoundBible](http://soundbible.com/).

- Z: Action
- X: Run
- C: Jump
- F1: Switch renderer (webgl/canvas)
- F2: Edit mode
- F3: Free camera mode (Press right mouse key to drag around)
- F4: God mode

Setup:
````
Client:
npm install
npm run watch

Server:
cd ./server
npm install
npm run start
````

- [ ] Engine
   - [x] Collisions
   - [x] Camera
   - [x] 3D Audio implementation
   - [x] Grid based path finding
   - [x] Maps
   - [ ] Map connections
   - [x] Dynamic multi-lingual support
   - [x] Mini map
   - [x] Pings
   - [ ] Notifications (Map name, dialog boxes etc)
   - [ ] Record/Replay Mode
   - [ ] Seed based animations
   - [x] Canvas renderer
   - [x] WebGL renderer
   - [ ] Normal map based lighting

- [ ] Editor
   - [x] Undo & Redo
   - [x] Select, Copy, Paste, Cut, Delete (unstable)
   - [ ] Range map entity selections
   - [x] Map entities
   - [ ] Map entities settings
   - [x] Map entity add & edit support
   - [ ] Map entity collison box editor
   - [x] Draggable map entities
   - [ ] UI
   - [ ] Background map tile drawing
   - [ ] Background map collision tile drawing
   - [ ] Map connections
   - [ ] Map entity event code editor

- [ ] Interpreter
   - [x] Syntax
   - [x] Global flags
   - [x] Expressions
   - [ ] Game api
   - [x] Frame based step script execution
