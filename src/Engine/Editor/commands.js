import {
  Y_DEPTH_HACK,
  DIMENSION
} from "../../cfg";

import MapEntity from "../Map/MapEntity";

export let commands = [
  /** Select command */
  {
    action: "select",
    onUndo: function(entity, selection) {
      this.entitySelection = null;
      this.entitySelection = selection;
    },
    onRedo: function(entity, selection) {
      this.entitySelection = null;
      this.entitySelection = entity;
    }
  },
  /** Drag command */
  {
    action: "drag",
    onUndo: function(x, y) {
      this.x -= x;
      this.y -= y;
      this.y <<= 0;
      this.y += Y_DEPTH_HACK;
      this.last.x = this.x;
      this.last.y = this.y;
    },
    onRedo: function(x, y) {
      this.x += x;
      this.y += y;
      this.y <<= 0;
      this.y += Y_DEPTH_HACK;
      this.last.x = this.x;
      this.last.y = this.y;
    }
  },
  /** Delete command */
  {
    action: "delete",
    onUndo: function(entity) {
      this.instance.addEntity(entity);
      this.entitySelection = entity;
    },
    onRedo: function(entity) {
      this.instance.removeEntity(entity);
      this.entitySelection = null;
    }
  },
  /** Cut command */
  {
    action: "cut",
    onUndo: function(entity) {
      this.instance.addEntity(entity);
      this.entitySelection = entity;
    },
    onRedo: function(entity) {
      this.entityCopy = entity;
      this.instance.removeEntity(entity);
      this.entitySelection = entity;
    }
  },
  /** Copy command */
  {
    action: "copy",
    onUndo: function(entity, copy) {
      this.entityCopy = copy;
      this.entitySelection = copy;
    },
    onRedo: function(entity, copy) {
      this.entityCopy = entity;
      this.entitySelection = entity;
    }
  },
  /** Paste command */
  {
    action: "paste",
    onUndo: function(entity) {
      this.instance.removeEntity(this.entityCopy);
      this.instance.removeEntity(entity);
    },
    onRedo: function(entity) {

      let map = this.map;

      if ((entity instanceof MapEntity) === false) return void 0;

      let tpl = map.objectTemplates[entity.name.toLowerCase()];

      tpl.x = entity.x;
      tpl.y = entity.y;
      tpl.z = entity.z;

      let pushEntity = map.addEntity(tpl);

      this.entitySelection = pushEntity;

      map.entities.push(pushEntity);

      this.entityCopy = pushEntity;

    }
  }
];