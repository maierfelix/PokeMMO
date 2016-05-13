/** Inspired by gles.js web demo */
import {
  DIMENSION,
  PIXEL_SCALE,
  TYPES
} from "../../../cfg";

import math from "../../../Math";

import { canvasToImage } from "../../utils";

import * as shaders from "./shaders";

/**
 * WebGL Renderer
 * @class WGL_Renderer
 * @export
 */
export default class WGL_Renderer {

  /**
   * @param {Object} instance
   * @constructor
   */
  constructor(instance) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Sprite shader
     * @type {Object}
     */
    this.spriteShader = null;

    /**
     * Shaders
     * @type {Object}
     */
    this.vshader = null;
    this.fshader = null;

    /**
     * Gl context ref
     * @type {Object}
     */
    this.gl = instance.gl;

    /**
     * Sprite position buffer
     * @type {Array}
     */
    this.spritepos = null;

    /**
     * Position buffer
     * @type {Object}
     */
    this.posBuffer = null;

    /**
     * Rotation buffer
     * @type {Object}
     */
    this.rotBuffer = null;

    this.lightZ = 0.075;

    this.ambientColor = new Float32Array([1.0, 1.0, 1.0, 0.8]);
    this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.falloff = new Float32Array([0.4, 7.0, 30.0]);
    this.lightPos = new Float32Array([0, 0, this.lightZ]);

    this.spriteIdx = null;
    this.spriteRot = null;

    this.EMPTY_ARRAY = new Float32Array(0);

