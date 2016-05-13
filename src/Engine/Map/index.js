import {
  DIMENSION,
  WGL_SUPPORT
} from "../../cfg";

import {
  inherit,
  Maps,
  uHash,
  TextureCache, getSprite,
  createCanvasBuffer,
  ajax as $GET
} from "../utils";

import math from "../../Math";

import Path from "../Path";
import Texture from "../Texture";
import MapEntity from "./MapEntity";
import DisplayObject from "../DisplayObject";

import * as events from "./events";
import * as functions from "./functions";

/**
 * Map
 * @class Map
 * @export
 */
export default class Map extends DisplayObject {

  /**
   * @param {Object}   instance
   * @param {Object}   obj
   * @param {Function} resolve
   * @constructor
   */
  constructor(instance, obj, resolve) {

    super(null);

    /**
     * Instance
     * @type {Object}
     */
    this.instance = instance;

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
     * @type {Array}
     */
    this.buffers = [];

    /**
     * Main map buffer
     * @type {Object}
     */
    this.mainBuffer = null;

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
     * Object templates
     * @type {Array}
     */
    this.objTpl = [];

    /**
     * Map object templates
     * @type {Object}
     */
    this.objectTemplates = {};

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

    /**
     * Settings
     * @type {Object}
     */
    this.settings = {};

    this.xMargin = 0;
    this.yMargin = 0;

    /**
     * Map texture loaded
     * @type {Boolean}
     */
    this.renderable = false;

    /** Load texture */
    getSprite(this.tileset, -1, -1, this::function(texture) {
      this.texture = TextureCache[this.tileset];
      this.parseLayers();
      /** Attach path finder */
      this.path = new Path(this);
      Maps[this.name] = this;
      if (WGL_SUPPORT) {
        this.glTexture = this.instance.renderer.glRenderer.bufferTexture([this.mainBuffer]);
      }
      this.renderable = true;
      this.loadMapFile(this::function() {
        if (resolve instanceof Function) resolve();
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
      this.settings = map.settings;
      this.loadMapObjectTypes();
      this.loadMapObjects(function() {
        if (resolve instanceof Function) {
          return (resolve());
        }
      });
    });

  }

  /**
   * Load all map object types
   */
  loadMapObjectTypes() {

    let ii = 0;
    let length = this.entities.length;

    let entity = null;

    for (; ii < length; ++ii) {
      entity = this.entities[ii];
      if (this.objTpl.indexOf(entity.type) <= -1) {
        this.objTpl.push(entity.type);
      }
    };

  }

  /**
   * Load map objects
   * @param {Function} resolve
   */
  loadMapObjects(resolve) {
    let length = this.objTpl.length;
    for (let key of this.objTpl) {
      let path = `${this.mapPath}objects/${key}`;
      $GET(path + ".json").then(
        JSON.parse
      ).then(this::function(data) {
        data.map = this.name;
        data.sprite = path + ".png";
        if (data.normal === true) {
          data.normalSprite = path + "_normal" + ".png";
        }
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

    let name = null;

    length = this.entities.length;

    for (; ii < length; ++ii) {
      name = this.entities[ii].type;
      this.objectTemplates[name] = this.objects[this.entities[ii].type];
      this.entities[ii] = this.addEntity(this.inheritProperties(
        this.entities[ii], this.objects[this.entities[ii].type]
      ));
    };

  }

  /**
   * Inherit properties
   * @param  {Object} entity
   * @param  {Object} parent
   * @return {Object}
   */
  inheritProperties(entity, parent) {

    let key = null;

    for (key in parent) {
      if (entity.hasOwnProperty(key) === false) {
        entity[key] = parent[key];
      }
    };

    return (entity);

  }

  /**
   * Add entity to map
   * @param {Object} obj
   */
  addEntity(obj) {
    return (
      new MapEntity(
        obj
      )
    );
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
      this.buffers.push(buffer);
      buffer = null;
    };

    this.mainBuffer = this.buffers[0];

    this.joinLayers();

    return void 0;

  }

  /**
   * Join layer buffers
   */
  joinLayers() {

    for (let ii = 1; ii < this.buffers.length; ++ii) {
      this.mainBuffer.drawImage(
        this.buffers[ii].canvas,
        0, 0
      );
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

    let tileset = this.texture.effect_sprites[0].canvas;

    let outerLength = layer.length;
    let innerLength = 0;

    for (; yy < outerLength; ++yy) {
      for (!(xx = x = 0) && (innerLength = layer[yy].length) > 0; xx < innerLength; ++xx) {
        if (layer[yy][xx] > 0) {
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
        }
        x += dim;
      };
      y += dim;
    };

    return void 0;

  }

}

inherit(Map, events);
inherit(Map, functions);