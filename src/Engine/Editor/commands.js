import {
  Y_DEPTH_HACK,
  DIMENSION
} from "../../cfg";

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
      this.instance.editor.pasteEntity();
    },
    onRedo: function(entity) {
      this.instance.editor.copyEntity();
      this.instance.editor.deleteEntity();
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
    onUndo: function (entity, paste) {
      this.instance.removeEntity(paste);
    },
    onRedo: function(entity, paste) {

      let map = this.map;

      if (paste !== null && paste !== void 0) {
        map.entities.push(paste);
        return void 0;
      }

      let clone = this.instance.cloneEntity(entity);

      /** Fuck that */
      this.instance.editor.commander.stack[this.instance.editor.commander.position].data[1] = clone;

      map.entities.push(clone);

    }
  }
];