    this.ready = false;

  }

  /**
   * Initialise
   */
  init() {

    let gl = this.gl;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    this.buildShader();

    this.ready = true;

    console.log(this.gl);

  }

  /**
   * Build a shader
   */
  buildShader() {

    let gl = this.gl;

    let loc = null;

    let length = 1e3;

    let shader = null;

    let vshaderid = gl.createShader(gl.VERTEX_SHADER);
    let fshaderid = gl.createShader(gl.FRAGMENT_SHADER);

    this.compileShader(0, vshaderid, shaders.spritevs);
    this.compileShader(1, fshaderid, shaders.spritefs);

    shader = gl.createProgram();

    gl.attachShader(shader, vshaderid);
    gl.attachShader(shader, fshaderid);

    gl.linkProgram(shader);

    this.shader = shader;

    this.spritePos = new Float32Array(length * 12);
    this.spriteIdx = new Float32Array(length * 6);
    this.spriteRot = new Float32Array(length * 6);

    this.posBuffer = gl.createBuffer();
    this.rotBuffer = gl.createBuffer();
    this.idxBuffer = gl.createBuffer();

    for (var i = 0; i < length; i++) {
      this.spriteIdx[6 * i + 0] = 0;
      this.spriteIdx[6 * i + 1] = 1;
      this.spriteIdx[6 * i + 2] = 2;
      this.spriteIdx[6 * i + 3] = 1;
      this.spriteIdx[6 * i + 4] = 2;
      this.spriteIdx[6 * i + 5] = 3;
    };

    this.setAttribute(this.shader, this.idxBuffer, "aIdx", length * 6, 1, this.spriteIdx);

    gl.useProgram(this.shader);

    loc = gl.getUniformLocation(this.shader, "u_normals");
    gl.uniform1i(loc, 1);

  }

  /**
   * Draw webgl based
   */
  draw() {

    let gl = this.gl;

    let loc = null;

    let map = this.instance.instance.currentMap;

    if (map.renderable === false) return void 0;

    /** Set global size */
    gl.uniform2f(
      gl.getUniformLocation(this.shader, "uScale"),
      this.instance.width, this.instance.height);

    /** Set ambient color */
    gl.uniform4fv(
      gl.getUniformLocation(this.shader, "AmbientColor"),
      this.ambientColor
    );

    /** Set global resolution */
    gl.uniform2f(
      gl.getUniformLocation(this.shader, "Resolution"),
      this.instance.camera.width, this.instance.camera.height
    );

    this.updateLights();

    this.renderEntities(1);
    this.renderMap(map);
    this.renderEntities(0);

    return void 0;

  }

  /**
   * Update lights
   */
  updateLights() {

    let gl = this.gl;

    let camera = this.instance.camera;
    let resolution = this.instance.camera.resolution;

    let light = this.instance.instance.getEntityByProperty("light183", "name");

    let lightX = camera.position.x + ((light.position.x + DIMENSION / 2) * resolution);
    let lightY = camera.position.y + ((light.position.y + DIMENSION / 2) * resolution);

    this.lightPos[0] = lightX / camera.size.x;
    this.lightPos[1] = 1.0 - lightY / camera.size.y;

    /** Lights */
    gl.uniform3fv(
      gl.getUniformLocation(this.shader, "LightPos"),
      this.lightPos
    );
    gl.uniform3fv(
      gl.getUniformLocation(this.shader, "Falloff"),
      this.falloff
    );
    gl.uniform4fv(
      gl.getUniformLocation(this.shader, "LightColor"),
      light.color
    );
    gl.uniform1f(
      gl.getUniformLocation(this.shader, "SoftLight"),
      light.soft
    );
    gl.uniform1f(
      gl.getUniformLocation(this.shader, "LightSize"),
      light.lightSize * resolution
    );

  }

  /**
   * Render a map
   * @param {Object} map
   */
  renderMap(map) {

    let gl = this.gl;

    let ii = 0;

    let camera = this.instance.camera;

    let x = camera.position.x;
    let y = camera.position.y;

    let width  = ((map.size.x * DIMENSION) * camera.resolution) << 0;
    let height = ((map.size.y * DIMENSION) * camera.resolution) << 0;

    for (; ii < 6; ++ii) {
      this.spritePos[2 * ii]     = ((x << 0) + width / 2) << 0;
      this.spritePos[2 * ii + 1] = ((y << 0) + height / 2) << 0;
    };

    gl.uniform2f(
      gl.getUniformLocation(this.shader, "uEntityScale"),
      width, height
    );

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
    this.setAttribute(this.shader, this.idxBuffer, "aIdx", 6, 1, this.EMPTY_ARRAY);
    this.setAttribute(this.shader, this.posBuffer, "aObjCen", 6, 2, this.spritePos);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

  }

  /**
   * Render entities
   * @param {Number} lowest
   */
  renderEntities(lowest) {

    let map = this.instance.instance.currentMap;

    let entity = null;
    let entities = map.entities;

    let ii = 0;
    let length = entities.length;

    let x = 0;
    let y = 0;

    let width  = 0;
    let height = 0;

    let camera = this.instance.camera;

    let camX = camera.position.x;
    let camY = camera.position.y;

    let resolution = camera.resolution;

    for (ii = 0; ii < length; ++ii) {
      entity = entities[ii];
      if (entity.type === TYPES.Light) continue;
      if (lowest === 1) {
        if (entity.zIndex > 0) continue;
      } else {
        if (entity.zIndex <= 0) continue;
      }
      if (entity.renderable === false) continue;
      width  = (entity.size.x * resolution) * entity.scaling << 0;
      height = (entity.size.y * resolution) * entity.scaling << 0;
      x = (camX + (entity.position.x + entity.xMargin) * resolution) << 0;
      y = (camY + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;
      this.renderEntity(entity, ii, x, y, width, height);
    };

  }

  /**
   * Render a entity
   * @param {Object} entity
   * @param {Number} ii
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  renderEntity(entity, ii, x, y, width, height) {

    let loc = null;

    let gl = this.gl;

    let jj = 0;

    let resolution = this.instance.camera.resolution;

    if (entity.type === TYPES.Notification) {
      x = entity.absolute === true ? entity.position.x : x - (entity.xPadding * resolution);
      y = entity.absolute === true ? entity.position.y : y - (entity.yPadding * resolution);
      width = entity.absolute === true ? width  / resolution : width;
      height = entity.absolute === true ? height / resolution : height;
    }

    for (jj = 0; jj < 6; ++jj) {
      this.spritePos[12 * ii + 2 * jj] = x + (width / 2);
      this.spritePos[12 * ii + 2 * jj + 1] = y + (height / 2);
      this.spriteRot[6 * ii + jj] = entity.r;
    };

    this.setAttribute(this.shader, this.idxBuffer, "aIdx", 6, 1, this.EMPTY_ARRAY);
    this.setAttribute(this.shader, this.posBuffer, "aObjCen", 6, 2, this.spritePos);
    this.setAttribute(this.shader, this.rotBuffer, "aObjRot", 6, 1, this.spriteRot);

    gl.uniform2f(
      gl.getUniformLocation(this.shader, "uEntityScale"),
      width, height
    );

    let cOpacity = entity.customOpacity();

    if (cOpacity === true) {
      gl.uniform1f(
        gl.getUniformLocation(this.shader, "Opacity"),
        entity.opacity
      );
    }

    /** Normal */
    gl.activeTexture(gl.TEXTURE1);
    if (entity.hasNormalMap === true && entity.normal !== null) {
      gl.bindTexture(gl.TEXTURE_2D, entity.normal[entity.sFrame]);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);
    }

    /** Diffuse */
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);

    gl.drawArrays(gl.TRIANGLES, ii * 6, 6);

    /** Reset ctx opacity */
    if (cOpacity === true) {
      gl.uniform1f(
        gl.getUniformLocation(this.shader, "Opacity"),
        1.0
      );
    }

    return void 0;

  }

  /**
   * Buffer a 2d texture
   * @param  {Array} sprites
   * @return {Array}
   */
  bufferTexture(sprites) {

    let gl = this.gl;

    let ii = 0;
    let length = 0;

    let image = null;
    let texture = null;

    let textures = [];

    length = sprites.length;

    for (; ii < length; ++ii) {
      texture = gl.createTexture();
      image = canvasToImage(sprites[ii].canvas);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
      textures.push(texture);
    };

    return (textures);

  }

  /**
   * Compile a shader
   * @param {Number} type
   * @param {Object} shader
   * @param {String} shader_src
   */
  compileShader(type, shader, shader_src) {

    let gl = this.gl;

    gl.shaderSource(shader, shader_src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw "shader " + type + " compile error: " + gl.getShaderInfoLog(shader);
    }

  }

  /**
   * Resize gl viewport
   * @param {Number} width
   * @param {Number} height
   */
  resize(width, height) {
    this.gl.viewport(0, 0, width, height);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }

  /**
   * Clear
   */
  clear() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    return void 0;
  }

  /**
   * Gl attribute set
   * @param {Object} program
   * @param {Object} buffer
   * @param {String} varname
   * @param {Number} numitems
   * @param {Number} itemsize
   * @param {Array}  values
   */
  setAttribute(program, buffer, varname, numitems, itemsize, values) {

    let gl = this.gl;

    var attribute = gl.getAttribLocation(program, varname);

    gl.enableVertexAttribArray(attribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    if (values.length > 0) {
      gl.bufferData(gl.ARRAY_BUFFER, values, gl.DYNAMIC_DRAW);
    }

    gl.vertexAttribPointer(attribute, itemsize, gl.FLOAT, false, 0, 0);

  }

}