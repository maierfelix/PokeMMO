/**
 * Code inspired by gles.js webgl renderer
 */

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
     * Shader program
     * @type {Object}
     */
    this.shaderProgram = null;

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

    this.ready = false;

  }

  init() {

    let gl = this.gl;

    let entities = this.instance.instance.currentMap.entities;

    let length = entities.length;

    this.spritepos = new Float32Array(length * 12);
    this.spriteidx = new Float32Array(length * 6);

    this.vshaderid = gl.createShader(gl.VERTEX_SHADER);
    this.fshaderid = gl.createShader(gl.FRAGMENT_SHADER);

    this.compileShader(0, this.vshaderid, shaders.spritevs);
    this.compileShader(1, this.fshaderid, shaders.spritefs);

    this.shaderProgram = gl.createProgram();

    gl.attachShader(this.shaderProgram, this.vshaderid);
    gl.attachShader(this.shaderProgram, this.fshaderid);
    gl.linkProgram(this.shaderProgram);

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

    this.setAttribute(this.shaderProgram, this.idxbuffer, "aIdx", length * 6, 1, this.spriteidx);

    this.initLighting();

    this.ready = true;

  }

  initLighting() {

    this.lightZ = 0.075,
    this.lightSize = 256;

    this.ambientColor = new Float32Array([0.8, 0.8, 0.8, 0.3]);
    this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.falloff = new Float32Array([0.4, 7.0, 30.0]);
    this.lightPos = new Float32Array([0, 0, this.lightZ]);

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

    let entities = this.instance.instance.currentMap.entities;

    let length = entities.length;

    let ii = 0;
    let jj = 0;

    let camera = this.instance.camera;

    let resolution = camera.resolution;

    let camX = camera.position.x;
    let camY = camera.position.y;

    gl.useProgram(this.shaderProgram);

    loc = gl.getUniformLocation(this.shaderProgram, "uScale");
    gl.uniform2f(loc, this.instance.width, this.instance.height);

    loc = gl.getUniformLocation(this.shaderProgram, "uObjScale");

    for (; ii < length; ++ii) {

      entity = entities[ii];

      x = (camX + (entity.position.x + entity.xMargin) * resolution) << 0;
      y = (camY + (entity.position.y + entity.yMargin + entity.z) * resolution) << 0;

      width  = (entity.size.x * resolution) << 0;
      height = (entity.size.y * resolution) << 0;

      for (jj = 0; jj < 6; ++jj) {
        this.spritepos[12 * ii + 2 * jj] = x + (width / 2);
        this.spritepos[12 * ii + 2 * jj + 1] = y + (height / 2);
      };

      gl.uniform2f(
        loc,
        width, height
      );

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, entity.glTexture);

    };

    this.setAttribute(this.shaderProgram, this.posbuffer, "aObjCen", 6, 2, this.spritepos);

    this.setAttribute(this.shaderProgram, this.idxbuffer, "aIdx", length * 6, 1);

    gl.drawArrays(gl.TRIANGLES, 0, length * 6);

    return void 0;

  }

  /**
   * Buffer a 2d texture
   * @param  {Object} canvas
   * @return {Object}
   */
  bufferTexture(canvas) {

    let gl = this.gl;

    let texture = gl.createTexture();

    let image = canvasToImage(canvas);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);

    return (texture);

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
   * Compile shaders
   */
  compileShaders() {

    let gl = this.gl;

    let entities = this.instance.instance.currentMap.entities;

    let length = entities.length;

    this.vshader = gl.createShader(gl.VERTEX_SHADER);
    this.fshader = gl.createShader(gl.FRAGMENT_SHADER);

    this.compileShader(0, this.vshader, shaders.spritevs);
    this.compileShader(1, this.fshader, shaders.spritefs);

    this.shaderProgram = gl.createProgram();

    gl.attachShader(this.shaderProgram, shaders.vshader);
    gl.attachShader(this.shaderProgram, shaders.fshader);
    gl.linkProgram(this.shaderProgram);

    this.posbuffer = gl.createBuffer();

    this.setAttribute(this.shaderProgram, this.idxbuffer, "aIdx", length * 6, 1, this.spriteidx);

  }

  /**
   * Resize gl viewport
   * @param {Number} width
   * @param {Number} height
   */
  resizeGL(width, height) {

    this.gl.viewport(0, 0, width, height);

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