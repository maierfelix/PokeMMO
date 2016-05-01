/** Inspired by gles.js web demo */
import {
  DIMENSION,
  PIXEL_SCALE
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
    this.posbuffer = null;

    this.lightZ = 0.05;

    this.lightSize = 512;

    this.ambientColor = new Float32Array([0.8, 0.8, 0.8, 0.7]);
    this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.falloff = new Float32Array([0.4, 7.0, 40.0]);
    this.lightPos = new Float32Array([0, 0, this.lightZ]);

    this.ready = false;

  }

  /**
   * Initialise
   */
  init() {

    this.compileShaders();

    this.ready = true;

  }

  /**
   * Compile shaders
   */
  compileShaders() {

    let gl = this.gl;

    let loc = null;

    let length = this.instance.instance.currentMap.entities.length;

    let vshaderid = gl.createShader(gl.VERTEX_SHADER);
    let fshaderid = gl.createShader(gl.FRAGMENT_SHADER);

    this.spritepos = new Float32Array(length * 12);
    this.spriteidx = new Float32Array(length * 6);

    this.compileShader(0, vshaderid, shaders.spritevs);
    this.compileShader(1, fshaderid, shaders.spritefs);

    this.spriteShader = gl.createProgram();

    gl.attachShader(this.spriteShader, vshaderid);
    gl.attachShader(this.spriteShader, fshaderid);
    gl.linkProgram(this.spriteShader);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    this.posbuffer = gl.createBuffer();
    this.idxbuffer = gl.createBuffer();

    for (var i = 0; i < length; i++) {
      this.spriteidx[6 * i + 0] = 0;
      this.spriteidx[6 * i + 1] = 1;
      this.spriteidx[6 * i + 2] = 2;
      this.spriteidx[6 * i + 3] = 1;
      this.spriteidx[6 * i + 4] = 2;
      this.spriteidx[6 * i + 5] = 3;
    };

    this.setAttribute(this.spriteShader, this.idxbuffer, "aIdx", length * 6, 1, this.spriteidx);

    gl.useProgram(this.spriteShader);

    loc = gl.getUniformLocation(this.spriteShader, "u_normals");
    gl.uniform1i(loc, 1);

    console.log(gl);

  }

  /**
   * Draw webgl based
   */
  draw() {

    let gl = this.gl;

    let loc = null;
    let entity = null;

    let x = 0;
    let y = 0;

    let width  = 0;
    let height = 0;

    let map = this.instance.instance.currentMap;

    let entities = map.entities;

    let length = entities.length;

    let ii = 0;

    let camera = this.instance.camera;

    let resolution = camera.resolution;

    let camX = camera.position.x;
    let camY = camera.position.y;

    gl.useProgram(this.spriteShader);

    loc = gl.getUniformLocation(this.spriteShader, "uScale");
    gl.uniform2f(loc, this.instance.width, this.instance.height);

    this.drawMapTexture(map, camX, camY, resolution);

    for (ii = 0; ii < length; ++ii) {
      entity = entities[ii];
      if (entity.renderable === false) continue;
      width  = (entity.size.x * resolution) * entity.scaling << 0;
      height = (entity.size.y * resolution) * entity.scaling << 0;
      x = (camX + (entity.position.x + entity.xMargin) * resolution) << 0;
      y = (camY + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;
      this.drawTexture(entity, ii, x, y, width, height);
    };

    return void 0;

  }

  /**
   * Draw map texture
   * @param {Object} map
   * @param {Number} x
   * @param {Number} y
   * @param {Number} resolution
   */
  drawMapTexture(map, x, y, resolution) {

    let gl = this.gl;

    let ii = 0;

    let width  = ((map.size.x * DIMENSION) * resolution) << 0;
    let height = ((map.size.y * DIMENSION) * resolution) << 0;

    for (; ii < 6; ++ii) {
      this.spritepos[2 * ii]     = ((x << 0) + width / 2) << 0;
      this.spritepos[2 * ii + 1] = ((y << 0) + height / 2) << 0;
    };

    gl.uniform2f(
      gl.getUniformLocation(this.spriteShader, "uEntityScale"),
      width, height
    );

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
    this.setAttribute(this.spriteShader, this.posbuffer, "aObjCen", 6, 2, this.spritepos);
    this.setAttribute(this.spriteShader, this.idxbuffer, "aIdx", 6, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

  }

  /**
   * Draw map texture
   * @param {Object} entity
   * @param {Number} ii
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  drawTexture(entity, ii, x, y, width, height) {

    let loc = null;

    let gl = this.gl;

    let jj = 0;

    for (jj = 0; jj < 6; ++jj) {
      this.spritepos[12 * ii + 2 * jj] = x + (width / 2);
      this.spritepos[12 * ii + 2 * jj + 1] = y + (height / 2);
    };

    this.setAttribute(this.spriteShader, this.posbuffer, "aObjCen", 6, 2, this.spritepos);
    this.setAttribute(this.spriteShader, this.idxbuffer, "aIdx", 6, 1);

    let resolution = this.instance.camera.resolution;

    let camX = this.instance.camera.position.x;
    let camY = this.instance.camera.position.y;

    if (entity.isLight === true) {
      loc = gl.getUniformLocation(this.spriteShader, "LightSize");
      gl.uniform1f(loc, resolution);
    } else {
      loc = gl.getUniformLocation(this.spriteShader, "LightSize");
      gl.uniform1f(loc, 0.0);
    }

    this.lightPos[0] = 2.0;
    this.lightPos[1] = 2.0;

    loc = gl.getUniformLocation(this.spriteShader, "hasNormal");
    gl.uniform1f(loc, entity.name === "Lantern" ? 1.0 : 0.0);

    gl.uniform2f(
      gl.getUniformLocation(this.spriteShader, "uEntityScale"),
      width, height
    );
    gl.uniform4fv(
      gl.getUniformLocation(this.spriteShader, "AmbientColor"),
      this.ambientColor
    );
    gl.uniform3fv(
      gl.getUniformLocation(this.spriteShader, "LightPos"),
      this.lightPos
    );
    gl.uniform3fv(
      gl.getUniformLocation(this.spriteShader, "Falloff"),
      this.falloff
    );
    gl.uniform4fv(
      gl.getUniformLocation(this.spriteShader, "LightColor"),
      this.lightColor
    );

    /** Normal */
    gl.activeTexture(gl.TEXTURE1);
    if (entity.hasNormalMap) {
      gl.bindTexture(gl.TEXTURE_2D, entity.normal[entity.sFrame]);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);
    }

    /** Diffuse */
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);

    gl.drawArrays(gl.TRIANGLES, ii * 6, 6);

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
   * @param {[type]} buffer
   * @param {[type]} varname
   * @param {[type]} numitems
   * @param {[type]} itemsize
   * @param {[type]} values
   */
  setAttribute(program, buffer, varname, numitems, itemsize, values) {

    let gl = this.gl;

    var attribute = gl.getAttribLocation(program, varname);

    gl.enableVertexAttribArray(attribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    if (values) {
      gl.bufferData(gl.ARRAY_BUFFER, values, gl.DYNAMIC_DRAW);
    }

    gl.vertexAttribPointer(attribute, itemsize, gl.FLOAT, false, 0, 0);

  }

}