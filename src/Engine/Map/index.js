import { DIMENSION } from "../../cfg";
import math from "../../Math";
import {
  inherit,
  Maps,
  uHash,
  TextureCache, getSprite,
  createCanvasBuffer,
  ajax as $GET,
} from "../utils";

import MapEntity from "./object";
import DisplayObject from "../DisplayObject";
import Texture from "../Texture";
import Path from "../Path";

import * as events from "./events";
import * as functions from "./functions";

/**
 * Map
 * @class Map
 * @export
 */
export default class Map extends DisplayObject {

  /**
   * @param {Object}   obj
   * @param {Function} resolve
   * @constructor
   */
  constructor(obj, resolve) {

    super(null);

    /**
     * Tileset
     * @type {String}
     */
    this.tileset = obj.tileset;

    /**
     * Texture
     * @type {Object}
     */
    this.texture = null;

    /**
     * Map buffers
     * @type {Object}
     */
    this.buffers = {};

    /** Map size */
    this.width = obj.width;
    this.height = obj.height;

    /**
     * Map name
     * @type {String}
     */
    this.name = obj.name;

    /**
     * Layers
     * @type {Array}
     */
    this.layers = obj.layers;

    /**
     * Map objects
     * @type {Object}
     */
    this.objects = {};

    /**
     * Map entities
     * @type {Array}
     */
    this.entities = [];

    /**
     * Map path
     * @type {Object}
     */
    this.mapPath = obj.path;

    /**
     * Path ref
     * @type {Object}
     */
    this.path = null;

    /**
     * Collision layer ref
     * @type {Object}
     */
    this.collisionLayer = null;

    /** Attach map objects */
    if (obj.objects !== void 0) {
      if (obj.objects instanceof Array) {
        this.objTpl = obj.objects;
      }
    }

    /** Load texture */
    getSprite(this.tileset, this::function(texture) {
      this.texture = TextureCache[this.tileset];
      this.parseLayers();
      /** Attach path finder */
      this.path = new Path(this.collisionLayer.data);
      Maps[this.name] = this;
      this.loadMapFile(this::function() {
        this.loadObjects(function() {
          if (resolve instanceof Function) resolve();
        });
      });
    });

  }

  /**
   * Load map file
   * @param {Function} resolve
   */
  loadMapFile(resolve) {

    let path = this.mapPath + this.name.toLowerCase() + ".js";

    $GET(path).then(this::function(data) {
      let map = new Function(data)();
      this.entities = map.entities;
      return (resolve());
    });

  }

  /**
   * Load map objects
   * @param {Function} resolve
   */
  loadObjects(resolve) {
    let length = this.objTpl.length;
    for (let key of this.objTpl) {
      let path = `${this.mapPath}objects/${key}`;
      $GET(path + ".json").then(
        JSON.parse
      ).then(this::function(data) {
        data.sprite = path + ".png";
        this.objects[key] = data;
        if (--length <= 0) {
          this.buildEntities();
          return (resolve());
        }
      });
    };
  }

  /**
   * Fusionize entity
   * @param {Function} resolve
   */
  buildEntities(resolve) {

    let ii = 0;
    let length = 0;

    length = this.entities.length;

    for (; ii < length; ++ii) {
      this.entities[ii] = new MapEntity(Object.assign(
        this.objects[this.entities[ii].type],
        this.entities[ii]
      ));
    };

  }

  /**
   * Parse map layers
   */
  parseLayers() {

    let width  = this.width * (DIMENSION * 2) << 0;
    let height = this.height * (DIMENSION * 2) << 0;

    let buffer = null;

    let key = null;
    let layer = null;

    for (key in this.layers) {
      layer = this.layers[key];
      if (layer.collision === true) {
        this.collisionLayer = layer;
        continue;
      }
      buffer = createCanvasBuffer(
        width, height
      );
      this.renderLayer(buffer, layer.data);
      this.buffers[layer.index] = buffer;
      buffer = null;
    };

    return void 0;

  }

  /**
   * Render a layer
   * @param {Object} buffer
   * @param {Array}  layer
   */
  renderLayer(buffer, layer) {

    let dim = DIMENSION * 2;

    let tile = 0;

    let x  = 0;
    let y  = 0;
    let xx = 0;
    let yy = 0;

    let tileset = this.texture.texture_effect.canvas;

    let outerLength = layer.length;
    let innerLength = 0;

    for (; yy < outerLength; ++yy) {
      for (!(xx = x = 0) && (innerLength = layer[yy].length) > 0; xx < innerLength; ++xx) {
        tile = layer[yy][xx] - 1;
        buffer.drawImage(
          tileset,
          ((tile) % dim) * dim,
          ((tile / dim) << 0) * dim,
          dim,
          dim,
          x,
          y,
          dim,
          dim
        );
        x += dim;
      };
      y += dim;
    };

    return void 0;

  }

}

inherit(Map, events);
inherit(Map, functions);