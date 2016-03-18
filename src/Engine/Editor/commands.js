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

      let entities = this.instance.instance.entities;

      let map = this.map;

      let tmp = null;

      let pushEntity = null;

      if (entity instanceof entities.Player) {
        tmp = new entities.Player({
          name: "undefined",
          map: entity.map,
          x: entity.x, y: entity.y,
          zIndex: entity.zIndex,
          sprite: entity.sprite,
          width: entity.width, height: entity.height,
          isLocalPlayer: false,
          collidable: entity.collidable,
          shadow: entity.hasShadow
        });
        if (entity.instance) {
          tmp.instance = entity.instance;
          console.log(tmp, tmp.instance);
        }
        if (tmp.hasShadow) {
          tmp.shadow.x = entity.shadow.x;
          tmp.shadow.y = entity.shadow.y;
        }
        tmp.fadeIn(.75);
      }
      else if (entity instanceof MapEntity) {
        tmp = map.objectTemplates[entity.name.toLowerCase()];
      }
      else {
        return void 0;
      }

      tmp.x = entity.x;
      tmp.y = entity.y;
      tmp.z = entity.z;

      if (entity instanceof MapEntity) {
        pushEntity = map.addEntity(tmp);
      } else {
        pushEntity = tmp;
      }

      this.entitySelection = pushEntity;

      map.entities.push(pushEntity);

      this.entityCopy = pushEntity;

    }
  }
];