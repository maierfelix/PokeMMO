/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(6);

	var _Engine = __webpack_require__(64);

	var _Engine2 = _interopRequireDefault(_Engine);

	var _Input = __webpack_require__(133);

	var _Input2 = _interopRequireDefault(_Input);

	var _Editor = __webpack_require__(136);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _MiniMap = __webpack_require__(140);

	var _MiniMap2 = _interopRequireDefault(_MiniMap);

	var _Connection = __webpack_require__(141);

	var _Connection2 = _interopRequireDefault(_Connection);

	var _input = __webpack_require__(151);

	var Events = _interopRequireWildcard(_input);

	var _entities = __webpack_require__(152);

	var entities = _interopRequireWildcard(_entities);

	var _scenes = __webpack_require__(157);

	var scenes = _interopRequireWildcard(_scenes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Game
	 * @class Game
	 * @export
	 */

	var Game = function () {

	  /**
	   * @constructor
	   */

	  function Game() {
	    (0, _classCallCheck3.default)(this, Game);

	    this.canvasNode = document.querySelector("#canvas");
	    this.glNode = document.querySelector("#webgl");
	    this.uiNode = document.querySelector("#ui");

	    this.entities = entities;

	    this.scenes = scenes;

	    this.engine = new _Engine2.default(this);

	    this.engine.camera.scale = _cfg.MIN_SCALE;

	    this.setup();
	  }

	  /**
	   * Setup
	   * @param {Number} stage
	   */

	  (0, _createClass3.default)(Game, [{
	    key: "setup",
	    value: function setup() {
	      var _this = this;

	      var stage = arguments.length <= 0 || arguments[0] === undefined ? stage === void 0 ? 0 : stage : arguments[0];

	      switch (++stage) {
	        case 1:
	          this.addWorld(function () {
	            return _this.setup(stage);
	          });
	          return void 0;
	        case 2:
	          this.addMap(function () {
	            return _this.setup(stage);
	          });
	          return void 0;
	        case 3:
	          this.addEntities(function () {
	            return _this.setup(stage);
	          });
	          return void 0;
	        case 4:
	          this.animateNPC();
	          this.setup(stage);
	          return void 0;
	        case 5:
	          /** Instant focus local player */
	          this.engine.camera.focus(this.engine.getEntityByProperty("Felix", "name"), true);
	          this.setup(stage);
	          return void 0;
	        case 6:
	          if (_cfg.EDIT_MODE) {
	            this.engine.editor = new _Editor2.default(this.engine);
	          }
	          this.setup(stage);
	          return void 0;
	        case 7:
	          this.engine.mini = new _MiniMap2.default(this.engine);
	          this.setup(stage);
	          return void 0;
	        case 8:
	          window.rAF(function () {
	            return _this.engine.renderer.render();
	          });
	          this.setup(stage);
	          return void 0;
	        case 9:
	          this.input = new _Input2.default(Events, this);
	          this.setup(stage);
	          return void 0;
	        case 10:
	          this.engine.renderer.glRenderer.init();
	          this.setup(stage);
	          return void 0;
	        case 11:
	          if (!_cfg.OFFLINE_MODE) {
	            this.engine.connection = new _Connection2.default(this, _cfg.CONNECTION_URL + ":" + _cfg.CONNECTION_PORT, null);
	          }
	          return void 0;
	      };

	      return void 0;
	    }
	  }, {
	    key: "animateNPC",
	    value: function animateNPC() {
	      setTimeout(function () {
	        var entity = this.engine.getEntityByProperty("Joy", "name");
	        var move = [_cfg.LEFT, _cfg.RIGHT, _cfg.UP, _cfg.DOWN][Math.random() * 3 << 0];
	        entity.move(move);
	        this.animateNPC();
	      }.bind(this), 2e3);
	    }

	    /**
	     * Add world
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addWorld",
	    value: function addWorld(resolve) {
	      this.engine.addWorld("worlds/kanto/index.js", resolve);
	    }

	    /**
	     * Add map
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addMap",
	    value: function addMap(resolve) {
	      this.engine.addMap("worlds/kanto/town/town.json", resolve);
	    }

	    /**
	     * Add entities
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addEntities",
	    value: function addEntities(resolve) {

	      var player = this.entities.Player;

	      this.engine.addEntity(new player({ name: "Joy", map: "Town", x: 120, y: 120, sprite: "assets/img/200.png", width: 16, height: 16, collidable: true,
	        onCollide: {
	          JavaScript: function JavaScript(entity) {
	            this.facing = this.oppositFacing(entity.facing);
	          }
	        }
	      }));

	      if (_cfg.OFFLINE_MODE) {
	        this.engine.addEntity(new player({ name: "Felix", map: "Town", x: 152, y: 128, sprite: "assets/img/0.png", width: 16, height: 16, isLocalPlayer: true, collidable: true }));
	      }

	      return resolve();
	    }
	  }]);
	  return Game;
	}();

	exports.default = Game;

	window.game = new Game();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ColorPalette = exports.VOLUME = exports.GRAVITY = exports.DOWN = exports.RIGHT = exports.UP = exports.LEFT = exports.SHADOW_ALPHA = exports.SHADOW_Y = exports.SHADOW_X = exports.DISPLAY_SHADOWS = exports.MAX_SCALE = exports.MIN_SCALE = exports.PIXEL_SCALE = exports.DIMENSION = exports.Y_DEPTH_HACK = exports.BGS = exports.BGM = exports.DEBUG_FPS = exports.MINI_MAP = exports.DEBUG_MODE = exports.GOD_MODE = exports.FIX_CAMERA = exports.FREE_CAMERA = exports.EDIT_MODE = exports.RECORD_MODE = exports.WALK_BY_KEYBOARD = exports.WGL_SUPPORT = exports.VERSION = exports.__dirname = exports.CONNECTION_PORT = exports.CONNECTION_URL = exports.GRID_WIDTH = exports.RENDER_MODE = exports.WGL = exports.CANVAS = exports.OFFLINE_MODE = exports.IS_CLIENT = undefined;

	var _utils = __webpack_require__(7);

	/**
	 * Is client
	 * @type {Boolean}
	 */
	var IS_CLIENT = exports.IS_CLIENT = true;

	/**
	 * Offline mode
	 * @type {Boolean}
	 */
	var OFFLINE_MODE = exports.OFFLINE_MODE = true;

	/**
	 * Canvas rendering mode
	 * @constant
	 * @type {Number}
	 */
	var CANVAS = exports.CANVAS = 0;

	/**
	 * WebGL rendering mode
	 * @constant
	 * @type {Number}
	 */
	var WGL = exports.WGL = 1;

	/**
	 * Game rendering mode
	 * @type {Number}
	 */
	var RENDER_MODE = exports.RENDER_MODE = -1;

	/**
	 * Grid width
	 * @constant
	 * @type {Number}
	 */
	var GRID_WIDTH = exports.GRID_WIDTH = 1;

	/**
	 * Connection url
	 * @constant
	 * @type {String}
	 */
	var CONNECTION_URL = exports.CONNECTION_URL = (0, _utils.getLocalHost)();

	/**
	 * Connection port
	 * @constant
	 * @type {String}
	 */
	var CONNECTION_PORT = exports.CONNECTION_PORT = 449;

	/**
	 * @constant
	 * @type {String}
	 */
	var __dirname = exports.__dirname = "./src/";

	/**
	 * Version
	 * @constant
	 * @type {String}
	 */
	var VERSION = exports.VERSION = "0.1.0";

	/**
	 * WebGL support
	 * @constant
	 * @type {Boolean}
	 */
	var WGL_SUPPORT = exports.WGL_SUPPORT = (0, _utils.supportWGL)();

	/**
	 * Walk by keyboard
	 * @constant
	 * @type {Boolean}
	 */
	var WALK_BY_KEYBOARD = exports.WALK_BY_KEYBOARD = true;

	/**
	 * Record mode
	 * @type {Boolean}
	 */
	var RECORD_MODE = exports.RECORD_MODE = true;

	/**
	 * Edit mode
	 * @type {Boolean}
	 */
	var EDIT_MODE = exports.EDIT_MODE = true;

	/**
	 * Free camera
	 * @type {Boolean}
	 */
	var FREE_CAMERA = exports.FREE_CAMERA = false;

	/**
	 * Fix camera
	 * @type {Boolean}
	 */
	var FIX_CAMERA = exports.FIX_CAMERA = false;

	/**
	 * God mode
	 * @type {Boolean}
	 */
	var GOD_MODE = exports.GOD_MODE = false;

	/**
	 * Debug mode
	 * @type {Boolean}
	 */
	var DEBUG_MODE = exports.DEBUG_MODE = true;

	/**
	 * Debug mode
	 * @type {Boolean}
	 */
	var MINI_MAP = exports.MINI_MAP = true;

	/**
	 * Debug fps
	 * @constant
	 * @type {Number}
	 */
	var DEBUG_FPS = exports.DEBUG_FPS = 60;

	/**
	 * Play bgm
	 * @constant
	 * @type {Number}
	 */
	var BGM = exports.BGM = false;

	/**
	 * Play bgs
	 * @constant
	 * @type {Number}
	 */
	var BGS = exports.BGS = true;

	/**
	 * Vertical depth sorting hack
	 * @constant
	 * @type {Number}
	 */
	var Y_DEPTH_HACK = exports.Y_DEPTH_HACK = .0001;

	/**
	 * @constant
	 * @type {Number}
	 */
	var DIMENSION = exports.DIMENSION = 8;

	/**
	 * PP rounding
	 * @constant
	 * @type {Number}
	 */
	var PIXEL_SCALE = exports.PIXEL_SCALE = .125;

	/**
	 * @constant
	 * @type {Number}
	 */
	var MIN_SCALE = exports.MIN_SCALE = 5.0;

	/**
	 * @constant
	 * @type {Number}
	 */
	var MAX_SCALE = exports.MAX_SCALE = 12.5;

	/**
	 * Display shadows
	 * @constant
	 * @type {Boolean}
	 */
	var DISPLAY_SHADOWS = exports.DISPLAY_SHADOWS = true;

	/**
	 * Shadow x scale
	 * @constant
	 * @type {Number}
	 */
	var SHADOW_X = exports.SHADOW_X = 1.0;

	/**
	 * Shadow y scale
	 * @constant
	 * @type {Number}
	 */
	var SHADOW_Y = exports.SHADOW_Y = 1.45;

	/**
	 * Shadow alpha
	 * @type {Number}
	 */
	var SHADOW_ALPHA = exports.SHADOW_ALPHA = .85;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var LEFT = exports.LEFT = 3;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var UP = exports.UP = 1;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var RIGHT = exports.RIGHT = 2;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var DOWN = exports.DOWN = 0;

	/**
	 * Gravity
	 * @constant
	 * @type {Number}
	 */
	var GRAVITY = exports.GRAVITY = -1;

	/**
	 * @constant
	 * @type {Object}
	 */
	var VOLUME = exports.VOLUME = {
	  LOCAL_PLAYER: 100,
	  NETWORK_PLAYER: 10
	};

	/**
	 * @constant
	 * @type {Array}
	 */
	var ColorPalette = exports.ColorPalette = [[135, 100, 100], [135, 105, 100], [140, 110, 100], [150, 115, 100], [155, 125, 100], [150, 135, 100], [135, 135, 100], [135, 125, 100], [130, 125, 100],
	/** Morning */
	[130, 120, 100], [135, 120, 100], [145, 130, 100], [150, 145, 100],
	/** Day */
	[135, 145, 100], [145, 150, 100], [150, 125, 100], [145, 130, 100], [135, 130, 100],
	/** Early night */
	[125, 135, 100], [135, 130, 100], [135, 135, 100], [135, 100, 100], [135, 105, 100], [140, 110, 100], [150, 115, 100]];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Maps = exports.TextureCache = undefined;
	exports.supportWGL = supportWGL;
	exports.getLocalHost = getLocalHost;
	exports.getWGLContext = getWGLContext;
	exports.getSprite = getSprite;
	exports.uHash = uHash;
	exports.getPath = getPath;
	exports.inherit = inherit;
	exports.createCanvasBuffer = createCanvasBuffer;
	exports.imageToCanvas = imageToCanvas;
	exports.canvasToImage = canvasToImage;
	exports.tileContainsImageData = tileContainsImageData;
	exports.getTime = getTime;
	exports.ajax = ajax;

	var _promise = __webpack_require__(8);

	var _promise2 = _interopRequireDefault(_promise);

	var _Texture = __webpack_require__(62);

	var _Texture2 = _interopRequireDefault(_Texture);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rx = {
	  path: /[^\\/]+$/
	};

	/**
	 * Cached textures
	 * @type {Object}
	 */
	var TextureCache = exports.TextureCache = {};

	var hashIndex = -1;
	var hashes = [];

	/**
	 * Parsed maps
	 * @type {Object}
	 */
	var Maps = exports.Maps = {};

	/**
	 * Check if webgl is supported
	 * @return {Boolean}
	 */
	function supportWGL() {

	  var canvas = null;

	  try {
	    canvas = document.createElement("canvas");
	    if (WebGLRenderingContext !== void 0) {
	      return !!getWGLContext(canvas);
	    }
	  } catch (e) {
	    return false;
	  };

	  return false;
	}

	/**
	 * Get local host
	 * @return {String}
	 */
	function getLocalHost() {
	  if (typeof document === "undefined") return void 0;
	  return document.location.host.replace(/:.*/, "");
	}

	/**
	 * Get wgl context of a canvas
	 * @return {Object}
	 */
	function getWGLContext(canvas) {
	  var options = {
	    alpha: true,
	    antialias: false,
	    premultipliedAlpha: true,
	    stencil: true,
	    preserveDrawingBuffer: false
	  };
	  return canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
	}

	/**
	 * Get a sprite
	 * @param {String}   sprite
	 * @param {Number}   width
	 * @param {Number}   height
	 * @param {Function} resolve
	 */
	function getSprite(sprite, width, height, resolve) {

	  if (TextureCache[sprite]) {
	    resolve(TextureCache[sprite]);
	    return void 0;
	  }

	  new _Texture2.default(sprite, width, height, function (instance) {
	    resolve(TextureCache[sprite] = instance);
	  });

	  return void 0;
	}

	/**
	 * Generate a unique hash
	 * @export
	 */
	function uHash() {

	  var index = ++hashIndex;

	  if (hashes.indexOf(index) > -1) return this.uHash();

	  hashes.push(index);

	  return index;
	}

	/**
	 * Get path without file ext
	 * @param  {String} path
	 * @return {String}
	 */
	function getPath(path) {
	  return path.replace(rx.path.exec(path)[0], "");
	}

	/**
	 * @param {Object} cls
	 * @param {Object} prot
	 * @export
	 */
	function inherit(cls, prot) {

	  var key = null;

	  for (key in prot) {
	    if (prot[key] instanceof Function) {
	      cls.prototype[key] = prot[key];
	    }
	  };
	}

	/**
	 * @param {Number} width
	 * @param {Number} height
	 */
	function createCanvasBuffer(width, height) {

	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");

	  ctx.setImageSmoothing(false);

	  canvas.width = width;
	  canvas.height = height;

	  return ctx;
	}

	/**
	 * @param  {Object} img
	 * @return {Object}
	 */
	function imageToCanvas(img) {

	  var ctx = createCanvasBuffer(img.width, img.height);

	  ctx.drawImage(img, 0, 0, img.width, img.height);

	  return ctx;
	}

	/**
	 * @param  {Object} canvas
	 * @return {Object}
	 */
	function canvasToImage(canvas) {

	  var image = new Image();

	  image.src = canvas.toDataURL("image/png");

	  return image;
	}

	/**
	 * Check if a tile contains any image data
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @return {Boolean}
	 */
	function tileContainsImageData(ctx, x, y, width, height) {

	  var ii = 0;
	  var length = 0;

	  var data = ctx.getImageData(x * 2, y * 2, width * 2, height * 2).data;

	  length = data.length;

	  for (; ii < length; ii += 4) {
	    if (data[ii] > 0) return true;
	    if (data[ii + 1] > 0) return true;
	    if (data[ii + 2] > 0) return true;
	    if (data[ii + 3] > 0) return true;
	  };

	  return false;
	}

	/**
	 * Get current time
	 * @return {Object}
	 */
	function getTime() {

	  var date = new Date();

	  return {
	    hours: date.getHours(),
	    minutes: date.getMinutes(),
	    seconds: date.getSeconds()
	  };
	}

	/**
	 * Ajax
	 * @param {String} url
	 */
	function ajax(url) {
	  return new _promise2.default(function (resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open("GET", url);
	    req.onload = function () {
	      if (req.status === 200) {
	        resolve(req.response);
	      } else {
	        reject(new Error(req.statusText));
	      }
	    };
	    req.onerror = function () {
	      reject(new Error("Network error"));
	    };
	    req.send();
	  });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(34);
	__webpack_require__(41);
	module.exports = __webpack_require__(19).Promise;

/***/ },
/* 10 */
/***/ function(module, exports) {

	

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(12)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(15)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , defined   = __webpack_require__(14);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(16)
	  , $export        = __webpack_require__(17)
	  , redefine       = __webpack_require__(22)
	  , hide           = __webpack_require__(23)
	  , has            = __webpack_require__(27)
	  , Iterators      = __webpack_require__(28)
	  , $iterCreate    = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(30)
	  , getProto       = __webpack_require__(5).getProto
	  , ITERATOR       = __webpack_require__(31)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , core      = __webpack_require__(19)
	  , ctx       = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 18 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(25) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(26)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(5)
	  , descriptor     = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(30)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(23)(IteratorPrototype, __webpack_require__(31)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(5).setDesc
	  , has = __webpack_require__(27)
	  , TAG = __webpack_require__(31)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(32)('wks')
	  , uid    = __webpack_require__(33)
	  , Symbol = __webpack_require__(18).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(18)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	var Iterators = __webpack_require__(28);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(36)
	  , step             = __webpack_require__(37)
	  , Iterators        = __webpack_require__(28)
	  , toIObject        = __webpack_require__(38);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(15)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(39)
	  , defined = __webpack_require__(14);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(40);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(5)
	  , LIBRARY    = __webpack_require__(16)
	  , global     = __webpack_require__(18)
	  , ctx        = __webpack_require__(20)
	  , classof    = __webpack_require__(42)
	  , $export    = __webpack_require__(17)
	  , isObject   = __webpack_require__(43)
	  , anObject   = __webpack_require__(44)
	  , aFunction  = __webpack_require__(21)
	  , strictNew  = __webpack_require__(45)
	  , forOf      = __webpack_require__(46)
	  , setProto   = __webpack_require__(51).set
	  , same       = __webpack_require__(52)
	  , SPECIES    = __webpack_require__(31)('species')
	  , speciesConstructor = __webpack_require__(53)
	  , asap       = __webpack_require__(54)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};

	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(25)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(59)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(30)(P, PROMISE);
	__webpack_require__(60)(PROMISE);
	Wrapper = __webpack_require__(19)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(40)
	  , TAG = __webpack_require__(31)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(43);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(20)
	  , call        = __webpack_require__(47)
	  , isArrayIter = __webpack_require__(48)
	  , anObject    = __webpack_require__(44)
	  , toLength    = __webpack_require__(49)
	  , getIterFn   = __webpack_require__(50);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(44);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(28)
	  , ITERATOR   = __webpack_require__(31)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(13)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(42)
	  , ITERATOR  = __webpack_require__(31)('iterator')
	  , Iterators = __webpack_require__(28);
	module.exports = __webpack_require__(19).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(5).getDesc
	  , isObject = __webpack_require__(43)
	  , anObject = __webpack_require__(44);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(44)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(31)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , macrotask = __webpack_require__(55).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(40)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(20)
	  , invoke             = __webpack_require__(56)
	  , html               = __webpack_require__(57)
	  , cel                = __webpack_require__(58)
	  , global             = __webpack_require__(18)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(40)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(43)
	  , document = __webpack_require__(18).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(22);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(19)
	  , $           = __webpack_require__(5)
	  , DESCRIPTORS = __webpack_require__(25)
	  , SPECIES     = __webpack_require__(31)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(31)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(7);

	var _cfg = __webpack_require__(6);

	var _effects = __webpack_require__(63);

	var effect = _interopRequireWildcard(_effects);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Texture
	 * @class Texture
	 * @export
	 */

	var Texture = function () {

	    /**
	     * @param {String}   url
	     * @param {Number}   width
	     * @param {Number}   height
	     * @param {Function} resolve
	     * @constructor
	     */

	    function Texture(url, width, height, resolve) {
	        (0, _classCallCheck3.default)(this, Texture);

	        /**
	         * Texture
	         * @type {Object}
	         */
	        this.texture = null;

	        /**
	         * Texture effect
	         * @type {Object}
	         */
	        this.texture_effect = null;

	        /**
	         * Effect texture
	         * @type {Object}
	         */
	        this.effect_sprites = [];

	        /**
	         * Splitted sprites
	         * @type {Array}
	         */
	        this.sprites = [];

	        /**
	         * Image url
	         * @type {String}
	         */
	        this.imgUrl = url;

	        /**
	         * Width
	         * @type {Number}
	         */
	        this.width = 0;

	        /**
	         * Height
	         * @type {Number}
	         */
	        this.height = 0;

	        /**
	         * Sprite width
	         * @type {Number}
	         */
	        this.sWidth = width;

	        /**
	         * Sprite height
	         * @type {Number}
	         */
	        this.sHeight = height;

	        /**
	         * X multiplicator
	         * @type {Number}
	         */
	        this.xMul = 0;

	        /**
	         * Y multiplicator
	         * @type {Number}
	         */
	        this.yMul = 0;

	        /**
	         * Loading state
	         * @type {Boolean}
	         */
	        this.hasLoaded = false;

	        this.fromImage(this.imgUrl, function () {
	            resolve(this);
	        }.bind(this));
	    }

	    /**
	     * @param {String}   url
	     * @param {Function} resolve
	     */

	    (0, _createClass3.default)(Texture, [{
	        key: "fromImage",
	        value: function fromImage(url, resolve) {

	            var img = null;

	            var texture = _utils.TextureCache[url];

	            if (texture !== void 0 && texture instanceof Texture) {
	                this.hasLoaded = true;
	                return _utils.TextureCache[url];
	            }

	            img = new Image();

	            img.addEventListener('load', function () {
	                this.width = img.width;
	                this.height = img.height;
	                this.hasLoaded = true;
	                this.texture = (0, _utils.imageToCanvas)(img);
	                this.splitTexture();
	                _utils.TextureCache[url] = this;
	                this.renderEffects();
	                resolve();
	            }.bind(this));

	            img.src = url;

	            return void 0;
	        }

	        /**
	         * Split texture into seperate sprites
	         */

	    }, {
	        key: "splitTexture",
	        value: function splitTexture() {

	            if (this.sWidth === -1 && this.sHeight === -1) {
	                this.sWidth = this.width / 2;
	                this.sHeight = this.height / 2;
	            }

	            this.xMul = this.height / (this.sWidth * 2);
	            this.yMul = this.width / (this.sHeight * 2);

	            var buffer = null;

	            var ii = 0;

	            var xx = 0;
	            var yy = 0;

	            var width = this.width / (this.sWidth * 2);
	            var height = this.height / (this.sHeight * 2);

	            for (; yy < height;) {
	                for (xx = 0; xx < width; ++xx) {
	                    if (xx === 0) ++yy;
	                    buffer = (0, _utils.createCanvasBuffer)(this.sWidth * 2, this.sHeight * 2);
	                    buffer.drawImage(this.texture.canvas, this.sWidth * 2 * xx, this.sHeight * 2 * (yy - 1), this.width, this.height, 0, 0, this.width, this.height);
	                    this.sprites.push(buffer);
	                    buffer = null;
	                };
	            };
	        }

	        /**
	         * Render texture effects
	         */

	    }, {
	        key: "renderEffects",
	        value: function renderEffects() {
	            this.buildTimeLightning();
	        }

	        /**
	         * Build texture time lightning
	         */

	    }, {
	        key: "buildTimeLightning",
	        value: function buildTimeLightning() {

	            var ii = 0;
	            var length = 0;

	            var buffer = null;

	            var width = 0;
	            var height = 0;

	            length = this.sprites.length;

	            for (; ii < length; ++ii) {
	                width = this.sprites[ii].canvas.width;
	                height = this.sprites[ii].canvas.height;
	                buffer = (0, _utils.createCanvasBuffer)(width, height);
	                buffer.translate(0, height);
	                buffer.scale(1, -1);
	                this.drawTimeLightning(this.sprites[ii], buffer, 0, 0, width, height, _cfg.ColorPalette);
	                buffer.setTransform(1, 0, 0, 1, 0, 0);
	                this.effect_sprites[ii] = buffer;
	                buffer = null;
	            };
	        }
	    }]);
	    return Texture;
	}();

	exports.default = Texture;

	(0, _utils.inherit)(Texture, effect);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drawTimeLightning = drawTimeLightning;
	exports.colorizePixels = colorizePixels;

	var _utils = __webpack_require__(7);

	/**
	 * Draw time based lightning
	 * @param {Object} buffer
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Array}  colors
	 */
	function drawTimeLightning(buffer, ctx, x, y, width, height, colors) {

	  var hour = (0, _utils.getTime)().hours;

	  var imgData = buffer.getImageData(x, y, width, height);

	  this.colorizePixels(imgData, colors[hour][0] / 100, colors[hour][1] / 100, colors[hour][2] / 100, false);

	  ctx.putImageData(imgData, x, y);

	  return void 0;
	};

	/**
	 * Colorize pixels
	 * @param {Object} imgData
	 * @param {Number}  r
	 * @param {Number}  g
	 * @param {Number}  b
	 * @param {Boolean} strict
	 */
	function colorizePixels(imgData, r, g, b, strict) {

	  var ii = 0;
	  var length = 0;

	  var pixels = imgData.data;

	  length = pixels.length;

	  if (strict) {
	    for (; ii < length / 4; ++ii) {
	      if (pixels[ii * 4] > 0) {
	        pixels[ii * 4] = g;
	      }
	      if (pixels[ii * 4 + 1] > 0) {
	        pixels[ii * 4 + 1] = r;
	      }
	      if (pixels[ii * 4 + 2] > 0) {
	        pixels[ii * 4 + 2] = g;
	      }
	      if (pixels[ii * 4 + 3] > 2) {
	        pixels[ii * 4 + 3] = b;
	      }
	    };
	  } else {
	    for (; ii < length / 4; ++ii) {
	      pixels[ii * 4 + 1] = pixels[ii * 4 + 1] / r;
	      pixels[ii * 4 + 2] = pixels[ii * 4 + 2] / g;
	      pixels[ii * 4 + 3] = pixels[ii * 4 + 3] * b;
	    };
	  }

	  return void 0;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _functions = __webpack_require__(88);

	var map = _interopRequireWildcard(_functions);

	var _functions2 = __webpack_require__(105);

	var entity = _interopRequireWildcard(_functions2);

	var _Environment = __webpack_require__(106);

	var _Environment2 = _interopRequireDefault(_Environment);

	var _Renderer = __webpack_require__(117);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Camera = __webpack_require__(131);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Language = __webpack_require__(132);

	var _utils = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Engine
	 * @class Engine
	 * @export
	 */

	var Engine = function (_DisplayObject) {
	    (0, _inherits3.default)(Engine, _DisplayObject);

	    /**
	     * @param {Object} instance
	     * @param {Number} width
	     * @param {Number} height
	     * @constructor
	     */

	    function Engine(instance, width, height) {
	        (0, _classCallCheck3.default)(this, Engine);

	        /**
	         * Instance
	         * @type {Object}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Engine).call(this, null));

	        _this.instance = instance;

	        /**
	         * Active scene state
	         * @type {Boolean}
	         */
	        _this.activeScene = false;

	        /**
	         * Scenes
	         * @type {Object}
	         */
	        _this.scenes = {};

	        /**
	         * Node
	         * @type {Object}
	         */
	        _this.node = _this.instance.canvasNode;

	        /**
	         * WebGL Node
	         * @type {Object}
	         */
	        _this.glNode = _this.instance.glNode;

	        /**
	         * Interface node
	         * @type {Object}
	         */
	        _this.uiNode = _this.instance.uiNode;

	        /**
	         * Context
	         * @type {Object}
	         */
	        _this.context = _this.node.getContext("2d");

	        /**
	         * WebGL context
	         * @type {Object}
	         */
	        _this.glContext = null;

	        /** Attach webgl context */
	        if (_cfg.WGL_SUPPORT && _this.glNode) {
	            _this.glContext = (0, _utils.getWGLContext)(_this.glNode);
	        }

	        /**
	         * Engine size
	         * @type {Number}
	         */
	        _this.width = width || 0;
	        _this.height = height || 0;

	        /**
	         * Camera object
	         * @type {Object}
	         */
	        _this.camera = new _Camera2.default(_this);

	        /**
	         * Parsed maps
	         * @type {Object}
	         */
	        _this.maps = {};

	        /**
	         * Local entity ref
	         * @type {Object}
	         */
	        _this.localEntity = null;

	        /**
	         * Renderer instance
	         * @type {Object}
	         */
	        _this.renderer = new _Renderer2.default(_this);

	        /**
	         * Editor instance
	         * @type {Object}
	         */
	        _this.editor = null;

	        /**
	         * MiniMap instance
	         * @type {Object}
	         */
	        _this.mini = null;

	        /**
	         * Environment instance
	         * @type {Object}
	         */
	        _this.environment = new _Environment2.default(_this);

	        /**
	         * Connection instance
	         * @type {Object}
	         */
	        _this.connection = null;

	        _this.initScenes();

	        return _this;
	    }

	    /**
	     * Initialise scenes
	     */

	    (0, _createClass3.default)(Engine, [{
	        key: "initScenes",
	        value: function initScenes() {

	            for (var scene in this.instance.scenes) {
	                this.scenes[scene] = new this.instance.scenes[scene](this);
	            };
	        }

	        /**
	         * Resize scenes
	         */

	    }, {
	        key: "resizeScenes",
	        value: function resizeScenes() {

	            for (var scene in this.scenes) {
	                if (this.scenes[scene].active === true) {
	                    this.scenes[scene].updatePositions();
	                    this.scenes[scene].render();
	                    this.scenes[scene].draw();
	                }
	            };
	        }

	        /**
	         * Add a world
	         */

	    }, {
	        key: "addWorld",
	        value: function addWorld(path, resolve) {

	            (0, _utils.ajax)(path).then(function (data) {
	                var world = new Function(data)();
	                console.log(world);
	                if (resolve instanceof Function) {
	                    return resolve();
	                }
	            }.bind(this));
	        }

	        /**
	         * @param {Number} width
	         * @setter
	         */

	    }, {
	        key: "sort",

	        /**
	         * Sort layers and entities
	         */
	        value: function sort() {

	            this.depthSort(this.currentMap.entities);

	            return void 0;
	        }

	        /**
	         * @param {Array} array
	         */

	    }, {
	        key: "depthSort",
	        value: function depthSort(array) {

	            var ii = 0;
	            var jj = 0;

	            var key = null;

	            var length = array.length;

	            for (; ii < length; ++ii) {
	                jj = ii;
	                key = array[jj];
	                for (; jj > 0 && (array[jj - 1].position.y + -(array[jj - 1].z * 2) + array[jj - 1].yMargin + array[jj - 1].size.y * array[jj - 1].scale) * array[jj - 1].zIndex > (key.position.y + -(key.z * 2) + key.yMargin + key.size.y * key.scale) * key.zIndex; --jj) {
	                    array[jj] = array[jj - 1];
	                };
	                array[jj] = key;
	            };

	            return void 0;
	        }

	        /**
	         * Trigger a ping
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "ping",
	        value: function ping(x, y) {

	            var offset = this.camera.getGameMouseOffset(x, y);

	            var map = this.currentMap;

	            var tpl = map.objectTemplates["ping"];

	            tpl.x = offset.x;
	            tpl.y = offset.y;
	            tpl.z = 0;

	            var pushEntity = map.addEntity(tpl);

	            pushEntity.opacity = .0;

	            pushEntity.fadeIn(2);

	            pushEntity.lifeTime = this.renderer.now + 60;

	            map.entities.push(pushEntity);
	        }

	        /**
	         * Local entity walk to
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "walkTo",
	        value: function walkTo(x, y) {

	            var ii = 0;
	            var length = 0;

	            var lastX = this.instance.localEntity.x;
	            var lastY = this.instance.localEntity.y;

	            var xx = 0;
	            var yy = 0;

	            var offset = this.camera.getGameMouseOffset(x, y);

	            var dir = 0;

	            var path = this.instance.currentMap.path.getShortestPath(this.instance.localEntity.x, this.instance.localEntity.y, offset.x, offset.y);

	            if (path === void 0 || path === null || path.length <= 0) return void 0;

	            length = path.length;

	            for (; ii < length; ++ii) {
	                xx = path[ii].x * _cfg.DIMENSION;
	                yy = path[ii].y * _cfg.DIMENSION;
	                if (xx !== lastX) {
	                    dir = xx < lastX ? _cfg.LEFT : _cfg.RIGHT;
	                } else {
	                    if (yy !== lastY) {
	                        dir = yy < lastY ? _cfg.UP : _cfg.DOWN;
	                    }
	                }
	                this.instance.localEntity.animations.push({
	                    type: "walk",
	                    facing: dir,
	                    obstacle: false,
	                    x: xx,
	                    y: yy,
	                    oX: this.instance.localEntity.x,
	                    oY: this.instance.localEntity.y
	                });
	                lastX = xx;
	                lastY = yy;
	            };
	        }
	    }, {
	        key: "width",
	        set: function set(width) {
	            this.width = width || 0;
	            this.camera.width = this.width;
	        }

	        /**
	         * @param {Number} height
	         * @setter
	         */

	    }, {
	        key: "height",
	        set: function set(height) {
	            this.height = height || 0;
	            this.camera.height = this.height;
	        }
	    }]);
	    return Engine;
	}(_DisplayObject3.default);

	exports.default = Engine;

	(0, _utils.inherit)(Engine, map);
	(0, _utils.inherit)(Engine, entity);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	module.exports = __webpack_require__(19).Object.getPrototypeOf;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(68);

	__webpack_require__(69)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(14);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(17)
	  , core    = __webpack_require__(19)
	  , fails   = __webpack_require__(26);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _symbol = __webpack_require__(72);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof _Symbol !== "undefined" && obj.constructor === _Symbol ? "symbol" : typeof obj; }

	exports.default = function (obj) {
	  return obj && typeof _symbol2.default !== "undefined" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(10);
	module.exports = __webpack_require__(19).Symbol;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(5)
	  , global         = __webpack_require__(18)
	  , has            = __webpack_require__(27)
	  , DESCRIPTORS    = __webpack_require__(25)
	  , $export        = __webpack_require__(17)
	  , redefine       = __webpack_require__(22)
	  , $fails         = __webpack_require__(26)
	  , shared         = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(30)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(31)
	  , keyOf          = __webpack_require__(75)
	  , $names         = __webpack_require__(76)
	  , enumKeys       = __webpack_require__(77)
	  , isArray        = __webpack_require__(78)
	  , anObject       = __webpack_require__(44)
	  , toIObject      = __webpack_require__(38)
	  , createDesc     = __webpack_require__(24)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(16)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(5)
	  , toIObject = __webpack_require__(38);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(38)
	  , getNames  = __webpack_require__(5).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(5);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(40);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(80);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(83);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(19).Object.setPrototypeOf;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(17);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(51).set});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(6);

	var _seed = __webpack_require__(86);

	var randSeed = _interopRequireWildcard(_seed);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Math
	 * @class Math
	 * @export
	 */

	var Math = function () {

	  /**
	   * @constructor
	   */

	  function Math() {
	    (0, _classCallCheck3.default)(this, Math);
	  }

	  /**
	   * Seed
	   * @getter
	   */

	  (0, _createClass3.default)(Math, null, [{
	    key: "clamp",

	    /**
	     * Clamp
	     * @param  {Number} value
	     * @param  {Number} min
	     * @param  {Number} max
	     * @return {Number}
	     */
	    value: function clamp(value, min, max) {
	      return window.Math.min(max, window.Math.max(min, value));
	    }

	    /**
	     * Get closest point
	     * @param  {Array} array
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Number} index
	     */

	  }, {
	    key: "get2DClosest",
	    value: function get2DClosest(array, x, y) {

	      var ii = 0;
	      var length = array.length;

	      var distance = null;

	      var distances = [];

	      for (; ii < length; ++ii) {
	        distance = this.distance(array[ii].x, array[ii].y, x, y + array[ii].height / 2);
	        distance.index = ii;
	        distance.width = array[ii].width;
	        distance.height = array[ii].height;
	        distances.push(distance);
	      };

	      /**
	       * Depth sorting
	       * ^= y - (width * height)
	       */
	      (function (array) {

	        var ii = 0;
	        var jj = 0;

	        var key = null;

	        var length = array.length;

	        for (; ii < length; ++ii) {
	          jj = ii;
	          key = array[jj];
	          for (; jj > 0 && array[jj - 1].y > key.y; --jj) {
	            array[jj] = array[jj - 1];
	          };
	          array[jj] = key;
	        };

	        return void 0;
	      })(distances);

	      return distances[distances.length - 1].index;
	    }

	    /**
	     * Linear intersection
	     * @param {Number} xx
	     * @param {Number} yy
	     * @param {Number} width
	     * @param {Number} height
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} scale
	     * @return {Boolean}
	     */

	  }, {
	    key: "linearIntersect",
	    value: function linearIntersect(xx, yy, width, height, x, y, scale) {
	      return window.Math.abs(2 * (x - xx * scale) + -(width * scale)) <= width * scale && window.Math.abs(2 * (y - yy * scale) + -(height * scale)) <= height * scale;
	    }

	    /**
	     * Cubic collision
	     * @param {Number} x1
	     * @param {Number} y1
	     * @param {Number} w1
	     * @param {Number} h1
	     * @param {Number} x2
	     * @param {Number} y2
	     * @param {Number} w2
	     * @param {Number} h2
	     * @return {Boolean}
	     */

	  }, {
	    key: "cubicCollision",
	    value: function cubicCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
	      return !(y1 + h1 < y2 || y1 > y2 + h2 || x1 + w1 < x2 || x1 > x2 + w2);
	    }

	    /**
	     * Round integer to its nearst X integer
	     * @param  {Number} a Number
	     * @param  {Number} b Round to
	     * @return {Number}
	     */

	  }, {
	    key: "roundTo",
	    value: function roundTo(a, b) {
	      b = 1 / b;
	      return window.Math.round(a * b) / b;
	    }

	    /**
	     * Zoom scale
	     * @param  {Number} factor
	     * @return {Number}
	     */

	  }, {
	    key: "zoomScale",
	    value: function zoomScale(factor) {
	      return factor >= 0 ? factor + 1 : factor < 0 ? -factor + 1 : factor + 1;
	    }

	    /**
	     * Hypotenuse
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Number}
	     */

	  }, {
	    key: "hypot",
	    value: function hypot(x, y) {
	      return window.Math.sqrt(x * x + y * y);
	    }

	    /**
	     * Distance between two points
	     * @param {Number} x1
	     * @param {Number} y1
	     * @param {Number} x2
	     * @param {Number} y2
	     * @return {Object}
	     */

	  }, {
	    key: "distance",
	    value: function distance(x1, y1, x2, y2) {

	      var x = window.Math.sqrt(window.Math.pow(x1 - x2, 2));
	      var y = window.Math.sqrt(window.Math.pow(y1 - y2, 2));

	      return {
	        x: x1 - x2 < 0 ? -x : x,
	        y: y1 - y2 < 0 ? -y : y
	      };
	    }

	    /**
	     * Sinus ease
	     * @param  {Number} n
	     * @return {Number}
	     */

	  }, {
	    key: "ease",
	    value: function ease(n) {
	      return .5 + window.Math.sin((n - .5) * window.Math.PI) / 2;
	    }

	    /**
	     * Get tile position
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} dir
	     */

	  }, {
	    key: "getTilePosition",
	    value: function getTilePosition(x, y, dir) {

	      var facing = -1;

	      var x = x;
	      var y = y;

	      switch (dir) {
	        case _cfg.LEFT:
	          x -= _cfg.DIMENSION;
	          facing = 3;
	          break;
	        case _cfg.UP:
	          y -= _cfg.DIMENSION;
	          facing = 1;
	          break;
	        case _cfg.RIGHT:
	          x += _cfg.DIMENSION;
	          facing = 2;
	          break;
	        case _cfg.DOWN:
	          y += _cfg.DIMENSION;
	          facing = 0;
	          break;
	        default:
	          facing = 0;
	          break;
	      };

	      return {
	        x: x,
	        y: y,
	        facing: facing
	      };
	    }
	  }, {
	    key: "Seed",
	    get: function get() {

	      return(
	        /**
	         * Seed
	         * @class Seed
	         */
	        function () {

	          /**
	           * @constructor
	           * @param {String} seed
	           */

	          function Seed(seed) {
	            (0, _classCallCheck3.default)(this, Seed);

	            /**
	             * Seed
	             * @type {String}
	             */
	            this.seed = seed;

	            this.generator = randSeed.create(this.seed);
	          }

	          /**
	           * Get a randomized float
	           * based on own seed
	           * @return {Number}
	           */

	          (0, _createClass3.default)(Seed, [{
	            key: "random",
	            value: function random() {
	              return this.generator(1e9);
	            }
	          }]);
	          return Seed;
	        }()
	      );
	    }

	    /**
	     * Point
	     * @getter
	     */

	  }, {
	    key: "Point",
	    get: function get() {

	      return(
	        /**
	         * Point
	         * @class Point
	         */
	        function () {

	          /**
	           * @param {Number} x
	           * @param {Number} y
	           * @constructor
	           */

	          function Point(x, y) {
	            (0, _classCallCheck3.default)(this, Point);

	            this.x = x || 0;
	            this.y = y || 0;
	          }

	          /**
	           * @param {Number} x
	           * @param {Number} y
	           */

	          (0, _createClass3.default)(Point, [{
	            key: "set",
	            value: function set(x, y) {
	              this.x = x;
	              this.y = y;
	            }

	            /**
	             * Round point
	             */

	          }, {
	            key: "round",
	            value: function round() {
	              this.x <<= 0;
	              this.y <<= 0;
	            }
	          }]);
	          return Point;
	        }()
	      );
	    }
	  }]);
	  return Math;
	}();

	exports.default = Math;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * random-seed
	 * https://github.com/skratchdot/random-seed
	 *
	 * This code was originally written by Steve Gibson and can be found here:
	 *
	 * https://www.grc.com/otg/uheprng.htm
	 *
	 * It was slightly modified for use in node, to pass jshint, and a few additional
	 * helper functions were added.
	 *
	 * Copyright (c) 2013 skratchdot
	 * Dual Licensed under the MIT license and the original GRC copyright/license
	 * included below.
	 */
	/*  ============================================================================
	                  Gibson Research Corporation
	        UHEPRNG - Ultra High Entropy Pseudo-Random Number Generator
	  ============================================================================
	  LICENSE AND COPYRIGHT:  THIS CODE IS HEREBY RELEASED INTO THE PUBLIC DOMAIN
	  Gibson Research Corporation releases and disclaims ALL RIGHTS AND TITLE IN
	  THIS CODE OR ANY DERIVATIVES. Anyone may be freely use it for any purpose.
	  ============================================================================
	  This is GRC's cryptographically strong PRNG (pseudo-random number generator)
	  for JavaScript. It is driven by 1536 bits of entropy, stored in an array of
	  48, 32-bit JavaScript variables.  Since many applications of this generator,
	  including ours with the "Off The Grid" Latin Square generator, may require
	  the deteriministic re-generation of a sequence of PRNs, this PRNG's initial
	  entropic state can be read and written as a static whole, and incrementally
	  evolved by pouring new source entropy into the generator's internal state.
	  ----------------------------------------------------------------------------
	  ENDLESS THANKS are due Johannes Baagoe for his careful development of highly
	  robust JavaScript implementations of JS PRNGs.  This work was based upon his
	  JavaScript "Alea" PRNG which is based upon the extremely robust Multiply-
	  With-Carry (MWC) PRNG invented by George Marsaglia. MWC Algorithm References:
	  http://www.GRC.com/otg/Marsaglia_PRNGs.pdf
	  http://www.GRC.com/otg/Marsaglia_MWC_Generators.pdf
	  ----------------------------------------------------------------------------
	  The quality of this algorithm's pseudo-random numbers have been verified by
	  multiple independent researchers. It handily passes the fermilab.ch tests as
	  well as the "diehard" and "dieharder" test suites.  For individuals wishing
	  to further verify the quality of this algorithm's pseudo-random numbers, a
	  256-megabyte file of this algorithm's output may be downloaded from GRC.com,
	  and a Microsoft Windows scripting host (WSH) version of this algorithm may be
	  downloaded and run from the Windows command prompt to generate unique files
	  of any size:
	  The Fermilab "ENT" tests: http://fourmilab.ch/random/
	  The 256-megabyte sample PRN file at GRC: https://www.GRC.com/otg/uheprng.bin
	  The Windows scripting host version: https://www.GRC.com/otg/wsh-uheprng.js
	  ----------------------------------------------------------------------------
	  Qualifying MWC multipliers are: 187884, 686118, 898134, 1104375, 1250205,
	  1460910 and 1768863. (We use the largest one that's < 2^21)
	  ============================================================================ */
	'use strict';

	var stringify = __webpack_require__(87);

	/*  ============================================================================
	This is based upon Johannes Baagoe's carefully designed and efficient hash
	function for use with JavaScript.  It has a proven "avalanche" effect such
	that every bit of the input affects every bit of the output 50% of the time,
	which is good.  See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
	============================================================================
	*/
	var Mash = function Mash() {
	  var n = 0xefc8249d;
	  var mash = function mash(data) {
	    if (data) {
	      data = data.toString();
	      for (var i = 0; i < data.length; i++) {
	        n += data.charCodeAt(i);
	        var h = 0.02519603282416938 * n;
	        n = h >>> 0;
	        h -= n;
	        h *= n;
	        n = h >>> 0;
	        h -= n;
	        n += h * 0x100000000; // 2^32
	      }
	      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	    } else {
	        n = 0xefc8249d;
	      }
	  };
	  return mash;
	};

	var uheprng = function uheprng(seed) {
	  return function () {
	    var o = 48; // set the 'order' number of ENTROPY-holding 32-bit values
	    var c = 1; // init the 'carry' used by the multiply-with-carry (MWC) algorithm
	    var p = o; // init the 'phase' (max-1) of the intermediate variable pointer
	    var s = new Array(o); // declare our intermediate variables array
	    var i; // general purpose local
	    var j; // general purpose local
	    var k = 0; // general purpose local

	    // when our "uheprng" is initially invoked our PRNG state is initialized from the
	    // browser's own local PRNG. This is okay since although its generator might not
	    // be wonderful, it's useful for establishing large startup entropy for our usage.
	    var mash = new Mash(); // get a pointer to our high-performance "Mash" hash

	    // fill the array with initial mash hash values
	    for (i = 0; i < o; i++) {
	      s[i] = mash(Math.random());
	    }

	    // this PRIVATE (internal access only) function is the heart of the multiply-with-carry
	    // (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
	    // 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
	    // [0-1] return function, and by the random 'string(n)' function which returns 'n'
	    // characters from 33 to 126.
	    var rawprng = function rawprng() {
	      if (++p >= o) {
	        p = 0;
	      }
	      var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
	      return s[p] = t - (c = t | 0);
	    };

	    // this EXPORTED function is the default function returned by this library.
	    // The values returned are integers in the range from 0 to range-1. We first
	    // obtain two 32-bit fractions (from rawprng) to synthesize a single high
	    // resolution 53-bit prng (0 to <1), then we multiply this by the caller's
	    // "range" param and take the "floor" to return a equally probable integer.
	    var random = function random(range) {
	      return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); // 2^-53
	    };

	    // this EXPORTED function 'string(n)' returns a pseudo-random string of
	    // 'n' printable characters ranging from chr(33) to chr(126) inclusive.
	    random.string = function (count) {
	      var i;
	      var s = '';
	      for (i = 0; i < count; i++) {
	        s += String.fromCharCode(33 + random(94));
	      }
	      return s;
	    };

	    // this PRIVATE "hash" function is used to evolve the generator's internal
	    // entropy state. It is also called by the EXPORTED addEntropy() function
	    // which is used to pour entropy into the PRNG.
	    var hash = function hash() {
	      var args = Array.prototype.slice.call(arguments);
	      for (i = 0; i < args.length; i++) {
	        for (j = 0; j < o; j++) {
	          s[j] -= mash(args[i]);
	          if (s[j] < 0) {
	            s[j] += 1;
	          }
	        }
	      }
	    };

	    // this EXPORTED "clean string" function removes leading and trailing spaces and non-printing
	    // control characters, including any embedded carriage-return (CR) and line-feed (LF) characters,
	    // from any string it is handed. this is also used by the 'hashstring' function (below) to help
	    // users always obtain the same EFFECTIVE uheprng seeding key.
	    random.cleanString = function (inStr) {
	      inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ''); // remove any/all leading spaces
	      inStr = inStr.replace(/[\x00-\x1F]/gi, ''); // remove any/all control characters
	      inStr = inStr.replace(/\n /, '\n'); // remove any/all trailing spaces
	      return inStr; // return the cleaned up result
	    };

	    // this EXPORTED "hash string" function hashes the provided character string after first removing
	    // any leading or trailing spaces and ignoring any embedded carriage returns (CR) or Line Feeds (LF)
	    random.hashString = function (inStr) {
	      inStr = random.cleanString(inStr);
	      mash(inStr); // use the string to evolve the 'mash' state
	      for (i = 0; i < inStr.length; i++) {
	        // scan through the characters in our string
	        k = inStr.charCodeAt(i); // get the character code at the location
	        for (j = 0; j < o; j++) {
	          //  "mash" it into the UHEPRNG state
	          s[j] -= mash(k);
	          if (s[j] < 0) {
	            s[j] += 1;
	          }
	        }
	      }
	    };

	    // this EXPORTED function allows you to seed the random generator.
	    random.seed = function (seed) {
	      if (typeof seed === 'undefined' || seed === null) {
	        seed = Math.random();
	      }
	      if (typeof seed !== 'string') {
	        seed = stringify(seed, function (key, value) {
	          if (typeof value === 'function') {
	            return value.toString();
	          }
	          return value;
	        });
	      }
	      random.initState();
	      random.hashString(seed);
	    };

	    // this handy exported function is used to add entropy to our uheprng at any time
	    random.addEntropy = function () /* accept zero or more arguments */{
	      var args = [];
	      for (i = 0; i < arguments.length; i++) {
	        args.push(arguments[i]);
	      }
	      hash(k++ + new Date().getTime() + args.join('') + Math.random());
	    };

	    // if we want to provide a deterministic startup context for our PRNG,
	    // but without directly setting the internal state variables, this allows
	    // us to initialize the mash hash and PRNG's internal state before providing
	    // some hashing input
	    random.initState = function () {
	      mash(); // pass a null arg to force mash hash to init
	      for (i = 0; i < o; i++) {
	        s[i] = mash(' '); // fill the array with initial mash hash values
	      }
	      c = 1; // init our multiply-with-carry carry
	      p = o; // init our phase
	    };

	    // we use this (optional) exported function to signal the JavaScript interpreter
	    // that we're finished using the "Mash" hash function so that it can free up the
	    // local "instance variables" is will have been maintaining.  It's not strictly
	    // necessary, of course, but it's good JavaScript citizenship.
	    random.done = function () {
	      mash = null;
	    };

	    // if we called "uheprng" with a seed value, then execute random.seed() before returning
	    if (typeof seed !== 'undefined') {
	      random.seed(seed);
	    }

	    // Returns a random integer between 0 (inclusive) and range (exclusive)
	    random.range = function (range) {
	      return random(range);
	    };

	    // Returns a random float between 0 (inclusive) and 1 (exclusive)
	    random.random = function () {
	      return random(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
	    };

	    // Returns a random float between min (inclusive) and max (exclusive)
	    random.floatBetween = function (min, max) {
	      return random.random() * (max - min) + min;
	    };

	    // Returns a random integer between min (inclusive) and max (inclusive)
	    random.intBetween = function (min, max) {
	      return Math.floor(random.random() * (max - min + 1)) + min;
	    };

	    // when our main outer "uheprng" function is called, after setting up our
	    // initial variables and entropic state, we return an "instance pointer"
	    // to the internal anonymous function which can then be used to access
	    // the uheprng's various exported functions.  As with the ".done" function
	    // above, we should set the returned value to 'null' once we're finished
	    // using any of these functions.
	    return random;
	  }();
	};

	// Modification for use in node:
	uheprng.create = function (seed) {
	  return new uheprng(seed);
	};
	module.exports = uheprng;

/***/ },
/* 87 */
/***/ function(module, exports) {

	exports = module.exports = stringify
	exports.getSerialize = serializer

	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}

	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = []

	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  }

	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this)
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
	    }
	    else stack.push(value)

	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addMap = addMap;
	exports.distance = distance;

	var _utils = __webpack_require__(7);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _Map = __webpack_require__(89);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Add a new map
	 * @param {String}   path
	 * @param {Function} resolve
	 */
	function addMap(path, resolve) {

	  (0, _utils.ajax)(path).then(JSON.parse).then(function (data) {
	    data.path = (0, _utils.getPath)(path);
	    var map = new _Map2.default(data, function () {
	      map.instance = this;
	      this.maps[map.name] = map;
	      this.currentMap = this.maps[map.name];
	      return resolve();
	    }.bind(this));
	  }.bind(this));
	}

	/**
	 * Measure distance between entity and camera
	 * @param {Object} entity
	 * @param {Object} camera
	 * @return {Object}
	 */
	function distance(entity, camera) {

	  var distance = _Math2.default.distance(entity.x, entity.y, (camera.size.x / 2 - camera.position.x) / camera.resolution, (camera.size.y / 2 - camera.position.y) / camera.resolution);

	  distance.x /= 10;
	  distance.y /= 10;

	  return distance;
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(7);

	var _MapEntity = __webpack_require__(97);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Texture = __webpack_require__(62);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Path = __webpack_require__(101);

	var _Path2 = _interopRequireDefault(_Path);

	var _events = __webpack_require__(104);

	var events = _interopRequireWildcard(_events);

	var _functions = __webpack_require__(88);

	var functions = _interopRequireWildcard(_functions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Map
	 * @class Map
	 * @export
	 */

	var Map = function (_DisplayObject) {
	  (0, _inherits3.default)(Map, _DisplayObject);

	  /**
	   * @param {Object}   obj
	   * @param {Function} resolve
	   * @constructor
	   */

	  function Map(obj, resolve) {
	    (0, _classCallCheck3.default)(this, Map);

	    /**
	     * Tileset
	     * @type {String}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Map).call(this, null));

	    _this.tileset = obj.tileset;

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * Map buffers
	     * @type {Object}
	     */
	    _this.buffers = {};

	    /** Map size */
	    _this.width = obj.width;
	    _this.height = obj.height;

	    /**
	     * Map name
	     * @type {String}
	     */
	    _this.name = obj.name;

	    /**
	     * Layers
	     * @type {Array}
	     */
	    _this.layers = obj.layers;

	    /**
	     * Map objects
	     * @type {Object}
	     */
	    _this.objects = {};

	    /**
	     * Object templates
	     * @type {Array}
	     */
	    _this.objTpl = [];

	    /**
	     * Map object templates
	     * @type {Object}
	     */
	    _this.objectTemplates = {};

	    /**
	     * Map entities
	     * @type {Array}
	     */
	    _this.entities = [];

	    /**
	     * Map path
	     * @type {Object}
	     */
	    _this.mapPath = obj.path;

	    /**
	     * Path ref
	     * @type {Object}
	     */
	    _this.path = null;

	    /**
	     * Collision layer ref
	     * @type {Object}
	     */
	    _this.collisionLayer = null;

	    /** Load texture */
	    (0, _utils.getSprite)(_this.tileset, -1, -1, function (texture) {
	      this.texture = _utils.TextureCache[this.tileset];
	      this.parseLayers();
	      /** Attach path finder */
	      this.path = new _Path2.default(this.collisionLayer.data);
	      _utils.Maps[this.name] = this;
	      this.loadMapFile(function () {
	        if (resolve instanceof Function) resolve();
	      }.bind(this));
	    }.bind(_this));

	    return _this;
	  }

	  /**
	   * Load map settings
	   * @param {Object} obj
	   */

	  (0, _createClass3.default)(Map, [{
	    key: "loadMapSettings",
	    value: function loadMapSettings(obj) {

	      for (var key in obj) {
	        if (this[key] !== void 0) {
	          this[key] = obj[key];
	        }
	      };
	    }

	    /**
	     * Load map file
	     * @param {Function} resolve
	     */

	  }, {
	    key: "loadMapFile",
	    value: function loadMapFile(resolve) {

	      var path = this.mapPath + this.name.toLowerCase() + ".js";

	      (0, _utils.ajax)(path).then(function (data) {
	        var map = new Function(data)();
	        this.entities = map.entities;
	        if (map.settings !== void 0) {
	          this.loadMapSettings(map.settings);
	        }
	        this.loadMapObjectTypes();
	        this.loadMapObjects(function () {
	          if (resolve instanceof Function) {
	            return resolve();
	          }
	        });
	      }.bind(this));
	    }

	    /**
	     * Load all map object types
	     */

	  }, {
	    key: "loadMapObjectTypes",
	    value: function loadMapObjectTypes() {

	      var ii = 0;
	      var length = this.entities.length;

	      var entity = null;

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

	  }, {
	    key: "loadMapObjects",
	    value: function loadMapObjects(resolve) {
	      var _this2 = this;

	      var length = this.objTpl.length;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var key = _step.value;

	          var path = _this2.mapPath + "objects/" + key;
	          (0, _utils.ajax)(path + ".json").then(JSON.parse).then(function (data) {
	            data.sprite = path + ".png";
	            this.objects[key] = data;
	            if (--length <= 0) {
	              this.buildEntities();
	              return resolve();
	            }
	          }.bind(_this2));
	        };

	        for (var _iterator = (0, _getIterator3.default)(this.objTpl), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Fusionize entity
	     * @param {Function} resolve
	     */

	  }, {
	    key: "buildEntities",
	    value: function buildEntities(resolve) {

	      var ii = 0;
	      var length = 0;

	      var name = null;

	      length = this.entities.length;

	      for (; ii < length; ++ii) {
	        name = this.entities[ii].type;
	        this.objectTemplates[name] = this.objects[this.entities[ii].type];
	        this.entities[ii] = this.addEntity(this.inheritProperties(this.entities[ii], this.objects[this.entities[ii].type]));
	      };
	    }
	  }, {
	    key: "inheritProperties",
	    value: function inheritProperties(entity, parent) {

	      var key = null;

	      for (key in parent) {
	        if (entity.hasOwnProperty(key) === false) {
	          entity[key] = parent[key];
	        }
	      };

	      return entity;
	    }

	    /**
	     * Add entity to map
	     * @param {Object} obj
	     */

	  }, {
	    key: "addEntity",
	    value: function addEntity(obj) {
	      return new _MapEntity2.default(obj);
	    }

	    /**
	     * Parse map layers
	     */

	  }, {
	    key: "parseLayers",
	    value: function parseLayers() {

	      var width = this.width * (_cfg.DIMENSION * 2) << 0;
	      var height = this.height * (_cfg.DIMENSION * 2) << 0;

	      var buffer = null;

	      var key = null;
	      var layer = null;

	      for (key in this.layers) {
	        layer = this.layers[key];
	        if (layer.collision === true) {
	          this.collisionLayer = layer;
	          continue;
	        }
	        buffer = (0, _utils.createCanvasBuffer)(width, height);
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

	  }, {
	    key: "renderLayer",
	    value: function renderLayer(buffer, layer) {

	      var dim = _cfg.DIMENSION * 2;

	      var tile = 0;

	      var x = 0;
	      var y = 0;
	      var xx = 0;
	      var yy = 0;

	      var tileset = this.texture.effect_sprites[0].canvas;

	      var outerLength = layer.length;
	      var innerLength = 0;

	      for (; yy < outerLength; ++yy) {
	        for (!(xx = x = 0) && (innerLength = layer[yy].length) > 0; xx < innerLength; ++xx) {
	          tile = layer[yy][xx] - 1;
	          buffer.drawImage(tileset, tile % dim * dim, (tile / dim << 0) * dim, dim, dim, x, y, dim, dim);
	          x += dim;
	        };
	        y += dim;
	      };

	      return void 0;
	    }
	  }]);
	  return Map;
	}(_DisplayObject3.default);

	exports.default = Map;

	(0, _utils.inherit)(Map, events);
	(0, _utils.inherit)(Map, functions);

/***/ },
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	__webpack_require__(11);
	module.exports = __webpack_require__(96);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(44)
	  , get      = __webpack_require__(50);
	module.exports = __webpack_require__(19).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Entity2 = __webpack_require__(98);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * MapEntity
	 * @class MapEntity
	 * @export
	 */

	var MapEntity = function (_Entity) {
	    (0, _inherits3.default)(MapEntity, _Entity);

	    /**
	     * @param {Object} obj
	     * @constructor
	     */

	    function MapEntity(obj) {
	        var _ret;

	        (0, _classCallCheck3.default)(this, MapEntity);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MapEntity).call(this, obj));

	        _this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

	        _this.frames = [0, 0];

	        _this.facing = 0;

	        _this.opacity = obj.opacity === void 0 ? 1.0 : obj.opacity;

	        _this.scale = obj.scale === void 0 ? 1.0 : obj.scale;

	        _this.frame = 1;

	        _this.reversed = [0, 0];

	        _this.reverseShadow = [0, 0];

	        if (obj.collisionBox !== void 0) {
	            _this.collisionBox = obj.collisionBox;
	        }

	        return _ret = _this, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }

	    /**
	     * Get frame index
	     * @return {Number}
	     */

	    (0, _createClass3.default)(MapEntity, [{
	        key: "getFrameIndex",
	        value: function getFrameIndex() {
	            return 0;
	        }
	    }]);
	    return MapEntity;
	}(_Entity3.default);

	exports.default = MapEntity;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(7);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Texture = __webpack_require__(62);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Shadow = __webpack_require__(100);

	var _Shadow2 = _interopRequireDefault(_Shadow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Entity
	 * @class Entity
	 * @export
	 */

	var Entity = function (_DisplayObject) {
	  (0, _inherits3.default)(Entity, _DisplayObject);

	  /**
	   * @param {Object} obj
	   * @constructor
	   */

	  function Entity(obj) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, Entity);

	    /**
	     * Name
	     * @type {String}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Entity).call(this, null));

	    _this.name = obj.name || null;

	    /**
	     * Last position
	     * @type {Object}
	     */
	    _this.last = new _Math2.default.Point();

	    /**
	     * States
	     * @type {Object}
	     */
	    _this.STATES = {
	      JUMPING: false,
	      LOCK: false,
	      EDITING: false
	    };

	    /**
	     * Socket
	     * @type {Object}
	     */
	    _this.socket = null;

	    /**
	     * Life time
	     * @type {Number}
	     */
	    _this.lifeTime = 0;

	    /**
	     * Z priority
	     * @type {Number}
	     */
	    _this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

	    /**
	     * Collidable
	     * @type {Boolean}
	     */
	    _this.collidable = obj.collidable || false;

	    /**
	     * Collision box
	     * @type {Array}
	     */
	    _this.collisionBox = obj.collisionBox === void 0 ? [] : obj.collisionBox;

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * Animation
	     * @type {Boolean}
	     */
	    _this.animation = obj.animation === true || false;

	    /**
	     * Animation start
	     * @type {Number}
	     */
	    _this.animationStart = obj.animationStart === void 0 ? 0 : obj.animationStart;

	    /**
	     * Animation speed
	     * @type {Number}
	     */
	    _this.animationSpeed = obj.animationSpeed === void 0 ? 300 : obj.animationSpeed;

	    /**
	     * Looped animation
	     * @type {Boolean}
	     */
	    _this.loop = obj.loop === void 0 ? false : obj.loop;

	    /**
	     * Animation frames
	     * @type {Number}
	     */
	    _this.animationFrames = obj.animationFrames === void 0 ? 0 : obj.animationFrames;

	    /**
	     * Frames
	     * @type {Array}
	     */
	    _this.frames = obj.frames === void 0 ? [0] : obj.frames;

	    /**
	     * Sprite frame
	     * @type {Number}
	     */
	    _this.sFrame = 0;

	    /**
	     * Current frame
	     * @type {Number}
	     */
	    _this.frame = 0;

	    /**
	     * Last frame
	     * @type {Number}
	     */
	    _this.lastFrame = 0;

	    /**
	     * Opacity
	     * @type {Number}
	     */
	    _this.opacity = .0;

	    /**
	     * Gravity
	     * @type {Number}
	     */
	    _this.gravity = _cfg.GRAVITY;

	    /**
	     * Sprite
	     * @type {String}
	     */
	    _this.sprite = obj.sprite;

	    /**
	     * Reversed facing
	     * @type {Array}
	     */
	    _this.reversed = [2, 3, 0, 1];

	    /**
	     * Reverse shadow
	     * @type {Array}
	     */
	    _this.reverseShadow = [2, 3, 1, 0];

	    /**
	     * Entity scale
	     * @type {Number}
	     */
	    _this.scale = obj.scale === void 0 ? 1 : obj.scale;

	    /**
	     * Animations
	     * @type {Array}
	     */
	    _this.animations = [];

	    /**
	     * Shadow entity ref
	     * @type {Object}
	     */
	    _this.shadow = null;

	    /**
	     * Entity has shadow
	     * @type {Boolean}
	     */
	    _this.hasShadow = obj.shadow === void 0 ? true : obj.shadow;

	    /**
	     * Animation index
	     * @type {Number}
	     */
	    _this.animationIndex = 0;

	    /**
	     * Sprite margin
	     * @type {Number}
	     */
	    _this.xMargin = 0;
	    _this.yMargin = 0;

	    /**
	     * Sizes
	     * @type {Number}
	     */
	    _this.width = 0;
	    _this.height = 0;

	    /**
	     * Position
	     * @type {Number}
	     */
	    _this.x = 0;
	    _this.y = 0;

	    /**
	     * Z axis position
	     * @type {Number}
	     */
	    _this.z = .0;

	    /**
	     * Velocity
	     * @type {Number}
	     */
	    _this.velocity = 1.0;

	    /**
	     * Orbiting
	     * @type {Boolean}
	     */
	    _this.orbit = false;

	    /**
	     * Orbit angle
	     * @type {Number}
	     */
	    _this.orbitAngle = 0;

	    /**
	     * Target to orbit
	     * @type {Object}
	     */
	    _this.orbitTarget = null;

	    /**
	     * Stop orbit
	     * @type {Boolean}
	     */
	    _this.stopOrbit = false;

	    /**
	     * Idle time
	     * @type {Number}
	     */
	    _this.idleTime = 0;

	    if (obj.x !== void 0 && obj.y !== void 0) {
	      _this.x = obj.x;
	      _this.y = obj.y;
	    }

	    /** Entity size */
	    if (obj.width) _this.width = obj.width;
	    if (obj.height) _this.height = obj.height;

	    /**
	     * Shadow offsets
	     * @type {Number}
	     */
	    _this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
	    _this.shadowY = obj.shadowY === void 0 ? -_this.height / 2 : obj.shadowY;

	    /**
	     * WebGL texture
	     * @type {Object}
	     */
	    _this.glTexture = null;

	    /**
	     * Enter trigger
	     * @type {Function}
	     */
	    _this.onLoad = null;

	    /**
	     * Enter trigger
	     * @type {Function}
	     */
	    _this.onEnter = null;

	    /**
	     * Leave trigger
	     * @type {Function}
	     */
	    _this.onLeave = null;

	    /**
	     * Collide trigger
	     * @type {Function}
	     */
	    _this.onCollide = null;

	    /**
	     * Jump trigger
	     * @type {Function}
	     */
	    _this.onJump = null;

	    if (obj.onLoad !== void 0) {
	      _this.onLoad = obj.onLoad;
	    }
	    if (obj.onEnter !== void 0) {
	      _this.onEnter = obj.onEnter;
	    }
	    if (obj.onLeave !== void 0) {
	      _this.onLeave = obj.onLeave;
	    }
	    if (obj.onCollide !== void 0) {
	      _this.onCollide = obj.onCollide;
	    }
	    if (obj.onJump !== void 0) {
	      _this.onJump = obj.onJump;
	    }

	    /**
	     * X
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "x", {
	      get: function get() {
	        return this.position.x;
	      },
	      set: function set(value) {
	        this.position.x = value;
	      }
	    });

	    /**
	     * Y
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "y", {
	      get: function get() {
	        return this.position.y;
	      },
	      set: function set(value) {
	        this.position.y = value;
	      }
	    });

	    /**
	     * Lock
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "lock", {
	      get: function get() {
	        return this.STATES.LOCK;
	      },
	      set: function set(value) {
	        this.STATES.LOCK = value === true;
	      }
	    });

	    if (_cfg.IS_CLIENT === false) return _ret = void 0, (0, _possibleConstructorReturn3.default)(_this, _ret);

	    /** Load texture */
	    (0, _utils.getSprite)(_this.sprite, _this.width, _this.height, function (texture) {
	      this.texture = texture;
	      if (this.hasShadow === true) {
	        this.shadow = new _Shadow2.default(this);
	        this.shadow.position.set(this.shadowX, this.shadowY);
	      }
	      if (_cfg.WGL_SUPPORT === true) {
	        this.glTexture = window.game.engine.renderer.glRenderer.bufferTexture(this.texture.effect_sprites[0].canvas);
	      }
	      if (this.onLoad !== null && this.onLoad instanceof Function) {
	        this.onLoad();
	      }
	    }.bind(_this));

	    return _this;
	  }

	  /**
	   * Orbit around a entity
	   * @param  {Object} target
	   */

	  (0, _createClass3.default)(Entity, [{
	    key: "orbitAround",
	    value: function orbitAround(target) {
	      if (target !== null) {
	        this.orbit = true;
	        this.orbitTarget = target;
	      } else {
	        this.orbit = false;
	      }
	    }

	    /**
	     * Refresh entity states
	     */

	  }, {
	    key: "refreshState",
	    value: function refreshState() {
	      this.STATES.JUMPING = this.z !== 0;
	    }

	    /**
	     * Jump
	     */

	  }, {
	    key: "jump",
	    value: function jump(resolve) {

	      this.refreshState();

	      if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	      this.STATES.JUMPING = true;

	      this.idleTime = 0;

	      this.jumpCB = resolve || null;
	    }

	    /**
	     * Jumping
	     */

	  }, {
	    key: "jumping",
	    value: function jumping() {

	      this.z += this.gravity;

	      this.refreshState();

	      if (this.z < 0) {
	        this.gravity += .1;
	        if (this.hasShadow === true) {
	          this.shadow.position.x = -(this.z / 2);
	          this.shadow.position.y = this.shadowY - this.z;
	          this.shadow.scale.x = this.z;
	          this.shadow.scale.y = this.z;
	        }
	      } else {
	        this.gravity = _cfg.GRAVITY;
	        this.z = 0;
	        this.refreshState();
	        if (this.hasShadow === true) {
	          this.shadow.position.x = this.shadowX;
	          this.shadow.position.y = this.shadowY;
	          this.shadow.scale.x = 0;
	          this.shadow.scale.y = 0;
	        }
	        if (this.jumpCB !== null) {
	          this.jumpCB();
	        }
	      }
	    }

	    /** Animate */

	  }, {
	    key: "animate",
	    value: function animate() {

	      if (this.STATES.JUMPING === true) {
	        this.jumping();
	      }

	      if (this.animations.length <= 0) return void 0;

	      this.animationIndex = 0;

	      for (var ii = 0; ii < this.animations.length; ++ii) {
	        this[this.animations[this.animationIndex].type](this.animations[this.animationIndex]);
	        this.animationIndex++;
	      };
	    }

	    /**
	     * Stop current animation
	     */

	  }, {
	    key: "stopAnimation",
	    value: function stopAnimation() {
	      this.animations.splice(this.animationIndex, 1);
	    }

	    /**
	     * Entity has customized opacity
	     * @return {Boolean}
	     */

	  }, {
	    key: "customOpacity",
	    value: function customOpacity() {
	      return this.opacity !== 1.0 && this.opacity !== 0.0;
	    }

	    /**
	     * Fade in
	     * @param {Number}   speed
	     * @param {Function} resolve
	     */

	  }, {
	    key: "fadeIn",
	    value: function fadeIn() {
	      var speed = arguments.length <= 0 || arguments[0] === undefined ? speed || 1 : arguments[0];
	      var resolve = arguments[1];

	      this.animations.push({
	        type: "fade",
	        fade: 1,
	        speed: speed
	      });
	      this.fadeInCB = resolve || null;
	    }

	    /**
	     * Fade out
	     * @param {Number}   speed
	     * @param {Boolean}  kill
	     * @param {Function} resolve
	     */

	  }, {
	    key: "fadeOut",
	    value: function fadeOut() {
	      var speed = arguments.length <= 0 || arguments[0] === undefined ? speed || 1 : arguments[0];
	      var kill = arguments[1];
	      var resolve = arguments[2];

	      this.animations.push({
	        type: "fade",
	        fade: 0,
	        kill: kill,
	        speed: speed
	      });
	      this.fadeOutCB = resolve || null;
	    }

	    /**
	     * Fade animation
	     * @param {Object} animation
	     */

	  }, {
	    key: "fade",
	    value: function fade(animation) {

	      var speed = animation.speed / 4 / 10;

	      this.opacity += animation.fade === 1 ? speed : -speed;

	      if (animation.fade === 1 && this.opacity > 1) {
	        this.opacity = 1.0;
	        this.stopAnimation();
	        if (this.fadeInCB !== null) {
	          this.fadeInCB();
	          this.fadeInCB = null;
	        }
	      } else if (animation.fade === 0 && this.opacity < 0) {
	        this.opacity = animation.kill === true ? -.01 : .0;
	        if (this.fadeOutCB !== null) {
	          this.fadeOutCB();
	        }
	        this.stopAnimation();
	      }
	    }

	    /**
	     * Shadow facing
	     * @param  {Number} dir
	     * @return {Number}
	     */

	  }, {
	    key: "shadowFacing",
	    value: function shadowFacing(dir) {
	      return this.reverseShadow[dir];
	    }

	    /**
	     * Reverse dir
	     * @param  {Number} dir
	     * @return {Number}
	     */

	  }, {
	    key: "reverseDir",
	    value: function reverseDir(dir) {
	      return this.reversed[dir];
	    }

	    /**
	     * Facing to key
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "facingToKey",
	    value: function facingToKey(facing) {
	      return facing === _cfg.LEFT ? 37 : facing === _cfg.UP ? 38 : facing === _cfg.RIGHT ? 39 : facing === _cfg.DOWN ? 40 : 38;
	    }

	    /**
	     * Key to facing
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "keyToFacing",
	    value: function keyToFacing(key) {
	      return key === 37 ? _cfg.LEFT : key === 38 ? _cfg.UP : key === 39 ? _cfg.RIGHT : key === 40 ? _cfg.DOWN : _cfg.UP;
	    }

	    /**
	     * Opposit facing
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "oppositFacing",
	    value: function oppositFacing(key) {
	      return key === _cfg.LEFT ? _cfg.RIGHT : key === _cfg.RIGHT ? _cfg.LEFT : key === _cfg.DOWN ? _cfg.UP : key === _cfg.UP ? _cfg.DOWN : _cfg.UP;
	    }
	  }]);
	  return Entity;
	}(_DisplayObject3.default);

	exports.default = Entity;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _utils = __webpack_require__(7);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Display object
	 * @class DisplayObject
	 * @export
	 */

	var DisplayObject =

	/**
	 * @constructor
	 * @param {Number} width
	 * @param {Number} height
	 */
	function DisplayObject(x, y, width, height) {
	  (0, _classCallCheck3.default)(this, DisplayObject);

	  /**
	   * Unique id
	   * @type {Number}
	   */
	  this.id = (0, _utils.uHash)();

	  /**
	   * Position
	   * @type {Object}
	   */
	  this.position = new _Math2.default.Point(x !== void 0 ? x : 0, y !== void 0 ? y : 0);

	  /** 
	   * Size
	   * @type {Object}
	   */
	  this.size = new _Math2.default.Point(width !== void 0 ? width : 0, height !== void 0 ? height : 0);

	  /** 
	   * Scale factor
	   * @type {Object}
	   */
	  this.scale = new _Math2.default.Point(1, 1);

	  /**
	   * X
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "x", {
	    get: function get() {
	      return this.position.x;
	    },
	    set: function set(value) {
	      this.position.x = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Y
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "y", {
	    get: function get() {
	      return this.position.y;
	    },
	    set: function set(value) {
	      this.position.y = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Width
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "width", {
	    get: function get() {
	      return this.size.x;
	    },
	    set: function set(value) {
	      this.size.x = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Height
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "height", {
	    get: function get() {
	      return this.size.y;
	    },
	    set: function set(value) {
	      this.size.y = value;
	    },
	    configurable: true,
	    enumerable: true
	  });
	};

	exports.default = DisplayObject;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _utils = __webpack_require__(7);

	var _effects = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Shadow
	 * @class Shadow
	 * @export
	 */

	var Shadow = function (_DisplayObject) {
	    (0, _inherits3.default)(Shadow, _DisplayObject);

	    /**
	     * @param {Object} parent
	     * @constructor
	     */

	    function Shadow(parent) {
	        (0, _classCallCheck3.default)(this, Shadow);

	        /**
	         * Parent ref
	         * @type {Object}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shadow).call(this, null));

	        _this.parent = parent;

	        /**
	         * Texture
	         * @type {Object}
	         */
	        _this.texture = null;

	        /**
	         * Splitted sprites
	         * @type {Array}
	         */
	        _this.sprites = [];

	        _this.scale.set(0, 0);

	        _this.init();

	        return _this;
	    }

	    /**
	     * Initialise
	     * Build shadow
	     */

	    (0, _createClass3.default)(Shadow, [{
	        key: "init",
	        value: function init() {

	            this.texture = this.buildShadow();
	        }

	        /**
	         * Build shadow
	         * @return {Object}
	         */

	    }, {
	        key: "buildShadow",
	        value: function buildShadow() {

	            var ii = 0;
	            var length = 0;

	            var buffer = null;

	            var parent = this.parent.texture;

	            var width = 0;
	            var height = 0;

	            length = parent.sprites.length;

	            for (; ii < length; ++ii) {
	                width = parent.sprites[ii].canvas.width;
	                height = parent.sprites[ii].canvas.height;
	                buffer = (0, _utils.createCanvasBuffer)(width, height);
	                buffer.translate(0, height);
	                buffer.scale(1, -1);
	                this.drawShadow(parent.sprites[ii], buffer, width, height);
	                buffer.setTransform(1, 0, 0, 1, 0, 0);
	                this.sprites[ii] = buffer;
	                buffer = null;
	            };

	            return this;
	        }

	        /**
	         * Create shadow of a sprite
	         * @param {Object} buffer
	         * @param {Object} ctx
	         * @param {Number} width
	         * @param {Number} height
	         */

	    }, {
	        key: "drawShadow",
	        value: function drawShadow(buffer, ctx, width, height) {

	            ctx.clear();

	            ctx.drawImage(buffer.canvas, 0, 0, width, height);

	            this.drawTint(ctx, 0, 0, width, height, _cfg.SHADOW_ALPHA * 1e2);
	        }

	        /**
	         * Tint a canvas
	         * @param {Object} ctx
	         * @param {Number} x
	         * @param {Number} y
	         * @param {Number} width
	         * @param {Number} height
	         * @param {Number} value
	         */

	    }, {
	        key: "drawTint",
	        value: function drawTint(ctx, x, y, width, height, value) {

	            var imgData = ctx.getImageData(x, y, width, height);

	            (0, _effects.colorizePixels)(imgData, 0, 0, value, true);

	            ctx.putImageData(imgData, x, y);
	        }
	    }]);
	    return Shadow;
	}(_DisplayObject3.default);

	exports.default = Shadow;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(6);

	var _astar = __webpack_require__(102);

	var _astar2 = _interopRequireDefault(_astar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Path
	 * @class Path
	 * @export
	 */

	var Path = function () {

	  /**
	   * @param {Array} data
	   * @constructor
	   */

	  function Path(data) {
	    (0, _classCallCheck3.default)(this, Path);

	    this.grid = new _astar2.default.Graph(data);
	  }

	  /**
	   * Get shortest path
	   * @param {Number} x1
	   * @param {Number} y1
	   * @param {Number} x2
	   * @param {Number} y2
	   * @return {Array}
	   */

	  (0, _createClass3.default)(Path, [{
	    key: "getShortestPath",
	    value: function getShortestPath(x1, y1, x2, y2) {

	      return _astar2.default.astar.search(this.grid, this.grid.grid[(x1 << 0) / _cfg.DIMENSION][(y1 << 0) / _cfg.DIMENSION], this.grid.grid[(x2 << 0) / _cfg.DIMENSION][(y2 << 0) / _cfg.DIMENSION]);
	    }
	  }]);
	  return Path;
	}();

	exports.default = Path;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// javascript-astar 0.4.1
	// http://github.com/bgrins/javascript-astar
	// Freely distributable under the MIT License.
	// Implements the astar search algorithm in javascript using a Binary Heap.
	// Includes Binary Heap (with modifications) from Marijn Haverbeke.
	// http://eloquentjavascript.net/appendix2.html
	(function (definition) {
	  /* global module, define */
	  if (( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object' && (0, _typeof3.default)(module.exports) === 'object') {
	    module.exports = definition();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    var exports = definition();
	    window.astar = exports.astar;
	    window.Graph = exports.Graph;
	  }
	})(function () {

	  function pathTo(node) {
	    var curr = node;
	    var path = [];
	    while (curr.parent) {
	      path.unshift(curr);
	      curr = curr.parent;
	    }
	    return path;
	  }

	  function getHeap() {
	    return new BinaryHeap(function (node) {
	      return node.f;
	    });
	  }

	  var astar = {
	    /**
	    * Perform an A* Search on a graph given a start and end node.
	    * @param {Graph} graph
	    * @param {GridNode} start
	    * @param {GridNode} end
	    * @param {Object} [options]
	    * @param {bool} [options.closest] Specifies whether to return the
	               path to the closest node if the target is unreachable.
	    * @param {Function} [options.heuristic] Heuristic function (see
	    *          astar.heuristics).
	    */
	    search: function search(graph, start, end, options) {
	      graph.cleanDirty();
	      options = options || {};
	      var heuristic = options.heuristic || astar.heuristics.manhattan;
	      var closest = options.closest || false;

	      var openHeap = getHeap();
	      var closestNode = start; // set the start node to be the closest if required

	      start.h = heuristic(start, end);
	      graph.markDirty(start);

	      openHeap.push(start);

	      while (openHeap.size() > 0) {

	        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
	        var currentNode = openHeap.pop();

	        // End case -- result has been found, return the traced path.
	        if (currentNode === end) {
	          return pathTo(currentNode);
	        }

	        // Normal case -- move currentNode from open to closed, process each of its neighbors.
	        currentNode.closed = true;

	        // Find all neighbors for the current node.
	        var neighbors = graph.neighbors(currentNode);

	        for (var i = 0, il = neighbors.length; i < il; ++i) {
	          var neighbor = neighbors[i];

	          if (neighbor.closed || neighbor.isWall()) {
	            // Not a valid node to process, skip to next neighbor.
	            continue;
	          }

	          // The g score is the shortest distance from start to current node.
	          // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
	          var gScore = currentNode.g + neighbor.getCost(currentNode);
	          var beenVisited = neighbor.visited;

	          if (!beenVisited || gScore < neighbor.g) {

	            // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
	            neighbor.visited = true;
	            neighbor.parent = currentNode;
	            neighbor.h = neighbor.h || heuristic(neighbor, end);
	            neighbor.g = gScore;
	            neighbor.f = neighbor.g + neighbor.h;
	            graph.markDirty(neighbor);
	            if (closest) {
	              // If the neighbour is closer than the current closestNode or if it's equally close but has
	              // a cheaper path than the current closest node then it becomes the closest node
	              if (neighbor.h < closestNode.h || neighbor.h === closestNode.h && neighbor.g < closestNode.g) {
	                closestNode = neighbor;
	              }
	            }

	            if (!beenVisited) {
	              // Pushing to heap will put it in proper place based on the 'f' value.
	              openHeap.push(neighbor);
	            } else {
	              // Already seen the node, but since it has been rescored we need to reorder it in the heap
	              openHeap.rescoreElement(neighbor);
	            }
	          }
	        }
	      }

	      if (closest) {
	        return pathTo(closestNode);
	      }

	      // No result was found - empty array signifies failure to find path.
	      return [];
	    },
	    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
	    heuristics: {
	      manhattan: function manhattan(pos0, pos1) {
	        var d1 = Math.abs(pos1.x - pos0.x);
	        var d2 = Math.abs(pos1.y - pos0.y);
	        return d1 + d2;
	      },
	      diagonal: function diagonal(pos0, pos1) {
	        var D = 1;
	        var D2 = Math.sqrt(2);
	        var d1 = Math.abs(pos1.x - pos0.x);
	        var d2 = Math.abs(pos1.y - pos0.y);
	        return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
	      }
	    },
	    cleanNode: function cleanNode(node) {
	      node.f = 0;
	      node.g = 0;
	      node.h = 0;
	      node.visited = false;
	      node.closed = false;
	      node.parent = null;
	    }
	  };

	  /**
	   * A graph memory structure
	   * @param {Array} gridIn 2D array of input weights
	   * @param {Object} [options]
	   * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
	   */
	  function Graph(gridIn, options) {
	    options = options || {};
	    this.nodes = [];
	    this.diagonal = !!options.diagonal;
	    this.grid = [];
	    for (var x = 0; x < gridIn.length; x++) {
	      this.grid[x] = [];

	      for (var y = 0, row = gridIn[x]; y < row.length; y++) {
	        var node = new GridNode(x, y, row[y]);
	        this.grid[x][y] = node;
	        this.nodes.push(node);
	      }
	    }
	    this.init();
	  }

	  Graph.prototype.init = function () {
	    this.dirtyNodes = [];
	    for (var i = 0; i < this.nodes.length; i++) {
	      astar.cleanNode(this.nodes[i]);
	    }
	  };

	  Graph.prototype.cleanDirty = function () {
	    for (var i = 0; i < this.dirtyNodes.length; i++) {
	      astar.cleanNode(this.dirtyNodes[i]);
	    }
	    this.dirtyNodes = [];
	  };

	  Graph.prototype.markDirty = function (node) {
	    this.dirtyNodes.push(node);
	  };

	  Graph.prototype.neighbors = function (node) {
	    var ret = [];
	    var x = node.x;
	    var y = node.y;
	    var grid = this.grid;

	    // West
	    if (grid[x - 1] && grid[x - 1][y]) {
	      ret.push(grid[x - 1][y]);
	    }

	    // East
	    if (grid[x + 1] && grid[x + 1][y]) {
	      ret.push(grid[x + 1][y]);
	    }

	    // South
	    if (grid[x] && grid[x][y - 1]) {
	      ret.push(grid[x][y - 1]);
	    }

	    // North
	    if (grid[x] && grid[x][y + 1]) {
	      ret.push(grid[x][y + 1]);
	    }

	    if (this.diagonal) {
	      // Southwest
	      if (grid[x - 1] && grid[x - 1][y - 1]) {
	        ret.push(grid[x - 1][y - 1]);
	      }

	      // Southeast
	      if (grid[x + 1] && grid[x + 1][y - 1]) {
	        ret.push(grid[x + 1][y - 1]);
	      }

	      // Northwest
	      if (grid[x - 1] && grid[x - 1][y + 1]) {
	        ret.push(grid[x - 1][y + 1]);
	      }

	      // Northeast
	      if (grid[x + 1] && grid[x + 1][y + 1]) {
	        ret.push(grid[x + 1][y + 1]);
	      }
	    }

	    return ret;
	  };

	  Graph.prototype.toString = function () {
	    var graphString = [];
	    var nodes = this.grid;
	    for (var x = 0; x < nodes.length; x++) {
	      var rowDebug = [];
	      var row = nodes[x];
	      for (var y = 0; y < row.length; y++) {
	        rowDebug.push(row[y].weight);
	      }
	      graphString.push(rowDebug.join(" "));
	    }
	    return graphString.join("\n");
	  };

	  function GridNode(x, y, weight) {
	    this.x = x;
	    this.y = y;
	    this.weight = weight;
	  }

	  GridNode.prototype.toString = function () {
	    return "[" + this.x + " " + this.y + "]";
	  };

	  GridNode.prototype.getCost = function (fromNeighbor) {
	    // Take diagonal weight into consideration.
	    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
	      return this.weight * 1.41421;
	    }
	    return this.weight;
	  };

	  GridNode.prototype.isWall = function () {
	    return this.weight === 0;
	  };

	  function BinaryHeap(scoreFunction) {
	    this.content = [];
	    this.scoreFunction = scoreFunction;
	  }

	  BinaryHeap.prototype = {
	    push: function push(element) {
	      // Add the new element to the end of the array.
	      this.content.push(element);

	      // Allow it to sink down.
	      this.sinkDown(this.content.length - 1);
	    },
	    pop: function pop() {
	      // Store the first element so we can return it later.
	      var result = this.content[0];
	      // Get the element at the end of the array.
	      var end = this.content.pop();
	      // If there are any elements left, put the end element at the
	      // start, and let it bubble up.
	      if (this.content.length > 0) {
	        this.content[0] = end;
	        this.bubbleUp(0);
	      }
	      return result;
	    },
	    remove: function remove(node) {
	      var i = this.content.indexOf(node);

	      // When it is found, the process seen in 'pop' is repeated
	      // to fill up the hole.
	      var end = this.content.pop();

	      if (i !== this.content.length - 1) {
	        this.content[i] = end;

	        if (this.scoreFunction(end) < this.scoreFunction(node)) {
	          this.sinkDown(i);
	        } else {
	          this.bubbleUp(i);
	        }
	      }
	    },
	    size: function size() {
	      return this.content.length;
	    },
	    rescoreElement: function rescoreElement(node) {
	      this.sinkDown(this.content.indexOf(node));
	    },
	    sinkDown: function sinkDown(n) {
	      // Fetch the element that has to be sunk.
	      var element = this.content[n];

	      // When at 0, an element can not sink any further.
	      while (n > 0) {

	        // Compute the parent element's index, and fetch it.
	        var parentN = (n + 1 >> 1) - 1;
	        var parent = this.content[parentN];
	        // Swap the elements if the parent is greater.
	        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	          this.content[parentN] = element;
	          this.content[n] = parent;
	          // Update 'n' to continue at the new position.
	          n = parentN;
	        }
	        // Found a parent that is less, no need to sink any further.
	        else {
	            break;
	          }
	      }
	    },
	    bubbleUp: function bubbleUp(n) {
	      // Look up the target element and its score.
	      var length = this.content.length;
	      var element = this.content[n];
	      var elemScore = this.scoreFunction(element);

	      while (true) {
	        // Compute the indices of the child elements.
	        var child2N = n + 1 << 1;
	        var child1N = child2N - 1;
	        // This is used to store the new position of the element, if any.
	        var swap = null;
	        var child1Score;
	        // If the first child exists (is inside the array)...
	        if (child1N < length) {
	          // Look it up and compute its score.
	          var child1 = this.content[child1N];
	          child1Score = this.scoreFunction(child1);

	          // If the score is less than our element's, we need to swap.
	          if (child1Score < elemScore) {
	            swap = child1N;
	          }
	        }

	        // Do the same checks for the other child.
	        if (child2N < length) {
	          var child2 = this.content[child2N];
	          var child2Score = this.scoreFunction(child2);
	          if (child2Score < (swap === null ? elemScore : child1Score)) {
	            swap = child2N;
	          }
	        }

	        // If the element needs to be moved, swap it, and continue.
	        if (swap !== null) {
	          this.content[n] = this.content[swap];
	          this.content[swap] = element;
	          n = swap;
	        }
	        // Otherwise, we are done.
	        else {
	            break;
	          }
	      }
	    }
	  };

	  return {
	    astar: astar,
	    Graph: Graph
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)(module)))

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.triggerEvent = triggerEvent;
	exports.actionTrigger = actionTrigger;
	exports.isObstacle = isObstacle;
	exports.isEntityCollidable = isEntityCollidable;
	exports.collidesWithCollisionBox = collidesWithCollisionBox;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Trigger events
	 * @param {Object} entity
	 * @param {Object} parent
	 * @param {String} event
	 */
	function triggerEvent(entity, parent, event) {

	  /** Collide event */
	  if (entity[event] !== null) {
	    /** JavaScript API */
	    if (entity[event].JavaScript !== void 0) {
	      entity[event].JavaScript.bind(entity)(parent, this);
	    }
	    /** EngelScript API */
	    if (entity[event].EngelScript !== void 0) {
	      this.instance.environment.run(parent, entity, entity[event].EngelScript);
	    }
	  }

	  return void 0;
	}

	/**
	 * Action trigger
	 * @param {Object} position
	 * @param {Object} entity
	 */
	function actionTrigger(position, entity) {

	  var entities = this.entities;

	  var ii = 0;
	  var length = entities.length;

	  var event = null;

	  var id = entity.id;

	  var x = position.x << 0;
	  var y = position.y << 0;

	  for (; ii < length; ++ii) {
	    event = entities[ii];
	    if (event.id === id) continue;
	    if (event.x << 0 === x && event.y << 0 === y) {
	      event.orbitAround(entity);
	    }
	  };

	  return void 0;
	}

	/**
	 * Obstacle check
	 * @param {Object} entity
	 * @param {Number} dir
	 * @return {Boolean}
	 */
	function isObstacle(entity, dir) {

	  var position = _Math2.default.getTilePosition(entity.x << 0, entity.y << 0, dir);

	  return this.collisionLayer.data[(position.y << 0) / _cfg.DIMENSION][(position.x << 0) / _cfg.DIMENSION] === 0 || this.isEntityCollidable(entity, position.x, position.y) === true;
	}

	/**
	 * Entity collidable check
	 * @param  {Object} entity
	 * @param  {Number} x
	 * @param  {Number} y
	 * @return {Boolean}
	 */
	function isEntityCollidable(entity, x, y) {

	  var entities = this.entities;

	  var ii = 0;
	  var length = entities.length;

	  var intersection = false;

	  var collide = false;

	  var id = entity.id;

	  var event = null;

	  for (; ii < length; ++ii) {
	    event = entities[ii];
	    if (event.id === id) continue;
	    intersection = _Math2.default.linearIntersect(event.position.x << 0, event.position.y << 0, event.size.x * event.scale + event.xMargin - _cfg.DIMENSION, event.size.y * event.scale + event.yMargin - _cfg.DIMENSION, x, y, 1);
	    /** Entity is a collidable */
	    if (event.collidable === true) {
	      /** Collision box */
	      if (event.collisionBox.length > 0) {
	        if (this.collidesWithCollisionBox(event, x, y) === true) {
	          this.triggerEvent(event, entity, "onCollide");
	          collide = true;
	        }
	        /** Cubic based collision */
	      } else {
	          if (intersection === true) {
	            this.triggerEvent(event, entity, "onCollide");
	            collide = true;
	          }
	        }
	    } else {
	      if (_Math2.default.linearIntersect(event.position.x << 0, event.position.y << 0, event.size.x * event.scale + event.xMargin - _cfg.DIMENSION, event.size.y * event.scale + event.yMargin - _cfg.DIMENSION, entity.position.x << 0, entity.position.y << 0, 1) === true) {
	        this.triggerEvent(event, entity, "onLeave");
	      }
	      if (intersection === true) {
	        this.triggerEvent(event, entity, "onEnter");
	      }
	    }
	  };

	  return collide;
	}

	/**
	 * Collides with a entity collision box
	 * @param  {Number} entity
	 * @param  {Number} x
	 * @param  {Number} y
	 * @return {Boolean}
	 */
	function collidesWithCollisionBox(entity, x, y) {

	  var tile = 0;

	  var ii = 0;

	  var xx = 0;
	  var yy = 0;

	  var dim = _cfg.DIMENSION * entity.scale;

	  var width = (entity.size.x + entity.xMargin) / _cfg.DIMENSION;
	  var height = (entity.size.y + entity.yMargin) / _cfg.DIMENSION;

	  var length = width * height;

	  var eX = entity.position.x << 0;
	  var eY = entity.position.y << 0;

	  for (; ii < length; ++ii) {
	    tile = entity.collisionBox[yy + xx];
	    if (tile === 1) {
	      if (eX + xx * dim === x && eY + yy / width * dim === y) {
	        return true;
	      }
	    }
	    ++xx;
	    if (xx >= width) {
	      yy += width;
	      xx = 0;
	    }
	  };

	  return false;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addEntity = addEntity;
	exports.getEntityByProperty = getEntityByProperty;
	exports.removeEntity = removeEntity;
	exports.getEntityById = getEntityById;
	exports.removeEntityById = removeEntityById;

	var _index = __webpack_require__(98);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Add a new entity
	 * @param {Object} entity
	 * @export
	 */
	function addEntity(entity) {

	  if (entity.isLocalPlayer) {
	    entity.instance = this.instance;
	    this.localEntity = entity;
	  }

	  if (entity.customOpacity() === false) {
	    entity.fadeIn(1);
	  }

	  this.currentMap.entities.push(entity);
	}

	/**
	 * Get a entity by its
	 * matching property
	 * @param {*} key
	 * @param {String} prop
	 * @return {Number}
	 */
	function getEntityByProperty(key, prop) {

	  var ii = 0;
	  var length = 0;

	  length = this.currentMap.entities.length;

	  for (; ii < length; ++ii) {
	    if (this.currentMap.entities[ii][prop] === key) {
	      return this.currentMap.entities[ii];
	    }
	  };
	}

	/**
	 * Remove a entity
	 * @param {Object} entity
	 */
	function removeEntity(entity) {

	  var ii = 0;
	  var length = 0;

	  length = this.currentMap.entities.length;

	  /** Clear entity selection */
	  if (this.editor.entitySelection !== null && entity.id === this.editor.entitySelection.id) {
	    this.editor.entitySelection = null;
	  }

	  for (; ii < length; ++ii) {
	    if (this.currentMap.entities[ii].id === entity.id) {
	      this.currentMap.entities[ii] = null;
	      this.currentMap.entities.splice(ii, 1);
	      break;
	    }
	  };
	}

	/**
	 * Get a entity
	 * @param {Number} id
	 * @return {Number}
	 */
	function getEntityById(id) {

	  var property = "id";

	  var index = 0;

	  return this.getEntityByProperty(id, property);
	}

	/**
	 * Remove a entity by its id
	 * @param {Number} id
	 */
	function removeEntityById(id) {

	  var entity = null;

	  if ((entity = this.getEntityByProperty(id, property)) === void 0) return void 0;

	  this.removeEntity(entity);
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _tokens = __webpack_require__(107);

	var tokens = _interopRequireWildcard(_tokens);

	var _Tester = __webpack_require__(108);

	var _Tester2 = _interopRequireDefault(_Tester);

	var _Tokenizer = __webpack_require__(111);

	var _Tokenizer2 = _interopRequireDefault(_Tokenizer);

	var _Parser = __webpack_require__(112);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _Evaluator = __webpack_require__(116);

	var _Evaluator2 = _interopRequireDefault(_Evaluator);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Environment
	 * @class Environment
	 * @export
	 */

	var Environment = function () {

	    /**
	     * @constructor
	     * @param {Object} instance
	     */

	    function Environment(instance) {
	        (0, _classCallCheck3.default)(this, Environment);

	        /**
	         * Game instance ref
	         * @type {Object}
	         */
	        this.instance = instance;

	        /**
	         * Global flags
	         * @type {Object}
	         */
	        this.FLAGS = {
	            GOT_STARTER_PKMN: 2
	        };

	        /**
	         * Tokenizer instance
	         * @type {Object}
	         */
	        this.tokenizer = new _Tokenizer2.default(tokens.TOKENS, tokens.IGNORE);

	        /**
	         * Parser instance
	         * @type {Object}
	         */
	        this.parser = new _Parser2.default();

	        /**
	         * Evaluator instance
	         * @type {Object}
	         */
	        this.evaluator = new _Evaluator2.default(this);

	        /**
	         * Tester instance
	         * @type {Object}
	         */
	        this.tester = new _Tester2.default(this.tokenizer, this.parser, this.evaluator);

	        console.log(this.FLAGS);
	    }

	    /**
	     * Run a stream
	     * @param {Object} local
	     * @param {Object} trigger
	     * @param {String} stream
	     */

	    (0, _createClass3.default)(Environment, [{
	        key: "run",
	        value: function run(local, trigger, stream) {

	            this.evaluator.setTriggerScope(local);
	            this.evaluator.setGlobalScope(trigger);

	            var tokens = this.tokenizer.scan(stream);

	            var ast = this.parser.parse(tokens);

	            this.evaluator.evaluate(ast, function (result) {
	                console.log("Ok!", result);
	            });
	        }
	    }]);
	    return Environment;
	}();

	exports.default = Environment;

/***/ },
/* 107 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Tokens to match
	 * @type {Object}
	 */
	var TOKENS = exports.TOKENS = {
	  /** Punctuators */
	  "(": "LPAREN",
	  ")": "RPAREN",
	  "[": "LBRACK",
	  "]": "RBRACK",
	  "{": "LBRACE",
	  "}": "RBRACE",
	  ":": "COLON",
	  ";": "SEMICOLON",
	  ".": "PERIOD",
	  "?": "CONDITIONAL",
	  "$": "DOLLAR",
	  "@": "ATSIGN",
	  /** Logical operators */
	  "!": "NOT",
	  "||": "OR",
	  "&&": "AND",
	  /** Binary operators */
	  ",": "COMMA",
	  "+": "ADD",
	  "-": "SUB",
	  "*": "MUL",
	  "/": "DIV",
	  "%": "MOD",
	  "^": "POW",
	  /** Compare operators */
	  "<": "LT",
	  "<=": "LE",
	  ">": "GT",
	  ">=": "GE",
	  "==": "EQ",
	  "!=": "NEQ",
	  /** Assignment operators */
	  "=": "ASSIGN",
	  /** Bitwise operators */
	  "~": "BIT_NOT",
	  "|": "BIT_OR",
	  "&": "BIT_AND",
	  /** Literals */
	  "null": "NULL",
	  "true": "TRUE",
	  "false": "FALSE",
	  /** Keywords */
	  "if": "IF",
	  "else": "ELSE",
	  "while": "WHILE",
	  "do": "DO",
	  "for": "FOR",
	  "function": "FUNCTION",
	  "var": "VAR",
	  "const": "CONST",
	  "return": "RETURN",
	  " ": "BLANK",
	  "\t": "TAB",
	  "\n": "NL",
	  "\r": "X",
	  "\f": "X1",
	  "\v": "X2"
	};

	/**
	 * Tokens to ignore
	 * @type {Array}
	 */
	var IGNORE = exports.IGNORE = ["BLANK", "TAB", "NL", "X", "X1", "X2"];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(109);

	var _tests = __webpack_require__(110);

	var tests = _interopRequireWildcard(_tests);

	var _utils = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Tester
	 * @class Tester
	 * @export
	 */

	var Tester = function () {

	  /**
	   * @constructor
	   * @param {Object} tokenizer
	   * @param {Object} parser
	   * @param {Object} evaluator
	   */

	  function Tester(tokenizer, parser, evaluator) {
	    (0, _classCallCheck3.default)(this, Tester);

	    /**
	     * Tokenizer instance ref
	     * @type {Object}
	     */
	    this.tokenizer = tokenizer;

	    /**
	     * Parser instance ref
	     * @type {Object}
	     */
	    this.parser = parser;

	    /**
	     * Evaluator instance ref
	     * @type {Object}
	     */
	    this.evaluator = evaluator;

	    this.setup();
	  }

	  /**
	   * Test
	   * @param {Object}   key
	   * @param {Function} resolve
	   */

	  (0, _createClass3.default)(Tester, [{
	    key: "test",
	    value: function test(key, resolve) {

	      var ast = this.parser.parse(this.tokenizer.scan(key.expression));

	      this.evaluator.evaluate(ast, function (result) {
	        if (result !== key.expect) {
	          console.log(this.parser.parse(this.tokenizer.scan(key.expression)));
	          console.info("%c ☓ " + key.name + " :: " + key.expression + " = " + result, "color: darkred;");
	          resolve(false);
	        }
	        resolve(true);
	      }.bind(this));

	      return void 0;
	    }

	    /**
	     * Setup
	     */

	  }, {
	    key: "setup",
	    value: function setup() {

	      var failures = 0;

	      for (var type in tests) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _getIterator3.default)(tests[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            this.test(key, function (result) {
	              return result === false && ++failures;
	            });
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        ;
	        if (failures <= 0) {
	          console.info("%c ✓ " + type, "color: darkgreen;");
	        }
	      };

	      if (failures) {
	        console.error(failures + " " + (failures > 1 || failures === 0 ? "tests" : "test") + " failed!");
	      } else {
	        console.info("%cAll tests passed successfully!", "color: green;");
	      }
	    }
	  }]);
	  return Tester;
	}();

	exports.default = Tester;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NODE_TYPES = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Numeric node types
	 * @type {Object}
	 */
	var NODE_TYPES = exports.NODE_TYPES = {
	  Program: 1,
	  BlockStatement: 2,
	  ReturnStatement: 3,
	  Literal: 4,
	  Identifier: 5,
	  IfStatement: 6,
	  BinaryExpression: 7,
	  UnaryExpression: 8,
	  AsyncStatement: 9,
	  MemberExpression: 10,
	  CallExpression: 11,
	  AssignmentExpression: 12
	};

	/**
	 * NODE_LIST
	 * @class NODE_LIST
	 * @export
	 */

	var NODE_LIST = function () {
	  function NODE_LIST() {
	    (0, _classCallCheck3.default)(this, NODE_LIST);
	  }

	  (0, _createClass3.default)(NODE_LIST, null, [{
	    key: "Program",
	    get: function get() {
	      return function Program() {
	        (0, _classCallCheck3.default)(this, Program);

	        this.type = NODE_TYPES.Program;
	        this.body = [];
	      };
	    }
	  }, {
	    key: "BlockStatement",
	    get: function get() {
	      return function BlockStatement() {
	        (0, _classCallCheck3.default)(this, BlockStatement);

	        this.type = NODE_TYPES.BlockStatement;
	        this.body = [];
	      };
	    }
	  }, {
	    key: "ReturnStatement",
	    get: function get() {
	      return function ReturnStatement() {
	        (0, _classCallCheck3.default)(this, ReturnStatement);

	        this.type = NODE_TYPES.ReturnStatement;
	        this.value = null;
	      };
	    }
	  }, {
	    key: "Literal",
	    get: function get() {
	      return function Literal() {
	        (0, _classCallCheck3.default)(this, Literal);

	        this.type = NODE_TYPES.Literal;
	        this.name = null;
	        this.value = null;
	      };
	    }
	  }, {
	    key: "Identifier",
	    get: function get() {
	      return function Identifier() {
	        (0, _classCallCheck3.default)(this, Identifier);

	        this.type = NODE_TYPES.Identifier;
	        this.name = null;
	      };
	    }
	  }, {
	    key: "IfStatement",
	    get: function get() {
	      return function IfStatement() {
	        (0, _classCallCheck3.default)(this, IfStatement);

	        this.type = NODE_TYPES.IfStatement;
	        this.condition = null;
	        this.consequent = null;
	        this.alternate = null;
	      };
	    }
	  }, {
	    key: "BinaryExpression",
	    get: function get() {
	      return function BinaryExpression() {
	        (0, _classCallCheck3.default)(this, BinaryExpression);

	        this.type = NODE_TYPES.BinaryExpression;
	        this.operator = null;
	        this.left = null;
	        this.right = null;
	      };
	    }
	  }, {
	    key: "UnaryExpression",
	    get: function get() {
	      return function UnaryExpression() {
	        (0, _classCallCheck3.default)(this, UnaryExpression);

	        this.type = NODE_TYPES.UnaryExpression;
	        this.operator = null;
	        this.init = null;
	      };
	    }
	  }, {
	    key: "AsyncStatement",
	    get: function get() {
	      return function AsyncStatement() {
	        (0, _classCallCheck3.default)(this, AsyncStatement);

	        this.type = NODE_TYPES.AsyncStatement;
	        this.init = null;
	      };
	    }
	  }, {
	    key: "MemberExpression",
	    get: function get() {
	      return function MemberExpression() {
	        (0, _classCallCheck3.default)(this, MemberExpression);

	        this.type = NODE_TYPES.MemberExpression;
	        this.object = null;
	        this.property = null;
	      };
	    }
	  }, {
	    key: "CallExpression",
	    get: function get() {
	      return function CallExpression() {
	        (0, _classCallCheck3.default)(this, CallExpression);

	        this.type = NODE_TYPES.CallExpression;
	        this.callee = null;
	        this.arguments = [];
	      };
	    }
	  }, {
	    key: "AssignmentExpression",
	    get: function get() {
	      return function AssignmentExpression() {
	        (0, _classCallCheck3.default)(this, AssignmentExpression);

	        this.type = NODE_TYPES.AssignmentExpression;
	        this.operator = null;
	        this.left = null;
	        this.right = null;
	      };
	    }
	  }]);
	  return NODE_LIST;
	}();

	exports.default = NODE_LIST;

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Mathematical tests
	 * @type {Array}
	 */
	var Mathematical = exports.Mathematical = [
	/** Logical */
	{
	  name: "Not",
	  expression: "!true",
	  expect: false
	}, {
	  name: "Not",
	  expression: "!!true",
	  expect: true
	}, {
	  name: "Not",
	  expression: "!!!false",
	  expect: true
	}, {
	  name: "Logical And",
	  expression: "1 && 2",
	  expect: 2
	}, {
	  name: "Logical And",
	  expression: "1 == 1 && 2 >= 2",
	  expect: true
	}, {
	  name: "Logical And",
	  expression: "1 != 1 && 2 < 2",
	  expect: false
	}, {
	  name: "Logical Or",
	  expression: "0 || 2",
	  expect: 2
	}, {
	  name: "Logical Or",
	  expression: "2 || 0",
	  expect: 2
	}, {
	  name: "Logical Or",
	  expression: "10 <= 2 || 5 < 2 || 50 / 2 == 25",
	  expect: true
	}, {
	  name: "Logical And Or",
	  expression: "5 == 1 || 1 == 2 || 5 == 5",
	  expect: true
	},
	/** Comparisions */
	{
	  name: "Equality",
	  expression: "1 == 5",
	  expect: false
	}, {
	  name: "Equality",
	  expression: "5 == 5",
	  expect: true
	}, {
	  name: "Inequality",
	  expression: "1 != 5",
	  expect: true
	}, {
	  name: "Inequality",
	  expression: "5 != 5",
	  expect: false
	}, {
	  name: "LW",
	  expression: "5 < 10",
	  expect: true
	}, {
	  name: "LW",
	  expression: "10 < 5",
	  expect: false
	}, {
	  name: "LW",
	  expression: "5 < 5",
	  expect: false
	}, {
	  name: "LE",
	  expression: "5 <= 10",
	  expect: true
	}, {
	  name: "LE",
	  expression: "10 <= 5",
	  expect: false
	}, {
	  name: "LE",
	  expression: "5 <= 5",
	  expect: true
	}, {
	  name: "GT",
	  expression: "5 > 10",
	  expect: false
	}, {
	  name: "GT",
	  expression: "10 > 5",
	  expect: true
	}, {
	  name: "GT",
	  expression: "5 > 5",
	  expect: false
	}, {
	  name: "GE",
	  expression: "5 >= 10",
	  expect: false
	}, {
	  name: "GE",
	  expression: "10 >= 5",
	  expect: true
	}, {
	  name: "GE",
	  expression: "5 >= 5",
	  expect: true
	},
	/** Binary operators */
	{
	  name: "Add operator",
	  expression: "5.5 + 2.5 + 7",
	  expect: 15
	}, {
	  name: "Minus operator",
	  expression: "5.5 - 2.5 - 7",
	  expect: -4
	}, {
	  name: "Mul operator",
	  expression: "5.5 * 2.5 * 7",
	  expect: 96.25
	}, {
	  name: "Div operator",
	  expression: "25 / 5 / 2.5",
	  expect: 2
	}, {
	  name: "Mod operator",
	  expression: "32 % 6",
	  expect: 2
	}, {
	  name: "Complex",
	  expression: "5 + 1 / 2 * 2 - ((2.5 * (6 + 4 * 2) / 5) * 5) - 1.5",
	  expect: -30.5
	},
	/** Numbers */
	{
	  name: "Negative integer",
	  expression: "-77.5",
	  expect: -77.5
	},
	/** Booleans */
	{
	  name: "True bool",
	  expression: "true",
	  expect: true
	}, {
	  name: "False bool",
	  expression: "false",
	  expect: false
	}];

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Tokenizer
	 * @class Tokenizer
	 * @export
	 */

	var Tokenizer = function () {

	  /**
	   * @constructor
	   * @param {Object} tokens
	   * @param {Array}  ignore
	   */

	  function Tokenizer(tokens, ignore) {
	    (0, _classCallCheck3.default)(this, Tokenizer);

	    /**
	     * Operand lookup map
	     * @type {Object}
	     */
	    this.TOKEN_LIST = tokens || {};

	    /**
	     * Ignore token list
	     * @type {Array}
	     */
	    this.IGNORE_LIST = ignore || [];

	    /**
	     * Stream buffer
	     * @type {String}
	     */
	    this.buffer = null;

	    /**
	     * Stream index
	     * @type {Number}
	     */
	    this.index = 0;
	  }

	  /**
	   * Is digit
	   * @param {Number} c
	   * @return {Boolean}
	   */

	  (0, _createClass3.default)(Tokenizer, [{
	    key: "isDigit",
	    value: function isDigit(c) {
	      return c >= 48 && c <= 57;
	    }

	    /**
	     * Is alpha
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAlpha",
	    value: function isAlpha(c) {
	      return c > 64 && c < 91 || c > 96 && c < 123;
	    }

	    /**
	     * Is alpha digit
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAlphaDigit",
	    value: function isAlphaDigit(c) {
	      return c > 47 && c < 58 || c > 64 && c < 91 || c > 96 && c < 123 || c === 95;
	    }

	    /**
	     * Is string
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isString",
	    value: function isString(c) {
	      return c === 34 || c === 39;
	    }

	    /**
	     * Token validation
	     * @param  {Object}  token
	     * @return {Boolean}
	     */

	  }, {
	    key: "isValidToken",
	    value: function isValidToken(token) {
	      return token.name !== void 0 && this.IGNORE_LIST.indexOf(token.name) <= -1;
	    }

	    /**
	     * Token name validation
	     * @param  {String}  name
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIgnoredName",
	    value: function isIgnoredName(name) {
	      return this.IGNORE_LIST.indexOf(name) <= -1;
	    }

	    /**
	     * Creates number token
	     * @return {Object}
	     */

	  }, {
	    key: "readNumber",
	    value: function readNumber() {

	      var end = this.index + 1;

	      var c = null;

	      for (; end < this.length; ++end) {
	        c = this.buffer.charAt(end).charCodeAt(0);
	        /** Also check for floating numbers */
	        if (c !== 46 && this.isDigit(c) === false) break;
	      };

	      var value = this.buffer.slice(this.index, end);

	      this.index = end;

	      return {
	        name: "NUMBER",
	        value: value
	      };
	    }

	    /**
	     * Creates identifier or keyword token
	     * @return {Object}
	     */

	  }, {
	    key: "readIdentifier",
	    value: function readIdentifier() {

	      var end = this.index + 1;

	      for (; end < this.length && this.isAlphaDigit(this.buffer.charAt(end).charCodeAt(0)) === true; ++end) {};

	      var value = this.buffer.slice(this.index, end);

	      this.index = end;

	      /** Keyword */
	      if (this.TOKEN_LIST[value] !== void 0) {
	        return {
	          name: this.TOKEN_LIST[value],
	          value: value
	        };
	        /** Identifier */
	      } else {
	          return {
	            name: "IDENTIFIER",
	            value: value
	          };
	        }
	    }

	    /**
	     * Creates string token
	     * @return {Object}
	     */

	  }, {
	    key: "readString",
	    value: function readString() {

	      var end = this.buffer.indexOf("'", this.index + 1);

	      if (end === -1) {
	        end = this.buffer.indexOf('"', this.index + 1);
	        if (end === -1) throw new Error("Unexpected quote at " + this.index + "!");
	      }

	      var token = {
	        name: "STRING",
	        value: this.buffer.slice(this.index, end + 1)
	      };

	      this.index = end + 1;

	      return token;
	    }
	  }, {
	    key: "readNegativeNumber",
	    value: function readNegativeNumber() {

	      var node = null;

	      node = this.readNumber();

	      node.value = "-" + node.value;

	      return node;
	    }

	    /**
	     * Read sign
	     * @return {Object}
	     */

	  }, {
	    key: "readSign",
	    value: function readSign() {

	      var c = null;

	      var code = 0;

	      var name = null;

	      var value = "";

	      for (;;) {
	        c = this.buffer.charAt(this.index);
	        code = c.charCodeAt(0);
	        if (this.isDigit(code) === true) {
	          if (value === "-") {
	            return this.readNegativeNumber();
	          }
	        }
	        value += c;
	        if (this.TOKEN_LIST[value] === void 0) break;
	        this.index++;
	        name = this.TOKEN_LIST[value];
	        if (this.index > this.length) break;
	      };

	      return {
	        name: name,
	        value: value
	      };
	    }

	    /**
	     * Lexical analysis
	     * @param {String} stream
	     * @return {Array}
	     */

	  }, {
	    key: "scan",
	    value: function scan(stream) {

	      this.index = 0;
	      this.vIndex = 0;
	      this.buffer = stream;
	      this.length = this.buffer.length;

	      var c = null;
	      var op = null;
	      var cCode = 0;
	      var token = null;

	      var tokens = [];

	      for (;;) {

	        if (!(c = this.buffer.charAt(this.index)) || this.index >= this.length) break;

	        cCode = c.charCodeAt(0);

	        if ((op = this.TOKEN_LIST[c]) !== void 0) {
	          token = this.readSign();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isDigit(cCode) === true) {
	          token = this.readNumber();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isAlpha(cCode) === true) {
	          token = this.readIdentifier();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isString(cCode) === true) {
	          token = this.readString();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	      };

	      return tokens;
	    }
	  }]);
	  return Tokenizer;
	}();

	exports.default = Tokenizer;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(109);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	var _precedence = __webpack_require__(113);

	var pr = _interopRequireWildcard(_precedence);

	var _parse = __webpack_require__(114);

	var parse = _interopRequireWildcard(_parse);

	var _expression = __webpack_require__(115);

	var expression = _interopRequireWildcard(_expression);

	var _utils = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Parser
	 * @class Parser
	 * @export
	 */

	var Parser = function () {

	  /**
	   * @constructor
	   */

	  function Parser() {
	    (0, _classCallCheck3.default)(this, Parser);

	    /**
	     * Token input
	     * @type {Array}
	     */
	    this.tokens = null;

	    /**
	     * Token index
	     * @type {Number}
	     */
	    this.index = 0;

	    /**
	     * Operator precedences
	     * @type {Array}
	     */
	    this.precedence = pr.precedence;

	    /**
	     * node
	     * @type {Object}
	     * @getter
	     */
	    Object.defineProperty(this, "node", {
	      get: function get() {
	        return this.tokens[this.index];
	      }
	    });
	  }

	  /**
	   * Parse
	   * @param {Array} tokens
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Parser, [{
	    key: "parse",
	    value: function parse(tokens) {

	      this.tokens = tokens;

	      this.index = 0;

	      var ast = new _NodeList2.default.Program();

	      var length = this.tokens.length;

	      var block = null;

	      for (;;) {
	        if (this.index >= length) break;
	        if ((block = this.parseBlock()) === null) continue;
	        ast.body.push(block);
	      };

	      return ast;
	    }

	    /**
	     * Increase token index
	     */

	  }, {
	    key: "next",
	    value: function next() {
	      this.index++;
	    }

	    /**
	     * Node type acception
	     * @param  {String} type
	     * @return {Boolean}
	     */

	  }, {
	    key: "accept",
	    value: function accept(type) {
	      if (this.node === void 0) return false;
	      if (this.node.name === type) {
	        return true;
	      }
	      return false;
	    }

	    /**
	     * Node type expection
	     * @param {String} name
	     */

	  }, {
	    key: "expect",
	    value: function expect(name) {
	      for (; true;) {
	        if (this.node.name === name) {
	          this.next();
	          break;
	        }
	        this.next();
	      }
	      return void 0;
	    }

	    /**
	     * Accept precedence state
	     * @param  {String}  state
	     * @return {Boolean}
	     */

	  }, {
	    key: "acceptPrecedenceState",
	    value: function acceptPrecedenceState(state) {
	      return state !== void 0 && this.node !== void 0 && state.indexOf(this.node.name) > -1;
	    }
	  }]);
	  return Parser;
	}();

	exports.default = Parser;

	(0, _utils.inherit)(Parser, parse);
	(0, _utils.inherit)(Parser, expression);

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var precedence = exports.precedence = [["OR"], ["AND"], ["EQ", "NEQ"], ["LE", "LT", "GE", "GT"], ["ADD", "SUB"], ["MUL", "DIV", "MOD"]];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseBlock = parseBlock;
	exports.parseAsyncStatement = parseAsyncStatement;
	exports.parseIdentifierRoute = parseIdentifierRoute;
	exports.parseCallExpression = parseCallExpression;
	exports.parseAssignmentExpression = parseAssignmentExpression;
	exports.parseIfStatement = parseIfStatement;
	exports.parseReturnStatement = parseReturnStatement;
	exports.parseBraceBody = parseBraceBody;
	exports.parseBlockStatement = parseBlockStatement;
	exports.parseArguments = parseArguments;
	exports.parseBraceBody = parseBraceBody;
	exports.parseParentheseExpression = parseParentheseExpression;

	var _NodeList = __webpack_require__(109);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Parse a block
	 * @return {Object}
	 */
	function parseBlock() {

	  if (this.accept("IF") === true) {
	    return this.parseIfStatement();
	  }

	  if (this.accept("RETURN") === true) {
	    return this.parseReturnStatement();
	  }

	  if (this.accept("ATSIGN") === true) {
	    return this.parseAsyncStatement();
	  }

	  if (this.accept("IDENTIFIER") === true) {
	    return this.parseIdentifierRoute();
	  }

	  return this.parseExpression(0);
	}

	/**
	 * Parse async statement
	 * Identifier () | = | ; 
	 * @return {Object}
	 */
	function parseAsyncStatement() {

	  var ast = null;

	  this.next();
	  ast = new _NodeList2.default.AsyncStatement();
	  ast.init = this.parseBlock();

	  return ast;
	}

	/**
	 * Parse identifier route
	 * Identifier () | = | . | ; 
	 * @return {Object}
	 */
	function parseIdentifierRoute() {

	  var ast = null;

	  var tmp = this.parseExpression(0);

	  /** Call expression */
	  if (this.accept("LPAREN")) {
	    ast = this.parseCallExpression();
	    ast.callee = tmp;
	  }

	  /** Assignment expression */
	  if (this.accept("ASSIGN")) {
	    ast = this.parseAssignmentExpression();
	    ast.left = tmp;
	  }

	  return ast;
	}

	/**
	 * Parse call expression
	 * MemberExpression () ;
	 * @return {Object}
	 */
	function parseCallExpression() {

	  var ast = null;

	  ast = new _NodeList2.default.CallExpression();
	  ast.arguments = this.parseArguments();

	  this.next();

	  return ast;
	}

	/**
	 * Parse assignment expression
	 * Expression = Expression
	 * @return {Object}
	 */
	function parseAssignmentExpression() {

	  var ast = null;

	  ast = new _NodeList2.default.AssignmentExpression();
	  ast.left = this.parseExpression(0);
	  ast.operator = this.node.value;
	  this.expect("ASSIGN");
	  ast.right = this.parseExpression(0);
	  this.next();

	  return ast;
	}

	/**
	 * Parse if statement
	 * if ( Expression ) { Body } | { Body }
	 * @return {Object}
	 */
	function parseIfStatement() {

	  var ast = null;

	  this.next();

	  ast = new _NodeList2.default.IfStatement();
	  ast.condition = this.parseParentheseExpression();
	  ast.consequent = this.parseBraceBody();

	  if (this.accept("LBRACE")) {
	    ast.alternate = this.parseBraceBody();
	  }

	  return ast;
	}

	/**
	 * Parse return statement
	 * return ( Expression )
	 * @return {Object}
	 */
	function parseReturnStatement() {

	  var ast = null;

	  this.next();
	  ast = new _NodeList2.default.ReturnStatement();
	  ast.value = this.parseParentheseExpression();
	  this.next();

	  return ast;
	}

	/**
	 * Parse brace body
	 * { Body }
	 * @return {Object}
	 */
	function parseBraceBody() {

	  var ast = null;

	  this.expect("LBRACE");
	  ast = this.parseBlockStatement();
	  this.expect("RBRACE");

	  return ast;
	}

	/**
	 * Parse block statement
	 * @return {Object}
	 */
	function parseBlockStatement() {

	  var ast = new _NodeList2.default.BlockStatement();

	  for (; true;) {
	    if (this.accept("RBRACE") === true) break;
	    ast.body.push(this.parseBlock());
	  };

	  return ast;
	}

	/**
	 * Parse arguments
	 * [ , ]
	 * @return {Array}
	 */
	function parseArguments() {

	  var ast = null;

	  var args = [];

	  var tmp = null;

	  this.expect("LPAREN");

	  tmp = this.parseBlock();

	  if (tmp !== null) {
	    args.push(tmp);
	  }

	  for (; this.accept("COMMA") === true;) {
	    this.next();
	    if (this.accept("LPAREN") === true) {
	      this.next();
	      tmp = this.parseCallExpression();
	      if (tmp !== null) {
	        args.push(tmp);
	      }
	    } else {
	      tmp = this.parseBlock();
	      if (tmp !== null) {
	        args.push(tmp);
	      }
	    }
	    if (this.accept("RPAREN") === true) {
	      this.next();
	      break;
	    }
	  };

	  if (args.length <= 1 && this.accept("RPAREN")) {
	    this.next();
	  }

	  return args;
	}

	/**
	 * Parse brace body
	 * { Body }
	 * @return {Object}
	 */
	function parseBraceBody() {

	  var ast = null;

	  this.expect("LBRACE");
	  ast = this.parseBlockStatement();
	  this.expect("RBRACE");

	  return ast;
	}

	/**
	 * Parse parenthese expression
	 * ( Expression )
	 */
	function parseParentheseExpression() {

	  var ast = null;

	  this.expect("LPAREN");
	  ast = this.parseExpression(0);
	  this.expect("RPAREN");

	  return ast;
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseMemberExpression = parseMemberExpression;
	exports.parseExpression = parseExpression;
	exports.parseUnary = parseUnary;
	exports.parseBase = parseBase;

	var _NodeList = __webpack_require__(109);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Recursive object member parsing
	 * Identifier *. *Identifier
	 * @return {Object}
	 */
	function parseMemberExpression() {

	  var ast = null;
	  var tmp = null;
	  var parent = null;

	  ast = this.parseUnary();

	  for (; this.accept("PERIOD") === true;) {
	    parent = new _NodeList2.default.MemberExpression();
	    parent.object = ast;
	    this.next();
	    tmp = this.parseMemberExpression();
	    parent.property = tmp;
	    ast = parent;
	  };

	  return ast;
	}

	/**
	 * Recursive operator precedence based
	 * binary expression parsing
	 * @param  {Number} id
	 * @return {Object}
	 */
	function parseExpression(id) {

	  var state = null;
	  var ast = null;
	  var parent = null;
	  var tmp = null;

	  state = this.precedence[id];

	  ast = state === void 0 ? this.parseUnary() : this.parseExpression(id + 1);

	  for (; this.acceptPrecedenceState(state) === true;) {
	    parent = new _NodeList2.default.BinaryExpression();
	    parent.operator = this.node.name;
	    parent.left = ast;
	    this.next();
	    tmp = state === void 0 ? this.parseUnary() : this.parseExpression(id + 1);
	    if (tmp === null) return null;
	    parent.right = tmp;
	    ast = parent;
	    if (this.accept("SEMICOLON") === true) {
	      this.next();
	    }
	  };

	  return ast;
	}

	/**
	 * Parse unary
	 * @return {Object}
	 */
	function parseUnary() {

	  var ast = null;
	  var tmp = null;

	  if (this.accept("SUB") === true) {
	    ast = new _NodeList2.default.BinaryExpression();
	    ast.operator = this.node.name;
	    tmp = new _NodeList2.default.Literal();
	    tmp.name = "NUMBER";
	    tmp.value = 0;
	    ast.right = tmp;
	    this.next();
	    if ((tmp = this.parseBase()) === null) return null;
	    ast.left = tmp;
	  } else if (this.accept("NOT") === true) {
	    ast = new _NodeList2.default.UnaryExpression();
	    ast.operator = this.node.name;
	    this.next();
	    ast.init = this.parseExpression(0);
	  } else {
	    if (this.accept("ADD") === true) {
	      this.next();
	    }
	    if (!(ast = this.parseBase())) return null;
	  }

	  return ast;
	}

	/**
	 * Parse base
	 * @return {Object}
	 */
	function parseBase() {

	  var ast = null;

	  if (this.accept("TRUE") === true || this.accept("FALSE") === true) {
	    ast = new _NodeList2.default.Identifier();
	    ast.name = this.node.value;
	    this.next();
	    return ast;
	  }

	  if (this.accept("NUMBER") === true) {
	    ast = new _NodeList2.default.Literal();
	    ast.name = this.node.name;
	    ast.value = Number(this.node.value);
	    this.next();
	    return ast;
	  }

	  if (this.accept("STRING") === true) {
	    ast = new _NodeList2.default.Literal();
	    ast.name = this.node.name;
	    ast.value = this.node.value;
	    this.next();
	    return ast;
	  }

	  if (this.accept("LPAREN") === true) {
	    this.next();
	    ast = this.parseExpression(0);
	    this.next();
	    return ast;
	  }

	  if (this.accept("IDENTIFIER") === true) {
	    ast = new _NodeList2.default.Identifier();
	    ast.name = this.node.value;
	    if (this.tokens[this.index + 1].name === "PERIOD") {
	      this.next();
	      var exp = this.parseMemberExpression();
	      exp.object = ast;
	      return exp;
	    }
	    this.next();
	    return ast;
	  }

	  return ast;
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(109);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Evaluator
	 * @class Evaluator
	 * @export
	 */

	var Evaluator = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */

	  function Evaluator(instance) {
	    (0, _classCallCheck3.default)(this, Evaluator);

	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Context object
	     * @type {Object}
	     */
	    this.context = {

	      /**
	       * Flags ref
	       * @type {Object}
	       */
	      FLAGS: this.instance.FLAGS,

	      /**
	       * Dynamic global scope ref
	       * @type {Object}
	       */
	      this: null,

	      /**
	       * Dynamic trigger scope ref
	       * @type {Object}
	       */
	      trigger: null

	    };
	  }

	  /**
	   * Set global scope
	   * @param {Object} scope
	   */

	  (0, _createClass3.default)(Evaluator, [{
	    key: "setGlobalScope",
	    value: function setGlobalScope(scope) {
	      this.context["this"] = scope;
	    }

	    /**
	     * Set trigger scope
	     * @param {Object} scope
	     */

	  }, {
	    key: "setTriggerScope",
	    value: function setTriggerScope(scope) {
	      this.context["trigger"] = scope;
	    }

	    /**
	     * Is value
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isLiteral",
	    value: function isLiteral(ast) {
	      return ast.type === _NodeList.NODE_TYPES.Literal;
	    }

	    /**
	     * Is identifier
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIdentifier",
	    value: function isIdentifier(ast) {
	      return ast.type === _NodeList.NODE_TYPES.Identifier;
	    }

	    /**
	     * Is boolean
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isBoolean",
	    value: function isBoolean(ast) {
	      return ast.name === "true" || ast.name === "false";
	    }

	    /**
	     * Is if statement
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIfStatement",
	    value: function isIfStatement(ast) {
	      return ast.type === _NodeList.NODE_TYPES.IfStatement;
	    }

	    /**
	     * Is assignment expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAssignmentExpression",
	    value: function isAssignmentExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.AssignmentExpression;
	    }

	    /**
	     * Is member expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isMemberExpression",
	    value: function isMemberExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.MemberExpression;
	    }

	    /**
	     * Is call expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isCallExpression",
	    value: function isCallExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.CallExpression;
	    }

	    /**
	     * Is asynchronous statement
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAsyncStatement",
	    value: function isAsyncStatement(ast) {
	      return ast.type === _NodeList.NODE_TYPES.AsyncStatement;
	    }

	    /**
	     * Is binary expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isBinaryExpression",
	    value: function isBinaryExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.BinaryExpression || ast.type === _NodeList.NODE_TYPES.UnaryExpression || this.isLiteral(ast) === true || this.isIdentifier(ast) === true;
	    }

	    /**
	     * Evaluate an ast
	     * @param  {Object} ast
	     * @return {*}
	     */

	  }, {
	    key: "evaluate",
	    value: function evaluate(ast, resolve) {
	      this.evaluateBody(ast, 0, function (result) {
	        return resolve(result);
	      });
	    }

	    /**
	     * Evaluate an ast body
	     * @param  {Object}   ast
	     * @param  {Number}   index
	     * @param  {Function} resolve
	     * @return {*}
	     */

	  }, {
	    key: "evaluateBody",
	    value: function evaluateBody(ast, index, resolve) {

	      this.evalStatement(ast.body[index], function (result) {
	        if (++index < ast.body.length) {
	          this.evaluateBody(ast, index, function (result) {
	            return resolve(result);
	          });
	        } else {
	          resolve(result);
	        }
	      }.bind(this));

	      return void 0;
	    }

	    /**
	     * Eval statement
	     * @param {Object} ast
	     */

	  }, {
	    key: "evalStatement",
	    value: function evalStatement(ast, resolve) {

	      if (this.isBinaryExpression(ast) === true) {
	        return resolve(this.evalBinaryExpression(ast));
	      }

	      if (this.isIfStatement(ast) === true) {
	        if (ast.condition !== null) {
	          /** Condition met */
	          if (this.evalExpression(ast.condition).value === true) {
	            return this.evaluateBody(ast.consequent, 0, function (result) {
	              return resolve(result);
	            });
	          }
	          if (ast.alternate !== null) {
	            return this.evaluateBody(ast.alternate, 0, function (result) {
	              return resolve(result);
	            });
	          }
	        } else {
	          throw new Error("Invalid if statement condition");
	        }
	        return resolve();
	      }

	      if (this.isAssignmentExpression(ast) === true) {
	        var parent = this.evalExpression(ast.left);
	        var result = this.evalExpression(ast.right);
	        if (result.link !== void 0) {
	          parent.link[parent.property] = result.link[result.property];
	        } else {
	          parent.link[parent.property] = result.value;
	        }
	      }

	      if (this.isCallExpression(ast) === true) {
	        this.evalCallExpression(ast);
	        return resolve();
	      }

	      if (this.isAsyncStatement(ast) === true) {
	        return this.evalCallExpression(ast.init, function (result) {
	          return resolve(result);
	        });
	      }

	      return resolve();
	    }

	    /**
	     * Eval call expression
	     * @param {Object} ast
	     */

	  }, {
	    key: "evalCallExpression",
	    value: function evalCallExpression(ast, resolve) {

	      var callee = this.evalExpression(ast.callee);
	      var cmd = callee.link[callee.property];

	      this.evalArguments(ast.arguments, function (args) {

	        if (args.length >= 1) {
	          args.push(function (result) {
	            return resolve(result);
	          });
	          cmd.apply(callee.link, args);
	        } else {
	          cmd.bind(callee.link)(function (result) {
	            return resolve(result);
	          });
	        }
	      });

	      return void 0;
	    }

	    /**
	     * Eval arguments
	     * @param  {Array} args
	     * @param  {Function} resolve
	     * @return {Array}
	     */

	  }, {
	    key: "evalArguments",
	    value: function evalArguments(args, resolve) {

	      var eArgs = [];

	      var ii = 0;
	      var length = args.length;

	      var index = 0;

	      if (length >= 1) {
	        for (; ii < length; ++ii) {
	          this.evalStatement(args[ii], function (result) {
	            index++;
	            eArgs.push(result);
	            if (index >= length) {
	              resolve(eArgs);
	            }
	          });
	        };
	      } else {
	        resolve(eArgs);
	        return void 0;
	      }
	    }

	    /**
	     * Eval binary expression
	     * @param {Object} ast
	     * @return {Object}
	     */

	  }, {
	    key: "evalExpression",
	    value: function evalExpression(ast) {

	      if (this.isMemberExpression(ast) === true) {
	        return this.evalMemberExpression(this.context, ast);
	      }

	      return {
	        value: this.evalBinaryExpression(ast)
	      };
	    }

	    /**
	     * Eval member expression
	     * @param  {Object} root
	     * @param  {Object} ast
	     * @return {Object}
	     */

	  }, {
	    key: "evalMemberExpression",
	    value: function evalMemberExpression(root, ast) {

	      var link = null;

	      if (this.isLiteral(ast) === true) {
	        return {
	          value: this.evalBinaryExpression(ast)
	        };
	      }
	      if (this.isIdentifier(ast) === true) {
	        return root[ast.name];
	      }

	      if (this.isIdentifier(ast.object) === true) {
	        link = root = root[ast.object.name];
	      }

	      if (root === void 0) {
	        throw new Error(ast.object.name + " => " + ast.property.name + " does not exist!");
	      }

	      if (this.isIdentifier(ast.property) === true) {
	        root = root[ast.property.name];
	      }

	      if (this.isMemberExpression(ast.property) === true) {
	        return this.evalMemberExpression(link, ast.property);
	      }

	      return {
	        link: link,
	        property: ast.property.name
	      };
	    }

	    /**
	     * Eval binary expression
	     * @param {Object} ast
	     * @return {*}
	     */

	  }, {
	    key: "evalBinaryExpression",
	    value: function evalBinaryExpression(ast) {

	      if (this.isLiteral(ast) === true) {
	        return ast.value;
	      }

	      if (this.isIdentifier(ast) === true) {
	        if (this.isBoolean(ast) === true) {
	          return ast.name === "true";
	        }
	      }

	      if (this.isMemberExpression(ast) === true) {
	        var exp = this.evalMemberExpression(this.context, ast);
	        return exp.link[exp.property];
	      }

	      if (ast.operator === "EQ") {
	        return this.evalBinaryExpression(ast.left) === this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "NEQ") {
	        return this.evalBinaryExpression(ast.left) !== this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "LT") {
	        return this.evalBinaryExpression(ast.left) < this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "LE") {
	        return this.evalBinaryExpression(ast.left) <= this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "GT") {
	        return this.evalBinaryExpression(ast.left) > this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "GE") {
	        return this.evalBinaryExpression(ast.left) >= this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "ADD") {
	        return this.evalBinaryExpression(ast.left) + this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "SUB") {
	        return this.evalBinaryExpression(ast.left) - this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "MUL") {
	        return this.evalBinaryExpression(ast.left) * this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "DIV") {
	        return this.evalBinaryExpression(ast.left) / this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "MOD") {
	        return this.evalBinaryExpression(ast.left) % this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "AND") {
	        return this.evalBinaryExpression(ast.left) && this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "OR") {
	        return this.evalBinaryExpression(ast.left) || this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "NOT") {
	        return !this.evalBinaryExpression(ast.init);
	      }

	      return 0;
	    }
	  }]);
	  return Evaluator;
	}();

	exports.default = Evaluator;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	__webpack_require__(118);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var cfg = _interopRequireWildcard(_cfg);

	var _utils = __webpack_require__(7);

	var _functions = __webpack_require__(105);

	var entity = _interopRequireWildcard(_functions);

	var _render = __webpack_require__(123);

	var render = _interopRequireWildcard(_render);

	var _debug = __webpack_require__(125);

	var debug = _interopRequireWildcard(_debug);

	var _webgl = __webpack_require__(129);

	var _webgl2 = _interopRequireDefault(_webgl);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Renderer
	 * @class Renderer
	 * @export
	 */

	var Renderer = function () {

	    /**
	     * @param {Object} instance
	     * @constructor
	     */

	    function Renderer(instance) {
	        (0, _classCallCheck3.default)(this, Renderer);

	        /**
	         * Instance ref
	         * @type {Object}
	         */
	        this.instance = instance;

	        /**
	         * WebGL renderer
	         * @type {Object}
	         */
	        this.glRenderer = null;

	        /**
	         * Size
	         * @type {Object}
	         */
	        this.size = instance.size;

	        /**
	         * Layers ref
	         * @type {Object}
	         */
	        this.layers = instance.layers;

	        /**
	         * Node ref
	         * @type {Object}
	         */
	        this.node = instance.node;

	        /**
	         * WebGL node ref
	         * @type {Object}
	         */
	        this.glNode = instance.glNode;

	        /**
	         * Interface node ref
	         * @type {Object}
	         */
	        this.uiNode = instance.uiNode;

	        /**
	         * Context ref
	         * @type {Object}
	         */
	        this.context = instance.context;

	        /**
	         * Gl context ref
	         * @type {Object}
	         */
	        this.gl = instance.glContext;

	        /**
	         * Image smoothing
	         * @type {Boolean}
	         */
	        this.imageSmoothing = false;

	        /**
	         * Dimension
	         * @type {Number}
	         */
	        this.dimension = cfg.DIMENSION;

	        /**
	         * Delta timer
	         * @type {Number}
	         */
	        this.delta = 0;

	        /**
	         * Now timestamp
	         * @type {Number}
	         */
	        this.now = 0;

	        /**
	         * Then timestamp
	         * @type {Number}
	         */
	        this.then = 0;

	        /**
	         * Width
	         * @type {Number}
	         */
	        this.width = 0;

	        /**
	         * Height
	         * @type {Number}
	         */
	        this.height = 0;

	        /**
	         * Camera ref
	         * @type {Object}
	         */
	        this.camera = instance.camera;

	        if (cfg.WGL_SUPPORT) {
	            this.glRenderer = new _webgl2.default(this);
	        }

	        /**
	         * Auto switch to current game mode dependant rendering
	         */
	        this.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);

	        this.resize(false);
	    }

	    /**
	     * Switch rendering mode
	     * @param {Number} mode
	     */

	    (0, _createClass3.default)(Renderer, [{
	        key: "switchRenderingMode",
	        value: function switchRenderingMode(mode) {

	            if (mode === cfg.WGL) {
	                this.node.style.display = "none";
	                this.glNode.style.display = "block";
	                cfg.RENDER_MODE = mode;
	            }

	            if (mode === cfg.CANVAS) {
	                this.node.style.display = "block";
	                this.glNode.style.display = "none";
	                cfg.RENDER_MODE = mode;
	            }
	        }

	        /**
	         * @param {Boolean} value
	         * @setter
	         */

	    }, {
	        key: "update",

	        /**
	         * Update
	         */
	        value: function update() {

	            this.updateTimers();

	            if (this.camera.objectFocus !== null) {
	                this.camera.animate(this.camera.objectFocus);
	            }

	            return void 0;
	        }

	        /**
	         * Update timers
	         */

	    }, {
	        key: "updateTimers",
	        value: function updateTimers() {
	            this.now = Date.now();
	            this.delta = (this.now - this.then) / 1e3;
	            this.then = this.now;
	            return void 0;
	        }

	        /**
	         * Resize
	         * @param {Boolean} redraw
	         */

	    }, {
	        key: "resize",
	        value: function resize(redraw) {
	            this.width = window.innerWidth;
	            this.height = window.innerHeight;
	            this.camera.width = this.width;
	            this.camera.height = this.height;
	            this.instance.width = this.width;
	            this.instance.height = this.height;
	            this.uiNode.width = this.width;
	            this.uiNode.height = this.height;
	            this.instance.resizeScenes();
	            if (cfg.RENDER_MODE === cfg.WGL) {
	                this.glNode.width = this.width;
	                this.glNode.height = this.height;
	                this.gl.viewport(0, 0, this.width, this.height);
	            } else {
	                this.node.width = this.width;
	                this.node.height = this.height;
	            }
	            this.clear();
	            if (redraw === true) {
	                this.instance.mini.resize();
	                this.draw();
	            }
	        }
	    }, {
	        key: "imageSmoothingEnabled",
	        set: function set(value) {

	            value = value ? true : false;

	            this.imageSmoothing = value;

	            this.context.setImageSmoothing(value);
	        }
	    }]);
	    return Renderer;
	}();

	exports.default = Renderer;

	(0, _utils.inherit)(Renderer, debug);
	(0, _utils.inherit)(Renderer, render);
	(0, _utils.inherit)(Renderer, entity);
	(0, _utils.inherit)(Renderer, webgl);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Howler = __webpack_require__(119);

	window.rAF = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	}();

	/**
	 * @param {Boolean} value
	 */
	CanvasRenderingContext2D.prototype.setImageSmoothing = function (value) {

	  this.imageSmoothingEnabled = value;
	  this.oImageSmoothingEnabled = value;
	  this.msImageSmoothingEnabled = value;
	  this.mozImageSmoothingEnabled = value;
	  this.webkitImageSmoothingEnabled = value;

	  return void 0;
	};

	/**
	 * Clear a context
	 * @param {String} color Clear by color
	 */
	CanvasRenderingContext2D.prototype.clear = function (color) {

	  if (color) {
	    var original = this.fillStyle;
	    this.fillStyle = color;
	    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
	    this.fillStyle = original;
	  } else {
	    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  }

	  return void 0;
	};

	// from: https://developer.mozilla.org/de/docs/Web/Events/wheel
	// creates a global "addWheelListener" method
	// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
	(function (window, document) {

	  var prefix = "",
	      _addEventListener,
	      support;

	  // detect event model
	  if (window.addEventListener) {
	    _addEventListener = "addEventListener";
	  } else {
	    _addEventListener = "attachEvent";
	    prefix = "on";
	  }

	  // detect available wheel event
	  support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	  document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	  "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	  window.addWheelListener = function (elem, callback, useCapture) {
	    _addWheelListener(elem, support, callback, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (support == "DOMMouseScroll") {
	      _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
	    }
	  };

	  function _addWheelListener(elem, eventName, callback, useCapture) {
	    elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
	      !originalEvent && (originalEvent = window.event);

	      // create a normalized event object
	      var event = {
	        // keep a ref to the original event object
	        originalEvent: originalEvent,
	        target: originalEvent.target || originalEvent.srcElement,
	        type: "wheel",
	        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
	        deltaX: 0,
	        deltaZ: 0,
	        preventDefault: function preventDefault() {
	          originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
	        }
	      };

	      // calculate deltaY (and deltaX) according to the event
	      if (support == "mousewheel") {
	        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
	        // Webkit also support wheelDeltaX
	        originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
	      } else {
	        event.deltaY = originalEvent.detail;
	      }

	      // it's time to fire the callback
	      return callback(event);
	    }, useCapture || false);
	  }
	})(window, document);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getOwnPropertyNames = __webpack_require__(120);

	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 *  howler.js v1.1.29
	 *  howlerjs.com
	 *
	 *  (c) 2013-2016, James Simpson of GoldFire Studios
	 *  goldfirestudios.com
	 *
	 *  MIT License
	 */

	(function () {
	  // setup
	  var cache = {};

	  // setup the audio context
	  var ctx = null,
	      usingWebAudio = true,
	      noAudio = false;
	  try {
	    if (typeof AudioContext !== 'undefined') {
	      ctx = new AudioContext();
	    } else if (typeof webkitAudioContext !== 'undefined') {
	      ctx = new webkitAudioContext();
	    } else {
	      usingWebAudio = false;
	    }
	  } catch (e) {
	    usingWebAudio = false;
	  }

	  if (!usingWebAudio) {
	    if (typeof Audio !== 'undefined') {
	      try {
	        new Audio();
	      } catch (e) {
	        noAudio = true;
	      }
	    } else {
	      noAudio = true;
	    }
	  }

	  // create a master gain node
	  if (usingWebAudio) {
	    var masterGain = typeof ctx.createGain === 'undefined' ? ctx.createGainNode() : ctx.createGain();
	    masterGain.gain.value = 1;
	    masterGain.connect(ctx.destination);
	  }

	  // create global controller
	  var HowlerGlobal = function HowlerGlobal(codecs) {
	    this._volume = 1;
	    this._muted = false;
	    this.usingWebAudio = usingWebAudio;
	    this.ctx = ctx;
	    this.noAudio = noAudio;
	    this._howls = [];
	    this._codecs = codecs;
	    this.iOSAutoEnable = true;
	  };
	  HowlerGlobal.prototype = {
	    /**
	     * Get/set the global volume for all sounds.
	     * @param  {Float} vol Volume from 0.0 to 1.0.
	     * @return {Howler/Float}     Returns self or current volume.
	     */
	    volume: function volume(vol) {
	      var self = this;

	      // make sure volume is a number
	      vol = parseFloat(vol);

	      if (vol >= 0 && vol <= 1) {
	        self._volume = vol;

	        if (usingWebAudio) {
	          masterGain.gain.value = vol;
	        }

	        // loop through cache and change volume of all nodes that are using HTML5 Audio
	        for (var key in self._howls) {
	          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	            // loop through the audio nodes
	            for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
	              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
	            }
	          }
	        }

	        return self;
	      }

	      // return the current global volume
	      return usingWebAudio ? masterGain.gain.value : self._volume;
	    },

	    /**
	     * Mute all sounds.
	     * @return {Howler}
	     */
	    mute: function mute() {
	      this._setMuted(true);

	      return this;
	    },

	    /**
	     * Unmute all sounds.
	     * @return {Howler}
	     */
	    unmute: function unmute() {
	      this._setMuted(false);

	      return this;
	    },

	    /**
	     * Handle muting and unmuting globally.
	     * @param  {Boolean} muted Is muted or not.
	     */
	    _setMuted: function _setMuted(muted) {
	      var self = this;

	      self._muted = muted;

	      if (usingWebAudio) {
	        masterGain.gain.value = muted ? 0 : self._volume;
	      }

	      for (var key in self._howls) {
	        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	          // loop through the audio nodes
	          for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
	            self._howls[key]._audioNode[i].muted = muted;
	          }
	        }
	      }
	    },

	    /**
	     * Check for codec support.
	     * @param  {String} ext Audio file extension.
	     * @return {Boolean}
	     */
	    codecs: function codecs(ext) {
	      return this._codecs[ext];
	    },

	    /**
	     * iOS will only allow audio to be played after a user interaction.
	     * Attempt to automatically unlock audio on the first user interaction.
	     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
	     * @return {Howler}
	     */
	    _enableiOSAudio: function _enableiOSAudio() {
	      var self = this;

	      // only run this on iOS if audio isn't already eanbled
	      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
	        return;
	      }

	      self._iOSEnabled = false;

	      // call this method on touch start to create and play a buffer,
	      // then check if the audio actually played to determine if
	      // audio has now been unlocked on iOS
	      var unlock = function unlock() {
	        // create an empty buffer
	        var buffer = ctx.createBuffer(1, 1, 22050);
	        var source = ctx.createBufferSource();
	        source.buffer = buffer;
	        source.connect(ctx.destination);

	        // play the empty buffer
	        if (typeof source.start === 'undefined') {
	          source.noteOn(0);
	        } else {
	          source.start(0);
	        }

	        // setup a timeout to check that we are unlocked on the next event loop
	        setTimeout(function () {
	          if (source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE) {
	            // update the unlocked state and prevent this check from happening again
	            self._iOSEnabled = true;
	            self.iOSAutoEnable = false;

	            // remove the touch start listener
	            window.removeEventListener('touchend', unlock, false);
	          }
	        }, 0);
	      };

	      // setup a touch start listener to attempt an unlock in
	      window.addEventListener('touchend', unlock, false);

	      return self;
	    }
	  };

	  // check for browser codec support
	  var audioTest = null;
	  var codecs = {};
	  if (!noAudio) {
	    audioTest = new Audio();
	    codecs = {
	      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
	      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
	      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
	      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
	      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
	      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
	    };
	  }

	  // allow access to the global audio controls
	  var Howler = new HowlerGlobal(codecs);

	  // setup the audio object
	  var Howl = function Howl(o) {
	    var self = this;

	    // setup the defaults
	    self._autoplay = o.autoplay || false;
	    self._buffer = o.buffer || false;
	    self._duration = o.duration || 0;
	    self._format = o.format || null;
	    self._loop = o.loop || false;
	    self._loaded = false;
	    self._sprite = o.sprite || {};
	    self._src = o.src || '';
	    self._pos3d = o.pos3d || [0, 0, -0.5];
	    self._volume = o.volume !== undefined ? o.volume : 1;
	    self._urls = o.urls || [];
	    self._rate = o.rate || 1;

	    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
	    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
	    // if 3d sound is used
	    self._model = o.model || null;

	    // setup event functions
	    self._onload = [o.onload || function () {}];
	    self._onloaderror = [o.onloaderror || function () {}];
	    self._onend = [o.onend || function () {}];
	    self._onpause = [o.onpause || function () {}];
	    self._onplay = [o.onplay || function () {}];

	    self._onendTimer = [];

	    // Web Audio or HTML5 Audio?
	    self._webAudio = usingWebAudio && !self._buffer;

	    // check if we need to fall back to HTML5 Audio
	    self._audioNode = [];
	    if (self._webAudio) {
	      self._setupAudioNode();
	    }

	    // automatically try to enable audio on iOS
	    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
	      Howler._enableiOSAudio();
	    }

	    // add this to an array of Howl's to allow global control
	    Howler._howls.push(self);

	    // load the track
	    self.load();
	  };

	  // setup all of the methods
	  Howl.prototype = {
	    /**
	     * Load an audio file.
	     * @return {Howl}
	     */
	    load: function load() {
	      var self = this,
	          url = null;

	      // if no audio is available, quit immediately
	      if (noAudio) {
	        self.on('loaderror', new Error('No audio support.'));
	        return;
	      }

	      // loop through source URLs and pick the first one that is compatible
	      for (var i = 0; i < self._urls.length; i++) {
	        var ext, urlItem;

	        if (self._format) {
	          // use specified audio format if available
	          ext = self._format;
	        } else {
	          // figure out the filetype (whether an extension or base64 data)
	          urlItem = self._urls[i];
	          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
	          if (!ext) {
	            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
	          }

	          if (ext) {
	            ext = ext[1].toLowerCase();
	          } else {
	            self.on('loaderror', new Error('Could not extract format from passed URLs, please add format parameter.'));
	            return;
	          }
	        }

	        if (codecs[ext]) {
	          url = self._urls[i];
	          break;
	        }
	      }

	      if (!url) {
	        self.on('loaderror', new Error('No codec support for selected audio sources.'));
	        return;
	      }

	      self._src = url;

	      if (self._webAudio) {
	        loadBuffer(self, url);
	      } else {
	        var newNode = new Audio();

	        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
	        newNode.addEventListener('error', function () {
	          if (newNode.error && newNode.error.code === 4) {
	            HowlerGlobal.noAudio = true;
	          }

	          self.on('loaderror', { type: newNode.error ? newNode.error.code : 0 });
	        }, false);

	        self._audioNode.push(newNode);

	        // setup the new audio node
	        newNode.src = url;
	        newNode._pos = 0;
	        newNode.preload = 'auto';
	        newNode.volume = Howler._muted ? 0 : self._volume * Howler.volume();

	        // setup the event listener to start playing the sound
	        // as soon as it has buffered enough
	        var listener = function listener() {
	          // round up the duration when using HTML5 Audio to account for the lower precision
	          self._duration = Math.ceil(newNode.duration * 10) / 10;

	          // setup a sprite if none is defined
	          if ((0, _getOwnPropertyNames2.default)(self._sprite).length === 0) {
	            self._sprite = { _default: [0, self._duration * 1000] };
	          }

	          if (!self._loaded) {
	            self._loaded = true;
	            self.on('load');
	          }

	          if (self._autoplay) {
	            self.play();
	          }

	          // clear the event listener
	          newNode.removeEventListener('canplaythrough', listener, false);
	        };
	        newNode.addEventListener('canplaythrough', listener, false);
	        newNode.load();
	      }

	      return self;
	    },

	    /**
	     * Get/set the URLs to be pulled from to play in this source.
	     * @param  {Array} urls  Arry of URLs to load from
	     * @return {Howl}        Returns self or the current URLs
	     */
	    urls: function urls(_urls) {
	      var self = this;

	      if (_urls) {
	        self.stop();
	        self._urls = typeof _urls === 'string' ? [_urls] : _urls;
	        self._loaded = false;
	        self.load();

	        return self;
	      } else {
	        return self._urls;
	      }
	    },

	    /**
	     * Play a sound from the current time (0 by default).
	     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
	     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
	     * @return {Howl}
	     */
	    play: function play(sprite, callback) {
	      var self = this;

	      // if no sprite was passed but a callback was, update the variables
	      if (typeof sprite === 'function') {
	        callback = sprite;
	      }

	      // use the default sprite if none is passed
	      if (!sprite || typeof sprite === 'function') {
	        sprite = '_default';
	      }

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function () {
	          self.play(sprite, callback);
	        });

	        return self;
	      }

	      // if the sprite doesn't exist, play nothing
	      if (!self._sprite[sprite]) {
	        if (typeof callback === 'function') callback();
	        return self;
	      }

	      // get the node to playback
	      self._inactiveNode(function (node) {
	        // persist the sprite being played
	        node._sprite = sprite;

	        // determine where to start playing from
	        var pos = node._pos > 0 ? node._pos : self._sprite[sprite][0] / 1000;

	        // determine how long to play for
	        var duration = 0;
	        if (self._webAudio) {
	          duration = self._sprite[sprite][1] / 1000 - node._pos;
	          if (node._pos > 0) {
	            pos = self._sprite[sprite][0] / 1000 + pos;
	          }
	        } else {
	          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
	        }

	        // determine if this sound should be looped
	        var loop = !!(self._loop || self._sprite[sprite][2]);

	        // set timer to fire the 'onend' event
	        var soundId = typeof callback === 'string' ? callback : Math.round(Date.now() * Math.random()) + '',
	            timerId;
	        (function () {
	          var data = {
	            id: soundId,
	            sprite: sprite,
	            loop: loop
	          };
	          timerId = setTimeout(function () {
	            // if looping, restart the track
	            if (!self._webAudio && loop) {
	              self.stop(data.id).play(sprite, data.id);
	            }

	            // set web audio node to paused at end
	            if (self._webAudio && !loop) {
	              self._nodeById(data.id).paused = true;
	              self._nodeById(data.id)._pos = 0;

	              // clear the end timer
	              self._clearEndTimer(data.id);
	            }

	            // end the track if it is HTML audio and a sprite
	            if (!self._webAudio && !loop) {
	              self.stop(data.id);
	            }

	            // fire ended event
	            self.on('end', soundId);
	          }, duration / self._rate * 1000);

	          // store the reference to the timer
	          self._onendTimer.push({ timer: timerId, id: data.id });
	        })();

	        if (self._webAudio) {
	          var loopStart = self._sprite[sprite][0] / 1000,
	              loopEnd = self._sprite[sprite][1] / 1000;

	          // set the play id to this node and load into context
	          node.id = soundId;
	          node.paused = false;
	          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
	          self._playStart = ctx.currentTime;
	          node.gain.value = self._volume;

	          if (typeof node.bufferSource.start === 'undefined') {
	            loop ? node.bufferSource.noteGrainOn(0, pos, 86400) : node.bufferSource.noteGrainOn(0, pos, duration);
	          } else {
	            loop ? node.bufferSource.start(0, pos, 86400) : node.bufferSource.start(0, pos, duration);
	          }
	        } else {
	          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
	            node.readyState = 4;
	            node.id = soundId;
	            node.currentTime = pos;
	            node.muted = Howler._muted || node.muted;
	            node.volume = self._volume * Howler.volume();
	            setTimeout(function () {
	              node.play();
	            }, 0);
	          } else {
	            self._clearEndTimer(soundId);

	            (function () {
	              var sound = self,
	                  playSprite = sprite,
	                  fn = callback,
	                  newNode = node;
	              var listener = function listener() {
	                sound.play(playSprite, fn);

	                // clear the event listener
	                newNode.removeEventListener('canplaythrough', listener, false);
	              };
	              newNode.addEventListener('canplaythrough', listener, false);
	            })();

	            return self;
	          }
	        }

	        // fire the play event and send the soundId back in the callback
	        self.on('play');
	        if (typeof callback === 'function') callback(soundId);

	        return self;
	      });

	      return self;
	    },

	    /**
	     * Pause playback and save the current position.
	     * @param {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    pause: function pause(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function () {
	          self.pause(id);
	        });

	        return self;
	      }

	      // clear 'onend' timer
	      self._clearEndTimer(id);

	      var activeNode = id ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        activeNode._pos = self.pos(null, id);

	        if (self._webAudio) {
	          // make sure the sound has been created
	          if (!activeNode.bufferSource || activeNode.paused) {
	            return self;
	          }

	          activeNode.paused = true;
	          if (typeof activeNode.bufferSource.stop === 'undefined') {
	            activeNode.bufferSource.noteOff(0);
	          } else {
	            activeNode.bufferSource.stop(0);
	          }
	        } else {
	          activeNode.pause();
	        }
	      }

	      self.on('pause');

	      return self;
	    },

	    /**
	     * Stop playback and reset to start.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl}
	     */
	    stop: function stop(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function () {
	          self.stop(id);
	        });

	        return self;
	      }

	      // clear 'onend' timer
	      self._clearEndTimer(id);

	      var activeNode = id ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        activeNode._pos = 0;

	        if (self._webAudio) {
	          // make sure the sound has been created
	          if (!activeNode.bufferSource || activeNode.paused) {
	            return self;
	          }

	          activeNode.paused = true;

	          if (typeof activeNode.bufferSource.stop === 'undefined') {
	            activeNode.bufferSource.noteOff(0);
	          } else {
	            activeNode.bufferSource.stop(0);
	          }
	        } else if (!isNaN(activeNode.duration)) {
	          activeNode.pause();
	          activeNode.currentTime = 0;
	        }
	      }

	      return self;
	    },

	    /**
	     * Mute this sound.
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    mute: function mute(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function () {
	          self.mute(id);
	        });

	        return self;
	      }

	      var activeNode = id ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (self._webAudio) {
	          activeNode.gain.value = 0;
	        } else {
	          activeNode.muted = true;
	        }
	      }

	      return self;
	    },

	    /**
	     * Unmute this sound.
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    unmute: function unmute(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function () {
	          self.unmute(id);
	        });

	        return self;
	      }

	      var activeNode = id ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (self._webAudio) {
	          activeNode.gain.value = self._volume;
	        } else {
	          activeNode.muted = false;
	        }
	      }

	      return self;
	    },

	    /**
	     * Get/set volume of this sound.
	     * @param  {Float}  vol Volume from 0.0 to 1.0.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl/Float}     Returns self or current volume.
	     */
	    volume: function volume(vol, id) {
	      var self = this;

	      // make sure volume is a number
	      vol = parseFloat(vol);

	      if (vol >= 0 && vol <= 1) {
	        self._volume = vol;

	        // if the sound hasn't been loaded, add it to the event queue
	        if (!self._loaded) {
	          self.on('play', function () {
	            self.volume(vol, id);
	          });

	          return self;
	        }

	        var activeNode = id ? self._nodeById(id) : self._activeNode();
	        if (activeNode) {
	          if (self._webAudio) {
	            activeNode.gain.value = vol;
	          } else {
	            activeNode.volume = vol * Howler.volume();
	          }
	        }

	        return self;
	      } else {
	        return self._volume;
	      }
	    },

	    /**
	     * Get/set whether to loop the sound.
	     * @param  {Boolean} loop To loop or not to loop, that is the question.
	     * @return {Howl/Boolean}      Returns self or current looping value.
	     */
	    loop: function loop(_loop) {
	      var self = this;

	      if (typeof _loop === 'boolean') {
	        self._loop = _loop;

	        return self;
	      } else {
	        return self._loop;
	      }
	    },

	    /**
	     * Get/set sound sprite definition.
	     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
	     *                @param {Integer} offset   Where to begin playback in milliseconds
	     *                @param {Integer} duration How long to play in milliseconds
	     *                @param {Boolean} loop     (optional) Set true to loop this sprite
	     * @return {Howl}        Returns current sprite sheet or self.
	     */
	    sprite: function sprite(_sprite) {
	      var self = this;

	      if ((typeof _sprite === 'undefined' ? 'undefined' : (0, _typeof3.default)(_sprite)) === 'object') {
	        self._sprite = _sprite;

	        return self;
	      } else {
	        return self._sprite;
	      }
	    },

	    /**
	     * Get/set the position of playback.
	     * @param  {Float}  pos The position to move current playback to.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl/Float}      Returns self or current playback position.
	     */
	    pos: function pos(_pos, id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function () {
	          self.pos(_pos);
	        });

	        return typeof _pos === 'number' ? self : self._pos || 0;
	      }

	      // make sure we are dealing with a number for pos
	      _pos = parseFloat(_pos);

	      var activeNode = id ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (_pos >= 0) {
	          self.pause(id);
	          activeNode._pos = _pos;
	          self.play(activeNode._sprite, id);

	          return self;
	        } else {
	          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
	        }
	      } else if (_pos >= 0) {
	        return self;
	      } else {
	        // find the first inactive node to return the pos for
	        for (var i = 0; i < self._audioNode.length; i++) {
	          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	            return self._webAudio ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
	          }
	        }
	      }
	    },

	    /**
	     * Get/set the 3D position of the audio source.
	     * The most common usage is to set the 'x' position
	     * to affect the left/right ear panning. Setting any value higher than
	     * 1.0 will begin to decrease the volume of the sound as it moves further away.
	     * NOTE: This only works with Web Audio API, HTML5 Audio playback
	     * will not be affected.
	     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
	     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
	     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
	     */
	    pos3d: function pos3d(x, y, z, id) {
	      var self = this;

	      // set a default for the optional 'y' & 'z'
	      y = typeof y === 'undefined' || !y ? 0 : y;
	      z = typeof z === 'undefined' || !z ? -0.5 : z;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function () {
	          self.pos3d(x, y, z, id);
	        });

	        return self;
	      }

	      if (x >= 0 || x < 0) {
	        if (self._webAudio) {
	          var activeNode = id ? self._nodeById(id) : self._activeNode();
	          if (activeNode) {
	            self._pos3d = [x, y, z];
	            activeNode.panner.setPosition(x, y, z);
	            activeNode.panner.panningModel = self._model || 'HRTF';
	          }
	        }
	      } else {
	        return self._pos3d;
	      }

	      return self;
	    },

	    /**
	     * Fade a currently playing sound between two volumes.
	     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
	     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len      Time in milliseconds to fade.
	     * @param  {Function} callback (optional) Fired when the fade is complete.
	     * @param  {String}   id       (optional) The play instance ID.
	     * @return {Howl}
	     */
	    fade: function fade(from, to, len, callback, id) {
	      var self = this,
	          diff = Math.abs(from - to),
	          dir = from > to ? 'down' : 'up',
	          steps = diff / 0.01,
	          stepTime = len / steps;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function () {
	          self.fade(from, to, len, callback, id);
	        });

	        return self;
	      }

	      // set the volume to the start position
	      self.volume(from, id);

	      for (var i = 1; i <= steps; i++) {
	        (function () {
	          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
	              vol = Math.round(1000 * change) / 1000,
	              toVol = to;

	          setTimeout(function () {
	            self.volume(vol, id);

	            if (vol === toVol) {
	              if (callback) callback();
	            }
	          }, stepTime * i);
	        })();
	      }
	    },

	    /**
	     * [DEPRECATED] Fade in the current sound.
	     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len     Time in milliseconds to fade.
	     * @param  {Function} callback
	     * @return {Howl}
	     */
	    fadeIn: function fadeIn(to, len, callback) {
	      return this.volume(0).play().fade(0, to, len, callback);
	    },

	    /**
	     * [DEPRECATED] Fade out the current sound and pause when finished.
	     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len      Time in milliseconds to fade.
	     * @param  {Function} callback
	     * @param  {String}   id       (optional) The play instance ID.
	     * @return {Howl}
	     */
	    fadeOut: function fadeOut(to, len, callback, id) {
	      var self = this;

	      return self.fade(self._volume, to, len, function () {
	        if (callback) callback();
	        self.pause(id);

	        // fire ended event
	        self.on('end');
	      }, id);
	    },

	    /**
	     * Get an audio node by ID.
	     * @return {Howl} Audio node.
	     */
	    _nodeById: function _nodeById(id) {
	      var self = this,
	          node = self._audioNode[0];

	      // find the node with this ID
	      for (var i = 0; i < self._audioNode.length; i++) {
	        if (self._audioNode[i].id === id) {
	          node = self._audioNode[i];
	          break;
	        }
	      }

	      return node;
	    },

	    /**
	     * Get the first active audio node.
	     * @return {Howl} Audio node.
	     */
	    _activeNode: function _activeNode() {
	      var self = this,
	          node = null;

	      // find the first playing node
	      for (var i = 0; i < self._audioNode.length; i++) {
	        if (!self._audioNode[i].paused) {
	          node = self._audioNode[i];
	          break;
	        }
	      }

	      // remove excess inactive nodes
	      self._drainPool();

	      return node;
	    },

	    /**
	     * Get the first inactive audio node.
	     * If there is none, create a new one and add it to the pool.
	     * @param  {Function} callback Function to call when the audio node is ready.
	     */
	    _inactiveNode: function _inactiveNode(callback) {
	      var self = this,
	          node = null;

	      // find first inactive node to recycle
	      for (var i = 0; i < self._audioNode.length; i++) {
	        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	          // send the node back for use by the new play instance
	          callback(self._audioNode[i]);
	          node = true;
	          break;
	        }
	      }

	      // remove excess inactive nodes
	      self._drainPool();

	      if (node) {
	        return;
	      }

	      // create new node if there are no inactives
	      var newNode;
	      if (self._webAudio) {
	        newNode = self._setupAudioNode();
	        callback(newNode);
	      } else {
	        self.load();
	        newNode = self._audioNode[self._audioNode.length - 1];

	        // listen for the correct load event and fire the callback
	        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
	        var listener = function listener() {
	          newNode.removeEventListener(listenerEvent, listener, false);
	          callback(newNode);
	        };
	        newNode.addEventListener(listenerEvent, listener, false);
	      }
	    },

	    /**
	     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
	     */
	    _drainPool: function _drainPool() {
	      var self = this,
	          inactive = 0,
	          i;

	      // count the number of inactive nodes
	      for (i = 0; i < self._audioNode.length; i++) {
	        if (self._audioNode[i].paused) {
	          inactive++;
	        }
	      }

	      // remove excess inactive nodes
	      for (i = self._audioNode.length - 1; i >= 0; i--) {
	        if (inactive <= 5) {
	          break;
	        }

	        if (self._audioNode[i].paused) {
	          // disconnect the audio source if using Web Audio
	          if (self._webAudio) {
	            self._audioNode[i].disconnect(0);
	          }

	          inactive--;
	          self._audioNode.splice(i, 1);
	        }
	      }
	    },

	    /**
	     * Clear 'onend' timeout before it ends.
	     * @param  {String} soundId  The play instance ID.
	     */
	    _clearEndTimer: function _clearEndTimer(soundId) {
	      var self = this,
	          index = -1;

	      // loop through the timers to find the one associated with this sound
	      for (var i = 0; i < self._onendTimer.length; i++) {
	        if (self._onendTimer[i].id === soundId) {
	          index = i;
	          break;
	        }
	      }

	      var timer = self._onendTimer[index];
	      if (timer) {
	        clearTimeout(timer.timer);
	        self._onendTimer.splice(index, 1);
	      }
	    },

	    /**
	     * Setup the gain node and panner for a Web Audio instance.
	     * @return {Object} The new audio node.
	     */
	    _setupAudioNode: function _setupAudioNode() {
	      var self = this,
	          node = self._audioNode,
	          index = self._audioNode.length;

	      // create gain node
	      node[index] = typeof ctx.createGain === 'undefined' ? ctx.createGainNode() : ctx.createGain();
	      node[index].gain.value = self._volume;
	      node[index].paused = true;
	      node[index]._pos = 0;
	      node[index].readyState = 4;
	      node[index].connect(masterGain);

	      // create the panner
	      node[index].panner = ctx.createPanner();
	      node[index].panner.panningModel = self._model || 'equalpower';
	      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
	      node[index].panner.connect(node[index]);

	      return node[index];
	    },

	    /**
	     * Call/set custom events.
	     * @param  {String}   event Event type.
	     * @param  {Function} fn    Function to call.
	     * @return {Howl}
	     */
	    on: function on(event, fn) {
	      var self = this,
	          events = self['_on' + event];

	      if (typeof fn === 'function') {
	        events.push(fn);
	      } else {
	        for (var i = 0; i < events.length; i++) {
	          if (fn) {
	            events[i].call(self, fn);
	          } else {
	            events[i].call(self);
	          }
	        }
	      }

	      return self;
	    },

	    /**
	     * Remove a custom event.
	     * @param  {String}   event Event type.
	     * @param  {Function} fn    Listener to remove.
	     * @return {Howl}
	     */
	    off: function off(event, fn) {
	      var self = this,
	          events = self['_on' + event];

	      if (fn) {
	        // loop through functions in the event for comparison
	        for (var i = 0; i < events.length; i++) {
	          if (fn === events[i]) {
	            events.splice(i, 1);
	            break;
	          }
	        }
	      } else {
	        self['_on' + event] = [];
	      }

	      return self;
	    },

	    /**
	     * Unload and destroy the current Howl object.
	     * This will immediately stop all play instances attached to this sound.
	     */
	    unload: function unload() {
	      var self = this;

	      // stop playing any active nodes
	      var nodes = self._audioNode;
	      for (var i = 0; i < self._audioNode.length; i++) {
	        // stop the sound if it is currently playing
	        if (!nodes[i].paused) {
	          self.stop(nodes[i].id);
	          self.on('end', nodes[i].id);
	        }

	        if (!self._webAudio) {
	          // remove the source if using HTML5 Audio
	          nodes[i].src = '';
	        } else {
	          // disconnect the output from the master gain
	          nodes[i].disconnect(0);
	        }
	      }

	      // make sure all timeouts are cleared
	      for (i = 0; i < self._onendTimer.length; i++) {
	        clearTimeout(self._onendTimer[i].timer);
	      }

	      // remove the reference in the global Howler object
	      var index = Howler._howls.indexOf(self);
	      if (index !== null && index >= 0) {
	        Howler._howls.splice(index, 1);
	      }

	      // delete this sound from the cache
	      delete cache[self._src];
	      self = null;
	    }

	  };

	  // only define these functions when using WebAudio
	  if (usingWebAudio) {

	    /**
	     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
	     * @param  {Object} obj The Howl object for the sound to load.
	     * @param  {String} url The path to the sound file.
	     */
	    var loadBuffer = function loadBuffer(obj, url) {
	      // check if the buffer has already been cached
	      if (url in cache) {
	        // set the duration from the cache
	        obj._duration = cache[url].duration;

	        // load the sound into this object
	        loadSound(obj);
	        return;
	      }

	      if (/^data:[^;]+;base64,/.test(url)) {
	        // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
	        var data = atob(url.split(',')[1]);
	        var dataView = new Uint8Array(data.length);
	        for (var i = 0; i < data.length; ++i) {
	          dataView[i] = data.charCodeAt(i);
	        }

	        decodeAudioData(dataView.buffer, obj, url);
	      } else {
	        // load the buffer from the URL
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url, true);
	        xhr.responseType = 'arraybuffer';
	        xhr.onload = function () {
	          decodeAudioData(xhr.response, obj, url);
	        };
	        xhr.onerror = function () {
	          // if there is an error, switch the sound to HTML Audio
	          if (obj._webAudio) {
	            obj._buffer = true;
	            obj._webAudio = false;
	            obj._audioNode = [];
	            delete obj._gainNode;
	            delete cache[url];
	            obj.load();
	          }
	        };
	        try {
	          xhr.send();
	        } catch (e) {
	          xhr.onerror();
	        }
	      }
	    };

	    /**
	     * Decode audio data from an array buffer.
	     * @param  {ArrayBuffer} arraybuffer The audio data.
	     * @param  {Object} obj The Howl object for the sound to load.
	     * @param  {String} url The path to the sound file.
	     */
	    var decodeAudioData = function decodeAudioData(arraybuffer, obj, url) {
	      // decode the buffer into an audio source
	      ctx.decodeAudioData(arraybuffer, function (buffer) {
	        if (buffer) {
	          cache[url] = buffer;
	          loadSound(obj, buffer);
	        }
	      }, function (err) {
	        obj.on('loaderror', err);
	      });
	    };

	    /**
	     * Finishes loading the Web Audio API sound and fires the loaded event
	     * @param  {Object}  obj    The Howl object for the sound to load.
	     * @param  {Objecct} buffer The decoded buffer sound source.
	     */
	    var loadSound = function loadSound(obj, buffer) {
	      // set the duration
	      obj._duration = buffer ? buffer.duration : obj._duration;

	      // setup a sprite if none is defined
	      if ((0, _getOwnPropertyNames2.default)(obj._sprite).length === 0) {
	        obj._sprite = { _default: [0, obj._duration * 1000] };
	      }

	      // fire the loaded event
	      if (!obj._loaded) {
	        obj._loaded = true;
	        obj.on('load');
	      }

	      if (obj._autoplay) {
	        obj.play();
	      }
	    };

	    /**
	     * Load the sound back into the buffer source.
	     * @param  {Object} obj   The sound to load.
	     * @param  {Array}  loop  Loop boolean, pos, and duration.
	     * @param  {String} id    (optional) The play instance ID.
	     */
	    var refreshBuffer = function refreshBuffer(obj, loop, id) {
	      // determine which node to connect to
	      var node = obj._nodeById(id);

	      // setup the buffer source for playback
	      node.bufferSource = ctx.createBufferSource();
	      node.bufferSource.buffer = cache[obj._src];
	      node.bufferSource.connect(node.panner);
	      node.bufferSource.loop = loop[0];
	      if (loop[0]) {
	        node.bufferSource.loopStart = loop[1];
	        node.bufferSource.loopEnd = loop[1] + loop[2];
	      }
	      node.bufferSource.playbackRate.value = obj._rate;
	    };
	  }

	  /**
	   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	   */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return {
	        Howler: Howler,
	        Howl: Howl
	      };
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }

	  /**
	   * Add support for CommonJS libraries such as browserify.
	   */
	  if (true) {
	    exports.Howler = Howler;
	    exports.Howl = Howl;
	  }

	  // define globally in case AMD is not available or available but not used

	  if (typeof window !== 'undefined') {
	    window.Howler = Howler;
	    window.Howl = Howl;
	  }
	})();

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	__webpack_require__(122);
	module.exports = function getOwnPropertyNames(it){
	  return $.getNames(it);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(69)('getOwnPropertyNames', function(){
	  return __webpack_require__(76).get;
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;
	exports.clear = clear;
	exports.draw = draw;
	exports.renderMap = renderMap;
	exports.getAnimationFrame = getAnimationFrame;
	exports.entityInSelectionRange = entityInSelectionRange;
	exports.orbit = orbit;
	exports.updateEntity = updateEntity;
	exports.updateEntitySpriteFrame = updateEntitySpriteFrame;
	exports.renderEntities = renderEntities;
	exports.renderEntity = renderEntity;
	exports.renderShadow = renderShadow;
	exports.drawPixelText = drawPixelText;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _grid = __webpack_require__(124);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Rendering
	 */
	function render() {
	  var _this = this;

	  this.clear();

	  this.instance.sort();

	  this.update();

	  this.draw();

	  if (_cfg.DEBUG_MODE === true) {
	    if (_cfg.DEBUG_FPS === 60) {
	      window.rAF(function () {
	        return _this.render();
	      });
	    } else {
	      setTimeout(function () {
	        return _this.render();
	      }, 1E3 / _cfg.DEBUG_FPS);
	    }
	    return void 0;
	  }

	  window.rAF(function () {
	    return _this.render();
	  });

	  return void 0;
	}

	/**
	 * Clear
	 */
	function clear() {
	  if (_cfg.RENDER_MODE === _cfg.CANVAS) {
	    this.node.width = this.node.width;
	    this.context.setImageSmoothing(this.imageSmoothing);
	  }
	  if (_cfg.RENDER_MODE === _cfg.WGL) {
	    this.glRenderer.gl.clearColor(0, 0, 0, 0);
	    this.glRenderer.gl.clear(this.glRenderer.gl.COLOR_BUFFER_BIT);
	  }
	  return void 0;
	}

	/**
	 * Draw
	 */
	function draw() {

	  if (_cfg.RENDER_MODE === _cfg.CANVAS) {
	    this.renderMap();
	  }

	  this.renderEntities();

	  if (_cfg.DEBUG_MODE === true) {
	    this.context.beginPath();
	    (0, _grid.drawGrid)(this.context, this.camera.position.x, this.camera.position.y, this.width, this.height, this.dimension, this.camera.resolution * _cfg.GRID_WIDTH, .05, "#FFF");
	    this.context.closePath();
	    if (_cfg.EDIT_MODE === true) {
	      this.instance.editor.renderEditorMode();
	    }
	    this.renderDebugScene();
	  }

	  if (_cfg.MINI_MAP === true) {
	    if (this.instance.mini.redraw === true) {
	      this.instance.mini.draw(0, this.instance.currentMap.entities);
	      this.context.drawImage(this.instance.mini.bgBuffer.canvas, this.instance.mini.position.x, this.instance.mini.position.y, this.instance.mini.width, this.instance.mini.height);
	    }
	  }

	  return void 0;
	}

	/**
	 * Render map
	 */
	function renderMap() {

	  var map = this.instance.currentMap;

	  var dim = _cfg.DIMENSION;

	  /** Render background layer */
	  this.context.drawImage(map.buffers[1].canvas, 0, 0,
	  /** Scale */
	  map.size.x * dim, map.size.y * dim, this.camera.position.x << 0, this.camera.position.y << 0, map.size.x * dim / 2 * this.camera.resolution << 0, map.size.y * dim / 2 * this.camera.resolution << 0);

	  return void 0;
	}

	/**
	 * Get animation frame
	 * @param  {Object} entity
	 * @return {Number}
	 */
	function getAnimationFrame(entity) {
	  return Math.floor((this.now - entity.animationStart) / entity.animationSpeed) % (entity.animationFrames - 1 + (entity.loop === true ? 1 : 0)) * (entity.size.x * 2 << 0 * entity.size.x / entity.frames);
	}

	/**
	 * Check if entity is in selection range
	 * @param  {Number}  id
	 * @return {Boolean}
	 */
	function entityInSelectionRange(id) {

	  var ii = 0;
	  var length = 0;

	  var entities = this.instance.editor.selectedEntities;

	  length = entities.length;

	  for (; ii < length; ++ii) {
	    if (entities[ii] === id) return true;
	  };

	  return false;
	}

	/**
	 * Orbit animation
	 * @param  {Object} entity
	 */
	function orbit(entity) {

	  entity.orbitAngle += entity.velocity * 2 * Math.PI / 180;

	  var target = entity.orbitTarget;

	  var radius = (target.size.x * target.scale + target.size.y * target.scale) / _cfg.DIMENSION * 2;

	  var xPadding = radius - _cfg.DIMENSION / 2;
	  var yPadding = radius - _cfg.DIMENSION / 2;

	  xPadding += target.xMargin;
	  yPadding += target.yMargin / 2;

	  entity.x = target.position.x + xPadding + radius * Math.cos(entity.orbitAngle);
	  entity.y = target.position.y + yPadding + radius * Math.sin(entity.orbitAngle);

	  /** Stop the orbit on a dimension friendly position */
	  if (entity.stopOrbit === true && (entity.x << 0) % 8 === 0 && (entity.y << 0) % 8 === 0) {
	    entity.x = _Math2.default.roundTo(entity.x, _cfg.DIMENSION);
	    entity.y = _Math2.default.roundTo(entity.y, _cfg.DIMENSION);
	    entity.orbitAround(null);
	    entity.stopOrbit = false;
	  }

	  /*if (entity.orbitAngle > 360) {
	    entity.orbitAngle = 0;
	  }*/

	  return void 0;
	}

	/**
	 * Update entity
	 * @param  {Object} entity
	 * @return {Boolean} renderable
	 */
	function updateEntity(entity) {

	  if (entity.lifeTime > 0) {
	    if (this.now >= entity.lifeTime) {
	      entity.lifeTime = 0;
	      entity.fadeOut(1, true);
	    }
	  }

	  entity.animate();

	  if (entity.orbit === true) {
	    this.orbit(entity);
	  }

	  if (this.instance.camera.isInView(entity.position.x + entity.xMargin, entity.position.y + entity.yMargin, entity.size.x * entity.scale, entity.size.y * 2 * entity.scale + entity.shadowY) === false) {
	    return false;
	  }

	  if (entity.opacity === .0) {
	    return false;
	  }

	  if (entity.texture === null) {
	    return false;
	  }

	  return true;
	}

	/**
	 * Update a entitys sprite frame
	 * @param {Object} entity
	 */
	function updateEntitySpriteFrame(entity) {

	  if (entity.animation === true) {
	    entity.sFrame = this.getAnimationFrame(entity) / (entity.size.x * 2);
	  } else {
	    entity.sFrame = (entity.frames[entity.frame] + entity.getFrameIndex()) * (entity.size.x / entity.scale * 2) / (entity.size.x * 2) + entity.facing * entity.texture.yMul;
	  }

	  return void 0;
	}

	/**
	 * Render entities
	 */
	function renderEntities() {

	  var gl = _cfg.RENDER_MODE === _cfg.WGL;

	  var entities = this.instance.currentMap.entities;

	  var entity = null;

	  var resolution = this.camera.resolution;

	  var camX = this.camera.position.x;
	  var camY = this.camera.position.y;

	  var ii = 0;
	  var length = entities.length;

	  var scaling = .0;

	  for (; ii < length; ++ii) {
	    entity = entities[ii];
	    entity.idleTime++;
	    if (this.updateEntity(entity) === false) continue;
	    if (entity.opacity < 0) {
	      this.instance.removeEntity(entity);
	      --length;
	      --ii;
	      continue;
	    }
	    this.updateEntitySpriteFrame(entity);
	    if (gl === true) continue;
	    scaling = entity.scale + -entity.z / resolution / ((entity.size.x + entity.size.y) / 2);
	    this.renderEntity(entity,
	    /** Position */
	    camX + (entity.position.x + entity.xMargin + entity.z / (entity.size.x / 2) / 2) * resolution << 0, camY + (entity.position.y + entity.yMargin + entity.z) * resolution << 0,
	    /** Size */
	    entity.size.x * resolution * scaling << 0, entity.size.y * resolution * scaling << 0,
	    /** Scale */
	    entity.size.x / scaling * 2 * scaling << 0, entity.size.y / scaling * 2 * scaling << 0);
	  };

	  if (gl === true && this.glRenderer.ready === true) {
	    this.glRenderer.draw();
	  }

	  return void 0;
	}

	/**
	 * Render a single entity
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderEntity(entity, x, y, width, height, eWidth, eHeight) {

	  var resolution = this.camera.resolution;

	  var cOpacity = entity.customOpacity();

	  if (cOpacity === true) {
	    this.context.globalAlpha = entity.opacity;
	  }

	  /** Shadow */
	  if (_cfg.DISPLAY_SHADOWS === true && entity.hasShadow === true) {
	    this.renderShadow(entity, x, y, width, height, eWidth, eHeight);
	  }

	  if (_cfg.EDIT_MODE === true) {
	    if (this.entityInSelectionRange(entity.id)) {
	      this.context.globalAlpha = .75;
	      this.context.globalCompositeOperation = "screen";
	    }
	  }

	  this.context.drawImage(entity.texture.effect_sprites[entity.sFrame].canvas, 0, 0,
	  /** Scale */
	  eWidth, eHeight, x, y, width, height);

	  /** Reset ctx opacity */
	  if (cOpacity === true) {
	    this.context.globalAlpha = 1.0;
	  }

	  if (_cfg.EDIT_MODE === true) {
	    this.context.globalAlpha = 1.0;
	    this.context.globalCompositeOperation = "source-over";
	  }

	  this.context.resetTransform();

	  return void 0;
	}

	/**
	 * Render shadow
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderShadow(entity, x, y, width, height, eWidth, eHeight) {

	  var resolution = this.camera.resolution;

	  this.context.drawImage(
	  /** Texture */
	  entity.shadow.texture.sprites[entity.sFrame].canvas, 0, 0,
	  /** Scale */
	  eWidth, eHeight,
	  /** Position */
	  x + entity.shadow.position.x * entity.scale * resolution << 0, y + entity.shadow.position.y * entity.scale * resolution + eHeight / 2 * entity.scale * resolution << 0,
	  /** Scretch */
	  (width + entity.shadow.scale.x * entity.scale * resolution) / _cfg.SHADOW_X << 0, (height + entity.shadow.scale.y * entity.scale * resolution) / _cfg.SHADOW_Y << 0);

	  return void 0;
	}

	/**
	 * Draw pixel based text
	 * @param {String} str
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} fontSize
	 * @param {Number} lineWidth
	 * @param {String} color
	 */
	function drawPixelText(str, x, y, fontSize, lineWidth, color) {

	  this.context.font = fontSize + "px AdvoCut";
	  this.context.strokeStyle = color;
	  this.context.lineWidth = lineWidth;
	  this.context.strokeText(str, x, y);
	  this.context.fillStyle = "white";
	  this.context.fillText(str, x, y);

	  return void 0;
	}

/***/ },
/* 124 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drawGrid = drawGrid;
	/**
	 * Draw a grid
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} dim
	 * @param {Number} scale
	 * @param {Number} ln
	 * @param {String} color
	 */
	function drawGrid(ctx, x, y, width, height, dim, scale, ln, color) {

	  var ww = dim * scale;
	  var hh = dim * scale;

	  var xx = x % ww;
	  var yy = y % hh;

	  for (; xx < width; xx += ww) {
	    ctx.moveTo(xx - ln, 0);
	    ctx.lineTo(xx - ln, height);
	  };

	  for (; yy < height; yy += hh) {
	    ctx.moveTo(0, yy + ln);
	    ctx.lineTo(width, yy + ln);
	  };

	  ctx.strokeStyle = color;
	  ctx.lineWidth = ln;

	  ctx.stroke();

	  ctx.closePath();

	  return void 0;
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderDebugScene = renderDebugScene;

	var _keys = __webpack_require__(126);

	var _keys2 = _interopRequireDefault(_keys);

	var _utils = __webpack_require__(7);

	var _cfg = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Render debug scene
	 */
	function renderDebugScene() {

	  var color = '#313131';

	  this.drawPixelText("WIDTH: " + this.width + " HEIGHT " + this.height, 15, 30, 20, 1.5, color);

	  this.drawPixelText("DIMENSION: " + _cfg.DIMENSION, 15, 60, 20, 1.5, color);

	  this.drawPixelText("X: " + this.camera.x.toFixed(2) + " Y: " + this.camera.y.toFixed(2), 15, 90, 20, 1.5, color);

	  this.drawPixelText("DELTA: " + this.delta * 1E3 + " ms", 15, 120, 20, 1.5, color);

	  this.drawPixelText("SCALE: " + this.camera.resolution.toFixed(6), 15, 150, 20, 1.5, color);

	  this.drawPixelText("ENTITIES: " + this.instance.currentMap.entities.length, 15, 180, 20, 1.5, color);

	  var ii = 0;
	  var kk = 0;

	  var length = 0;

	  var entities = this.instance.currentMap.entities;

	  length = entities.length;

	  for (; ii < length; ++ii) {
	    if (this.instance.camera.isInView(entities[ii].position.x, entities[ii].position.y, entities[ii].size.x, entities[ii].size.y * 2 + entities[ii].shadowY) && ++kk) {}
	  };

	  this.drawPixelText("ENTITIES IN VIEW: " + kk, 15, 210, 20, 1.5, color);

	  this.drawPixelText("TEXTURES: " + (0, _keys2.default)(_utils.TextureCache).length, 15, 240, 20, 1.5);

	  if (this.instance.localEntity !== null) {
	    this.drawPixelText("LOCAL X: " + this.instance.localEntity.x + " Y: " + this.instance.localEntity.y.toFixed(2), 15, 270, 20, 1.5, color);
	  }

	  this.drawPixelText("COMMAND STACK: " + (this.instance.editor.commander.position + 1) + " | " + this.instance.editor.commander.stack.length, 15, 300, 20, 1.5, color);

	  this.drawPixelText("GOD MODE: " + (_cfg.GOD_MODE === true ? "enabled" : "disabled"), 15, 330, 20, 1.5, color);

	  this.drawPixelText("FREE CAMERA: " + (_cfg.FREE_CAMERA === true ? "enabled" : "disabled"), 15, 360, 20, 1.5, color);

	  this.drawPixelText("EDIT MODE: " + (_cfg.EDIT_MODE === true ? "enabled" : "disabled"), 15, 390, 20, 1.5, color);
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(128);
	module.exports = __webpack_require__(19).Object.keys;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(68);

	__webpack_require__(69)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(7);

	var _shaders = __webpack_require__(130);

	var shaders = _interopRequireWildcard(_shaders);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * WebGL Renderer
	 * @class WGL_Renderer
	 * @export
	 */
	/**
	 * Code inspired by gles.js webgl renderer
	 */

	var WGL_Renderer = function () {

	    /**
	     * @param {Object} instance
	     * @constructor
	     */

	    function WGL_Renderer(instance) {
	        (0, _classCallCheck3.default)(this, WGL_Renderer);

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

	    (0, _createClass3.default)(WGL_Renderer, [{
	        key: "init",
	        value: function init() {

	            var gl = this.gl;

	            var entities = this.instance.instance.currentMap.entities;

	            var length = entities.length;

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
	    }, {
	        key: "initLighting",
	        value: function initLighting() {

	            this.lightZ = 0.075, this.lightSize = 256;

	            this.ambientColor = new Float32Array([0.8, 0.8, 0.8, 0.3]);
	            this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
	            this.falloff = new Float32Array([0.4, 7.0, 30.0]);
	            this.lightPos = new Float32Array([0, 0, this.lightZ]);
	        }

	        /**
	         * Draw webgl based
	         */

	    }, {
	        key: "draw",
	        value: function draw() {

	            var gl = this.gl;

	            var loc = null;
	            var entity = null;

	            var x = 0;
	            var y = 0;

	            var width = 0;
	            var height = 0;

	            var entities = this.instance.instance.currentMap.entities;

	            var length = entities.length;

	            var ii = 0;
	            var jj = 0;

	            var camera = this.instance.camera;

	            var resolution = camera.resolution;

	            var camX = camera.position.x;
	            var camY = camera.position.y;

	            gl.useProgram(this.shaderProgram);

	            loc = gl.getUniformLocation(this.shaderProgram, "uScale");
	            gl.uniform2f(loc, this.instance.width, this.instance.height);

	            loc = gl.getUniformLocation(this.shaderProgram, "uObjScale");

	            for (; ii < length; ++ii) {

	                entity = entities[ii];

	                x = camX + (entity.position.x + entity.xMargin) * resolution << 0;
	                y = camY + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	                width = entity.size.x * resolution << 0;
	                height = entity.size.y * resolution << 0;

	                for (jj = 0; jj < 6; ++jj) {
	                    this.spritepos[12 * ii + 2 * jj] = x + width / 2;
	                    this.spritepos[12 * ii + 2 * jj + 1] = y + height / 2;
	                };

	                gl.uniform2f(loc, width, height);

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

	    }, {
	        key: "bufferTexture",
	        value: function bufferTexture(canvas) {

	            var gl = this.gl;

	            var texture = gl.createTexture();

	            var image = (0, _utils.canvasToImage)(canvas);

	            gl.bindTexture(gl.TEXTURE_2D, texture);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.bindTexture(gl.TEXTURE_2D, null);

	            return texture;
	        }

	        /**
	         * Compile a shader
	         * @param {Number} type
	         * @param {Object} shader
	         * @param {String} shader_src
	         */

	    }, {
	        key: "compileShader",
	        value: function compileShader(type, shader, shader_src) {

	            var gl = this.gl;

	            gl.shaderSource(shader, shader_src);
	            gl.compileShader(shader);

	            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	                throw "shader " + type + " compile error: " + gl.getShaderInfoLog(shader);
	            }
	        }

	        /**
	         * Compile shaders
	         */

	    }, {
	        key: "compileShaders",
	        value: function compileShaders() {

	            var gl = this.gl;

	            var entities = this.instance.instance.currentMap.entities;

	            var length = entities.length;

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

	    }, {
	        key: "resizeGL",
	        value: function resizeGL(width, height) {

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

	    }, {
	        key: "setAttribute",
	        value: function setAttribute(program, buffer, varname, numitems, itemsize, values) {

	            var gl = this.gl;

	            var attribute = gl.getAttribLocation(program, varname);

	            gl.enableVertexAttribArray(attribute);
	            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	            if (values) {
	                gl.bufferData(gl.ARRAY_BUFFER, values, gl.DYNAMIC_DRAW);
	            }

	            gl.vertexAttribPointer(attribute, itemsize, gl.FLOAT, false, 0, 0);
	        }
	    }]);
	    return WGL_Renderer;
	}();

	exports.default = WGL_Renderer;

/***/ },
/* 130 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Shaders taken from gles.js webgl renderer
	 */

	var spritevs = exports.spritevs = "\n  precision lowp float;\n  uniform vec2 uScale;\n  uniform vec2 uObjScale;\n  attribute vec2 aObjCen;\n  attribute float aObjRot;\n  attribute float aIdx;\n  varying vec2 uv;\n  void main(void) {\n    if (aIdx == 0.0) {\n      uv = vec2(0.0,0.0);\n    } else if (aIdx == 1.0) {\n      uv = vec2(1.0,0.0);\n    } else if (aIdx == 2.0) {\n      uv = vec2(0.0,1.0);\n    } else {\n      uv = vec2(1.0,1.0);\n    }\n    vec2 pos = vec2(\n      aObjCen.x + sin(aObjRot)*uObjScale.y*(-0.5 + uv.y)\n      + cos(aObjRot)*uObjScale.x*(-0.5 + uv.x),\n      aObjCen.y + cos(aObjRot)*uObjScale.y*(-0.5 + uv.y)\n      - sin(aObjRot)*uObjScale.x*(-0.5 + uv.x)\n    );\n    gl_Position = vec4(\n      -1.0 + 2.0*pos.x/uScale.x,\n      1.0 - 2.0*pos.y/uScale.y,\n      0.0, 1.0\n    );\n  }\n";

	var spritefs = exports.spritefs = "\n  precision lowp float;\n  uniform sampler2D uSampler;\n  varying vec2 uv;\n  void main(void) {\n    gl_FragColor = texture2D(uSampler, uv);\n    if (gl_FragColor.a < 0.5) discard;\n  }\n";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Camera
	 * @class Camera
	 * @export
	 */

	var Camera = function (_DisplayObject) {
	  (0, _inherits3.default)(Camera, _DisplayObject);

	  /**
	   * @constructor
	   * @param {Object} instance
	   */

	  function Camera(instance) {
	    (0, _classCallCheck3.default)(this, Camera);

	    /**
	     * Instance ref
	     * @type {Object}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Camera).call(this, null));

	    _this.instance = instance;

	    /**
	     * Camera size
	     * @type {Number}
	     */
	    _this.width = instance.width;
	    _this.height = instance.height;

	    /**
	     * Drag offset
	     * @type {Object}
	     */
	    _this.drag = {
	      px: 0,
	      py: 0,
	      pz: 0,
	      sx: 0,
	      sy: 0
	    };

	    /**
	     * Dragging state
	     * @type {Boolean}
	     */
	    _this.dragging = false;

	    /** Camera size */
	    _this.size.set(_this.width || 0, _this.height || 0);

	    /**
	     * Camera scaling
	     * @type {Number}
	     */
	    _this.scaling = .0;

	    /**
	     * Camera calculated resolution
	     * @type {Number}
	     */
	    _this.resolution = .0;

	    /**
	     * Base offset
	     * @type {Object}
	     */
	    _this.base = new _Math2.default.Point(.0, .0);

	    /**
	     * Target offset
	     * @type {Object}
	     */
	    _this.target = new _Math2.default.Point(.0, .0);

	    /**
	     * Object to focus
	     * @type {Object}
	     */
	    _this.objectFocus = null;

	    /**
	     * Scale
	     * @type {Number}
	     * @getter
	     * @setter
	     */
	    Object.defineProperty(_this, "scale", {
	      get: function get() {
	        return this.scaling;
	      },
	      set: function set(value) {
	        this.scaling = value;
	        this.refreshResolution();
	      }
	    });

	    return _this;
	  }

	  /**
	   * Get game relative mouse offset
	   * @param  {Number} x clientX
	   * @param  {Number} y clientY
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Camera, [{
	    key: "getGameMouseOffset",
	    value: function getGameMouseOffset(x, y) {

	      var xx = (x - this.x) / this.resolution;
	      var yy = (y - this.y) / this.resolution;

	      return {
	        x: Math.ceil(xx / _cfg.DIMENSION) * _cfg.DIMENSION - _cfg.DIMENSION,
	        y: Math.ceil(yy / _cfg.DIMENSION) * _cfg.DIMENSION - _cfg.DIMENSION
	      };
	    }

	    /**
	     * Move
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "move",
	    value: function move(x, y) {

	      this.x += x - this.drag.px;
	      this.y += y - this.drag.py;

	      this.drag.px = x;
	      this.drag.py = y;
	    }

	    /**
	     * Click
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "click",
	    value: function click(x, y) {

	      this.drag.sx = (x - this.x) / this.resolution;
	      this.drag.sy = (y - this.y) / this.resolution;

	      this.drag.px = x;
	      this.drag.py = y;
	    }

	    /**
	     * Refresh the resolution
	     */

	  }, {
	    key: "refreshResolution",
	    value: function refreshResolution() {
	      this.resolution = _Math2.default.roundTo(parseFloat(_Math2.default.zoomScale(this.scale)), _cfg.PIXEL_SCALE);
	    }

	    /**
	     * Zoom
	     * @param {Object} e
	     */

	  }, {
	    key: "zoom",
	    value: function zoom(e) {

	      var delta = e.deltaY === -0 ? e.deltaX : e.deltaY;

	      var amount = delta ? -delta : delta;

	      amount = amount / 2 / (_Math2.default.hypot(this.size.x, this.size.y) / Math.PI) * _Math2.default.zoomScale(this.scale);

	      this.drag.pz = this.resolution;

	      this.scale += amount / 2;

	      if (this.scale < _cfg.MIN_SCALE) this.scale = _cfg.MIN_SCALE;
	      if (this.scale > _cfg.MAX_SCALE) this.scale = _cfg.MAX_SCALE;

	      if (_cfg.FREE_CAMERA === true) {
	        this.position.x -= this.drag.sx * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	        this.position.y -= this.drag.sy * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	      } else {
	        if (this.objectFocus !== null) {
	          this.position.x -= this.objectFocus.x * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	          this.position.y -= this.objectFocus.y * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	        }
	      }
	    }

	    /**
	     * Get x center position
	     * @param  {Number} x
	     * @return {Number}
	     */

	  }, {
	    key: "getX",
	    value: function getX(x) {
	      return this.size.x / 2 - x * this.resolution;
	    }

	    /**
	     * Get y center position
	     * @param  {Number} y
	     * @return {Number}
	     */

	  }, {
	    key: "getY",
	    value: function getY(y) {
	      return this.size.y / 2 - y * this.resolution;
	    }

	    /**
	     * Update object focus
	     * @param  {Number} object
	     */

	  }, {
	    key: "updateFocus",
	    value: function updateFocus(object) {

	      this.base = {
	        x: this.position.x,
	        y: this.position.y
	      };

	      this.target = {
	        x: this.getX(object.position.x),
	        y: this.getY(object.position.y + object.z)
	      };

	      this.deltaX = this.target.x - this.base.x;
	      this.deltaY = this.target.y - this.base.y;

	      return void 0;
	    }

	    /**
	     * Play camera animations
	     * @param {Object} object
	     */

	  }, {
	    key: "animate",
	    value: function animate(object) {

	      if (_cfg.FREE_CAMERA === true) return void 0;

	      this.updateFocus(object);

	      var velocity = _cfg.FIX_CAMERA === true ? 0 : _Math2.default.ease(Math.atan(1.05));

	      var x = this.target.x - (this.base.x + velocity * this.deltaX);
	      var y = this.target.y - (this.base.y + velocity * this.deltaY);

	      if (Math.abs(this.position.x + x - this.target.x) > Math.abs(this.position.x - this.target.x)) {
	        this.position.x = this.target.x;
	        this.base.x = this.target.x;
	      } else {
	        this.position.x += x;
	      }

	      if (Math.abs(this.position.y + y - this.target.y) > Math.abs(this.position.y - this.target.y)) {
	        this.position.y = this.target.y;
	        this.base.y = this.target.y;
	      } else {
	        this.position.y += y;
	      }

	      return void 0;
	    }

	    /**
	     * Animate focus
	     * @param {Object} object
	     */

	  }, {
	    key: "animateFocus",
	    value: function animateFocus(object) {
	      this.updateFocus(object);
	      this.objectFocus = object;
	    }

	    /**
	     * Focus a object
	     * @param {Object}  object
	     * @param {Boolean} instant
	     */

	  }, {
	    key: "focus",
	    value: function focus(object, instant) {
	      if (instant === true) {
	        if (object === null || object === void 0) return void 0;
	        this.objectFocus = object;
	        this.position.x = this.getX(object.position.x);
	        this.position.y = this.getY(object.position.y);
	        return void 0;
	      }
	      this.animateFocus(object);
	    }

	    /**
	     * Cubic in view
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     * @return {Boolean}
	     */

	  }, {
	    key: "inView",
	    value: function inView(x, y, width, height) {

	      return x + width >= 0 && x <= this.size.x && y + height >= 0 && y <= this.size.y;
	    }

	    /**
	     * Is in view
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }, {
	    key: "isInView",
	    value: function isInView(x, y, width, height) {

	      return this.inView(x * this.resolution + this.position.x << 0, y * this.resolution + this.position.y << 0, width * this.resolution << 0, height * this.resolution << 0);
	    }
	  }]);
	  return Camera;
	}(_DisplayObject3.default);

	exports.default = Camera;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Language = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Lang
	 * @class Lang
	 * @export
	 */

	var Lang = function () {

	  /**
	   * @constructor
	   */

	  function Lang() {
	    (0, _classCallCheck3.default)(this, Lang);

	    /**
	     * Language packets
	     * @type {Object}
	     */
	    this.packets = {};

	    /**
	     * Active packet ref
	     * @type {Object}
	     */
	    this.activePacket = null;
	  }

	  /**
	   * Get language dependant string
	   * @param  {String} key
	   * @return {String}
	   */

	  (0, _createClass3.default)(Lang, [{
	    key: "get",
	    value: function get(key) {
	      return this.activePacket[key];
	    }

	    /**
	     * Switch to another language packet
	     * @param {String}   lang
	     * @param {Function} resolve
	     */

	  }, {
	    key: "switch",
	    value: function _switch(lang, resolve) {}
	  }]);
	  return Lang;
	}();

	var Language = exports.Language = new Lang();

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Keyboard = __webpack_require__(134);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _Mouse = __webpack_require__(135);

	var _Mouse2 = _interopRequireDefault(_Mouse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Input
	 * @class Input
	 * @export
	 */

	var Input = function () {

	  /**
	   * @constructor
	   */

	  function Input(events, instance) {
	    (0, _classCallCheck3.default)(this, Input);

	    this.instance = instance;

	    this.events = events;

	    this.KeyBoard = new _Keyboard2.default();
	    this.Mouse = new _Mouse2.default();

	    this.registerKeys();
	    this.registerMouse();
	    this.registerGlobal();
	  }

	  /**
	   * Register keys
	   */

	  (0, _createClass3.default)(Input, [{
	    key: "registerKeys",
	    value: function registerKeys() {

	      if (this.events.keys === void 0) return void 0;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.events.keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _context;

	          var key = _step.value;

	          this.KeyBoard.registerKey(key, (_context = this.instance, key.fire).bind(_context), key.leave instanceof Function ? (_context = this.instance, key.leave).bind(_context) : void 0);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register mouse
	     */

	  }, {
	    key: "registerMouse",
	    value: function registerMouse() {

	      if (this.events.mouse === void 0) return void 0;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(this.events.mouse), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var ev = _step2.value;

	          this.Mouse.registerEvent(ev, this.instance);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register globals
	     */

	  }, {
	    key: "registerGlobal",
	    value: function registerGlobal() {

	      if (this.events.global === void 0) return void 0;

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = (0, _getIterator3.default)(this.events.global), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var ev = _step3.value;

	          this.registerGlobalEvent(ev, this.instance);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register event
	     * @param {Object} event
	     */

	  }, {
	    key: "registerGlobalEvent",
	    value: function registerGlobalEvent(event) {
	      var _context2;

	      window.addEventListener(event.name, (_context2 = this.instance, event.fire).bind(_context2), false);
	    }
	  }]);
	  return Input;
	}();

	exports.default = Input;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(126);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Keyboard
	 * @class Keyboard
	 * @export
	 */

	var Keyboard = function () {

	    /**
	     * @param {Object} obj
	     * @constructor
	     */

	    function Keyboard(obj) {
	        (0, _classCallCheck3.default)(this, Keyboard);

	        /**
	         * Enter keycode
	         * @attribute ENTER
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.ENTER = 13;

	        /**
	         * SPACE keycode
	         * @attribute SPACE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SPACE = 32;

	        /**
	         * BACKSPACE keycode
	         * @attribute BACKSPACE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.BACKSPACE = 8;

	        /**
	         * TAB keycode
	         * @attribute TAB
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.TAB = 9;

	        /**
	         * SHIFT keycode
	         * @attribute SHIFT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SHIFT = 16;

	        /**
	         * CTRL keycode
	         * @attribute CTRL
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.CTRL = 17;

	        /**
	         * ALT keycode
	         * @attribute ALT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.ALT = 18;

	        /**
	         * PAUSE keycode
	         * @attribute PAUSE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.PAUSE = 19;

	        /**
	         * CAPSLOCK keycode
	         * @attribute CAPSLOCK
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.CAPSLOCK = 20;

	        /**
	         * ESCAPE keycode
	         * @attribute ESCAPE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.ESCAPE = 27;

	        /**
	         * PAGEUP keycode
	         * @attribute PAGEUP
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.PAGEUP = 33;

	        /**
	         * PAGEDOWN keycode
	         * @attribute PAGEDOWN
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.PAGEDOWN = 34;

	        /**
	         * END keycode
	         * @attribute END
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.END = 35;

	        /**
	         * HOME keycode
	         * @attribute HOME
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.HOME = 36;

	        /**
	         * LEFT keycode
	         * @attribute LEFT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["←"] = 37;

	        /**
	         * UP keycode
	         * @attribute UP
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["↑"] = 38;

	        /**
	         * RIGHT keycode
	         * @attribute RIGHT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["→"] = 39;

	        /**
	         * DOWN keycode
	         * @attribute DOWN
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["↓"] = 40;

	        /**
	         * INSERT keycode
	         * @attribute INSERT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.INSERT = 45;

	        /**
	         * DELETE keycode
	         * @attribute DELETE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.DELETE = 46;

	        /**
	         * 0 keycode
	         * @attribute 0
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["0"] = 48;

	        /**
	         * 1 keycode
	         * @attribute 1
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["1"] = 49;

	        /**
	         * 2 keycode
	         * @attribute 2
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["2"] = 50;

	        /**
	         * 3 keycode
	         * @attribute 3
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["3"] = 51;

	        /**
	         * 4 keycode
	         * @attribute 4
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["4"] = 52;

	        /**
	         * 5 keycode
	         * @attribute 5
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["5"] = 53;

	        /**
	         * 6 keycode
	         * @attribute 6
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["6"] = 54;

	        /**
	         * 7 keycode
	         * @attribute 7
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["7"] = 55;

	        /**
	         * 8 keycode
	         * @attribute 8
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["8"] = 56;

	        /**
	         * 9 keycode
	         * @attribute 9
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this["9"] = 57;

	        /**
	         * A keycode
	         * @attribute A
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.A = 65;

	        /**
	         * B keycode
	         * @attribute B
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.B = 66;

	        /**
	         * C keycode
	         * @attribute C
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.C = 67;

	        /**
	         * D keycode
	         * @attribute D
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.D = 68;

	        /**
	         * E keycode
	         * @attribute E
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.E = 69;

	        /**
	         * F keycode
	         * @attribute F
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F = 70;

	        /**
	         * G keycode
	         * @attribute G
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.G = 71;

	        /**
	         * H keycode
	         * @attribute H
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.H = 72;

	        /**
	         * I keycode
	         * @attribute I
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.I = 73;

	        /**
	         * J keycode
	         * @attribute J
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.J = 74;

	        /**
	         * K keycode
	         * @attribute K
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.K = 75;

	        /**
	         * L keycode
	         * @attribute L
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.L = 76;

	        /**
	         * M keycode
	         * @attribute M
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.M = 77;

	        /**
	         * N keycode
	         * @attribute N
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.N = 78;

	        /**
	         * O keycode
	         * @attribute O
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.O = 79;

	        /**
	         * P keycode
	         * @attribute P
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.P = 80;

	        /**
	         * Q keycode
	         * @attribute Q
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.Q = 81;

	        /**
	         * R keycode
	         * @attribute R
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.R = 82;

	        /**
	         * S keycode
	         * @attribute S
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.S = 83;

	        /**
	         * T keycode
	         * @attribute T
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.T = 84;

	        /**
	         * U keycode
	         * @attribute U
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.U = 85;

	        /**
	         * V keycode
	         * @attribute V
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.V = 86;

	        /**
	         * W keycode
	         * @attribute W
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.W = 87;

	        /**
	         * X keycode
	         * @attribute X
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.X = 88;

	        /**
	         * Y keycode
	         * @attribute Y
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.Y = 89;

	        /**
	         * Z keycode
	         * @attribute Z
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.Z = 90;

	        /**
	         * SELECT keycode
	         * @attribute SELECT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SELECT = 93;

	        /**
	         * NUMPAD0 keycode
	         * @attribute NUMPAD0
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD0 = 96;

	        /**
	         * NUMPAD1 keycode
	         * @attribute NUMPAD1
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD1 = 97;

	        /**
	         * NUMPAD2 keycode
	         * @attribute NUMPAD2
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD2 = 98;

	        /**
	         * NUMPAD3 keycode
	         * @attribute NUMPAD3
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD3 = 99;

	        /**
	         * NUMPAD4 keycode
	         * @attribute NUMPAD4
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD4 = 100;

	        /**
	         * NUMPAD5 keycode
	         * @attribute NUMPAD5
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD5 = 101;

	        /**
	         * NUMPAD6 keycode
	         * @attribute NUMPAD6
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD6 = 102;

	        /**
	         * NUMPAD7 keycode
	         * @attribute NUMPAD7
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD7 = 103;

	        /**
	         * NUMPAD8 keycode
	         * @attribute NUMPAD8
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD8 = 104;

	        /**
	         * NUMPAD9 keycode
	         * @attribute NUMPAD9
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMPAD9 = 105;

	        /**
	         * MULTIPLY keycode
	         * @attribute MULTIPLY
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.MULTIPLY = 106;

	        /**
	         * ADD keycode
	         * @attribute ADD
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.ADD = 107;

	        /**
	         * SUBTRACT keycode
	         * @attribute SUBTRACT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SUBTRACT = 109;

	        /**
	         * DECIMALPOINT keycode
	         * @attribute DECIMALPOINT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.DECIMALPOINT = 110;

	        /**
	         * DIVIDE keycode
	         * @attribute DIVIDE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.DIVIDE = 111;

	        /**
	         * F1 keycode
	         * @attribute F1
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F1 = 112;

	        /**
	         * F2 keycode
	         * @attribute F2
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F2 = 113;

	        /**
	         * F3 keycode
	         * @attribute F3
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F3 = 114;

	        /**
	         * F4 keycode
	         * @attribute F4
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F4 = 115;

	        /**
	         * F5 keycode
	         * @attribute F5
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F5 = 116;

	        /**
	         * F6 keycode
	         * @attribute F6
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F6 = 117;

	        /**
	         * F7 keycode
	         * @attribute F7
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F7 = 118;

	        /**
	         * F8 keycode
	         * @attribute F8
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F8 = 119;

	        /**
	         * F9 keycode
	         * @attribute F9
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F9 = 120;

	        /**
	         * F10 keycode
	         * @attribute F10
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F10 = 121;

	        /**
	         * F11 keycode
	         * @attribute F11
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F11 = 122;

	        /**
	         * F12 keycode
	         * @attribute F12
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.F12 = 123;

	        /**
	         * NUMLOCK keycode
	         * @attribute NUMLOCK
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.NUMLOCK = 144;

	        /**
	         * SCROLLLOCK keycode
	         * @attribute SCROLLLOCK
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SCROLLLOCK = 145;

	        /**
	         * SEMICOLON keycode
	         * @attribute SEMICOLON
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SEMICOLON = 186;

	        /**
	         * EQUALSIGN keycode
	         * @attribute EQUALSIGN
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.EQUALSIGN = 187;

	        /**
	         * COMMA keycode
	         * @attribute COMMA
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.COMMA = 188;

	        /**
	         * DASH keycode
	         * @attribute DASH
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.DASH = 189;

	        /**
	         * PERIOD keycode
	         * @attribute PERIOD
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.PERIOD = 190;

	        /**
	         * FORWARDSLASH keycode
	         * @attribute FORWARDSLASH
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.FORWARDSLASH = 191;

	        /**
	         * GRAVEACCENT keycode
	         * @attribute GRAVEACCENT
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.GRAVEACCENT = 192;

	        /**
	         * OPENBRACKET keycode
	         * @attribute OPENBRACKET
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.OPENBRACKET = 219;

	        /**
	         * BACKSLASH keycode
	         * @attribute BACKSLASH
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.BACKSLASH = 220;

	        /**
	         * CLOSEBRACKET keycode
	         * @attribute CLOSEBRACKET
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.CLOSEBRACKET = 221;

	        /**
	         * SINGLEQUOTE keycode
	         * @attribute SINGLEQUOTE
	         * @type {Number}
	         * @static
	         * @final
	         */
	        this.SINGLEQUOTE = 222;

	        /**
	         * Registered keys
	         * @attribute KEYS
	         * @type {Object}
	         */
	        this.KEYS = {};

	        /**
	         * Registered key combos
	         * @attribute COMBOS
	         * @type {Object}
	         */
	        this.COMBOS = {};

	        /**
	         * Hash table
	         * @type {Array}
	         */
	        this.hashes = [];

	        /** Keyboard hash */
	        this.hash = (0, _utils.uHash)();

	        /** Keyboard fresh rate */
	        this.rate = 60;

	        this.init(obj);

	        return this;
	    }

	    /**
	     * Initialise
	     * @param {Object} obj
	     */

	    (0, _createClass3.default)(Keyboard, [{
	        key: "init",
	        value: function init(obj) {

	            /** Register passed in keys */
	            if (obj instanceof Object && (0, _keys2.default)(obj).length > 0) {
	                /** Keyboard fresh rate */
	                this.rate = obj.rate || 60;
	                for (var key in obj) {
	                    if (key.toUpperCase() === key && key !== "rate" && key !== "hash") {
	                        this.registerKey(key, obj[key]);
	                    }
	                };
	            }

	            /** Key loop */
	            this.keyLoop = setInterval(function () {
	                this.fireKeys();
	            }.bind(this), this.rate);

	            this.fireKeys();

	            window.addEventListener('keydown', function (e) {
	                this.switchKey(this.hash, e.keyCode, 1, e);
	            }.bind(this));

	            window.addEventListener('keyup', function (e) {
	                this.switchKey(this.hash, e.keyCode, 0, e);
	            }.bind(this));
	        }

	        /**
	         * Fire a combo
	         * @param {Object} combo
	         */

	    }, {
	        key: "fireCombo",
	        value: function fireCombo(combo, name, state, event) {
	            this.COMBOS[name].state = state;
	            combo.state = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(combo.combo), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (this.COMBOS[key].state !== 1) return void 0;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            ;
	            combo.state = 1;
	        }

	        /**
	         * Switch fire key
	         * @param {Number} hash
	         * @param {Number} name
	         * @param {Number} state
	         * @param {Object} event
	         */

	    }, {
	        key: "switchKey",
	        value: function switchKey(hash, name, state, event) {

	            var key = String(name);

	            if (this.isComboKey(name) === true) {
	                var combo = this.COMBOS[name].parent;
	                this.COMBOS[key].state = state;
	                this.updateKey(combo, state);
	                this.fireCombo(combo, name, state, event);
	            }

	            if (this.hash !== hash || this.validKey(key) === false || state > 1 || state < 0) {
	                return void 0;
	            }

	            this.updateKey(this.KEYS[key], state);

	            event.preventDefault();

	            return void 0;
	        }

	        /**
	         * Update a key
	         * @param {Object} key
	         * @param {Number} state
	         */

	    }, {
	        key: "updateKey",
	        value: function updateKey(key, state) {

	            key.state = state;

	            if (state === 0) {
	                key.left = 1;
	            }
	            if (key.spam === false) {
	                if (state === 0) {
	                    key.fireable = true;
	                }
	            }
	        }

	        /**
	         * Registered key is valid
	         * @param {Number} name
	         * @return {Boolean}
	         */

	    }, {
	        key: "validKey",
	        value: function validKey(name) {

	            var key = String(name);

	            return this.KEYS[key] instanceof Object && this.KEYS[key].fire instanceof Function && this.KEYS[key].state <= 1 && this.KEYS[key].state >= 0;
	        }

	        /**
	         * Validate a key code
	         * @param  {String} code
	         * @return {Boolean}
	         */

	    }, {
	        key: "validCode",
	        value: function validCode(code) {
	            var key = code;
	            if ((code = this[key] || -1) === -1 || this.KEYS[key] !== void 0) {
	                throw new Error(key + " is a invalid key!");
	                return false;
	            }
	            return true;
	        }

	        /**
	         * Register key combo
	         * @param {Object}   obj
	         * @param {Function} fire
	         * @param {Function} leave
	         */

	    }, {
	        key: "registerKeyCombo",
	        value: function registerKeyCombo(obj, fire, leave) {

	            var key = String(obj.name);

	            var combo = key.split("+");

	            var codes = [];

	            this.COMBOS[key] = {};

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(combo), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var code = _step2.value;

	                    if (this.validCode(code) === false) {
	                        return void 0;
	                    }
	                    codes.push(this[code]);
	                    this.COMBOS[this[code]] = {
	                        parent: this.COMBOS[key],
	                        name: code,
	                        fire: fire,
	                        leave: leave,
	                        left: 0,
	                        state: 0,
	                        fireable: true,
	                        spam: obj.spam
	                    };
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            ;

	            this.COMBOS[key].combo = codes;
	            this.COMBOS[key].fire = fire;
	            this.COMBOS[key].leave = leave;
	            this.COMBOS[key].left = 0;
	            this.COMBOS[key].state = 0;
	            this.COMBOS[key].fireable = true;
	            this.COMBOS[key].spam = obj.spam;
	        }

	        /**
	         * Register a key
	         * @param {Object}   obj
	         * @param {Function} fire
	         * @param {Function} leave
	         */

	    }, {
	        key: "registerKey",
	        value: function registerKey(obj, fire, leave) {

	            var key = String(obj.name);

	            var isCombo = key.split("+").length > 1;

	            var code = null;

	            if (isCombo === true) {
	                this.registerKeyCombo(obj, fire, leave);
	                return void 0;
	            }

	            if (this.validCode(key) === false) return void 0;

	            this.KEYS[this[key]] = {
	                name: obj.name,
	                fire: fire,
	                leave: leave,
	                left: 0,
	                state: 0,
	                fireable: true,
	                spam: obj.spam
	            };

	            return void 0;
	        }

	        /**
	         * Fire registered keys
	         */

	    }, {
	        key: "fireKeys",
	        value: function fireKeys() {

	            var key = null;

	            for (key in this.KEYS) {
	                if (this.validKey(key) === true) {
	                    if (this.isComboKey(key) === true) {
	                        var combo = this.COMBOS[key].parent;
	                        if (combo.simultaneous !== false && combo.state === 0) {
	                            this.fireKey(this.hash, this.KEYS[key]);
	                        }
	                    } else {
	                        this.fireKey(this.hash, this.KEYS[key]);
	                    }
	                }
	            };

	            for (key in this.COMBOS) {
	                if (this.COMBOS[key].parent === void 0) {
	                    this.fireKey(this.hash, this.COMBOS[key]);
	                }
	            };

	            return void 0;
	        }

	        /**
	         * Key is a combo key
	         * @param  {String} key
	         * @return {Boolean}
	         */

	    }, {
	        key: "isComboKey",
	        value: function isComboKey(key) {
	            return this.COMBOS[key] !== void 0 && this.COMBOS[key] instanceof Object === true;
	        }

	        /**
	         * Fire a single key
	         * @param {Number} hash
	         * @param {Object} key
	         */

	    }, {
	        key: "fireKey",
	        value: function fireKey(hash, key) {

	            if (key.state === 1) {
	                if (key.fireable === true) {
	                    key.fire();
	                    if (key.spam !== void 0) {
	                        key.fireable = false;
	                    }
	                }
	            } else {
	                if (key.leave !== void 0 && key.state === 0 && key.left === 1) {
	                    key.leave();
	                    key.left = 0;
	                }
	            }

	            return void 0;
	        }

	        /**
	         * Check if a key is pressed
	         * @param {String|Number} key
	         * @return {Boolean}
	         */

	    }, {
	        key: "isKeyPressed",
	        value: function isKeyPressed(key) {
	            var isString = typeof key === "string";
	            if (isString === true) {
	                if (this[key] !== void 0) {
	                    return this.KEYS[this[key]] !== void 0 && this.KEYS[this[key]].state === 1;
	                }
	                return false;
	            }
	            return this.KEYS[key] !== void 0 && this.KEYS[key].state === 1;
	        }
	    }]);
	    return Keyboard;
	}();

	exports.default = Keyboard;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Mouse
	 * @class Mouse
	 * @export
	 */

	var Mouse = function () {

	  /**
	   * @constructor
	   * @param {Array} events
	   */

	  function Mouse(events) {
	    (0, _classCallCheck3.default)(this, Mouse);

	    return this;
	  }

	  /**
	   * Register a mouse event
	   * @param {Object} event
	   */

	  (0, _createClass3.default)(Mouse, [{
	    key: "registerEvent",
	    value: function registerEvent(event, root) {

	      var fire = null;

	      var events = event.name.split("|");

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(events), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var ev = _step.value;

	          if (ev === "mousewheel") {
	            window.addWheelListener(document.body, function (e) {
	              return event.fire.call(root, e);
	            });
	          } else {
	            window.addEventListener(ev, function (e) {
	              return event.fire.call(root, e);
	            }, false);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }
	  }]);
	  return Mouse;
	}();

	exports.default = Mouse;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(7);

	var _render = __webpack_require__(137);

	var render = _interopRequireWildcard(_render);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _Commander = __webpack_require__(138);

	var _Commander2 = _interopRequireDefault(_Commander);

	var _commands = __webpack_require__(139);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Editor
	 * @class Editor
	 * @export
	 */

	var Editor = function () {

	    /**
	     * @constructor
	     * @param {Object} instance
	     */

	    function Editor(instance) {
	        (0, _classCallCheck3.default)(this, Editor);

	        /**
	         * Instance ref
	         * @type {Object}
	         */
	        this.instance = instance;

	        /**
	         * Context ref
	         * @type {Object}
	         */
	        this.context = instance.context;

	        /**
	         * Instance reference
	         * @type {Object}
	         */
	        this.commander = new _Commander2.default();

	        /**
	         * Map reference
	         * @type {Object}
	         */
	        this.map = null;

	        /**
	         * Camera reference
	         * @type {Object}
	         */
	        this.camera = null;

	        /**
	         * Selected entity
	         * @type {Object}
	         */
	        this.entitySelection = null;

	        /**
	         * Selection
	         * @type {Object}
	         */
	        this.selection = {
	            x1: 0,
	            y1: 0,
	            x2: 0,
	            y2: 0
	        };

	        this.selectedEntities = [];

	        /**
	         * Copied entity
	         * @type {Object}
	         */
	        this.entityCopy = null;

	        /**
	         * Pasted entity
	         * @type {Object}
	         */
	        this.pastedEntity = null;

	        /**
	         * Editing states
	         * @type {Object}
	         */
	        this.STATES = {
	            DRAGGING: false,
	            SELECTING: false
	        };

	        /**
	         * Drag helper
	         * @type {Object}
	         */
	        this.drag = new _Math2.default.Point(0, 0);

	        /**
	         * Dragging
	         * @type {Boolean}
	         * @getter
	         * @setter
	         */
	        Object.defineProperty(this, "dragging", {
	            get: function get() {
	                return this.STATES.DRAGGING;
	            },
	            set: function set(value) {
	                this.STATES.DRAGGING = value;
	            }
	        });

	        this.inheritInstance(instance);

	        this.init();
	    }

	    /**
	     * Inherit instance
	     * @param {Object} instance
	     */

	    (0, _createClass3.default)(Editor, [{
	        key: "inheritInstance",
	        value: function inheritInstance(instance) {

	            this.map = instance.currentMap;

	            this.camera = instance.camera;
	        }

	        /**
	         * Initialise
	         */

	    }, {
	        key: "init",
	        value: function init() {

	            /** Register all commands */
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(_commands.commands), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var cmd = _step.value;

	                    this.commander.newCommand(cmd);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            ;
	        }

	        /**
	         * Do a selection
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "selectFrom",
	        value: function selectFrom(x, y) {

	            var offset = this.camera.getGameMouseOffset(x, y);

	            this.selection.x1 = offset.x;
	            this.selection.y1 = offset.y;

	            this.selection.x2 = 0;
	            this.selection.y2 = 0;
	        }

	        /**
	         * Do a selection
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "selectTo",
	        value: function selectTo(x, y) {

	            var offset = this.camera.getGameMouseOffset(x, y);

	            this.selection.x2 = offset.x;
	            this.selection.y2 = offset.y;

	            this.getSelectionRange(this.selection.x1, this.selection.y1, this.selection.x2, this.selection.y2);
	        }

	        /**
	         * Get selection out of a range
	         * @param {Number} x1
	         * @param {Number} y1
	         * @param {Number} x2
	         * @param {Number} y2
	         */

	    }, {
	        key: "getSelectionRange",
	        value: function getSelectionRange(x1, y1, x2, y2) {

	            var entity = null;

	            var entities = [];

	            var ii = 0;
	            var length = 0;

	            var xx1 = x1 > x2 ? x2 : x1 - _cfg.DIMENSION;
	            var yy1 = y1 > y2 ? y2 : y1;

	            var width = Math.abs(x2 - x1);
	            var height = Math.abs(y2 - y1);

	            var eWidth = 0;
	            var eHeight = 0;

	            length = this.map.entities.length;

	            for (; ii < length; ++ii) {
	                entity = this.map.entities[ii];
	                eWidth = entity.width * entity.scale + (x2 >= x1 ? -_cfg.DIMENSION : 0);
	                eHeight = entity.height * entity.scale;
	                if (_Math2.default.linearIntersect(xx1, yy1, width + eWidth - _cfg.DIMENSION, height + eHeight - _cfg.DIMENSION, entity.x + entity.xMargin + eWidth - _cfg.DIMENSION, entity.y + entity.yMargin + entity.z + _cfg.Y_DEPTH_HACK + eHeight - _cfg.DIMENSION, 1)) {
	                    entities.push(entity.id);
	                }
	            };

	            this.selectedEntities = entities;
	        }

	        /**
	         * Get a entity by mouse offset
	         * @param  {Number} x
	         * @param  {Number} y
	         * @param  {Object}
	         * @return {Object}
	         */

	    }, {
	        key: "getEntityByMouse",
	        value: function getEntityByMouse(x, y) {

	            var object = null;

	            var entity = null;

	            var offset = this.camera.getGameMouseOffset(x, y);

	            var xx = offset.x << 0;
	            var yy = offset.y << 0;

	            var ii = 0;
	            var length = this.map.entities.length;;

	            var entities = [];

	            for (; ii < length; ++ii) {
	                entity = this.map.entities[ii];
	                if (_Math2.default.linearIntersect(_Math2.default.roundTo(entity.position.x, _cfg.DIMENSION), _Math2.default.roundTo(entity.position.y, _cfg.DIMENSION) << 0, entity.size.x * entity.scale + entity.xMargin - _cfg.DIMENSION, entity.size.y * entity.scale + entity.yMargin - _cfg.DIMENSION, xx, yy, 1) === true) {
	                    entities.push(entity);
	                }
	            };

	            if (entities.length <= 0) return null;

	            return entities[_Math2.default.get2DClosest(entities, xx, yy)];
	        }

	        /**
	         * Drag a entity
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "dragEntity",
	        value: function dragEntity(x, y) {

	            var entity = null;
	            var offset = null;

	            var xx = 0;
	            var yy = 0;

	            if ((entity = this.entitySelection) === null) return void 0;

	            /** Don't allow dragging of focused entity */
	            if (_cfg.FREE_CAMERA === false && this.camera.objectFocus !== null && entity.id === this.camera.objectFocus.id) {
	                return void 0;
	            }

	            offset = this.camera.getGameMouseOffset(x, y);

	            /** Only fire drag if we got a new offset to drag to */
	            if (offset.x === this.drag.x && offset.y === this.drag.y) return void 0;

	            xx = offset.x - this.drag.x;
	            yy = offset.y - this.drag.y;

	            this.commander.push("drag", entity, [xx, yy]);

	            this.drag.x = offset.x;
	            this.drag.y = offset.y;
	        }

	        /**
	         * Select a entity
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "selectEntity",
	        value: function selectEntity(x, y) {

	            var entity = this.getEntityByMouse(x, y);

	            var offset = this.camera.getGameMouseOffset(x, y);

	            if (entity !== null) {
	                if ((0, _utils.tileContainsImageData)(entity.texture.sprites[entity.sFrame], (offset.x - entity.x) / entity.scale << 0, (offset.y - entity.y) / entity.scale << 0, _cfg.DIMENSION, _cfg.DIMENSION) === false) {
	                    entity = null;
	                }
	            }

	            this.commander.push("select", this, [entity, this.entitySelection]);

	            this.drag.x = offset.x;
	            this.drag.y = offset.y;
	        }

	        /**
	         * Edit a entity
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: "editEntity",
	        value: function editEntity(x, y) {

	            var entity = this.getEntityByMouse(x, y);

	            if (entity === null) return void 0;

	            console.log(entity);
	        }

	        /**
	         * Delete selected entity
	         */

	    }, {
	        key: "deleteEntity",
	        value: function deleteEntity() {

	            if (this.entitySelection !== null) {
	                this.commander.push("delete", this, [this.entitySelection]);
	            }
	        }

	        /**
	         * Cut out selected entity
	         */

	    }, {
	        key: "cutEntity",
	        value: function cutEntity() {

	            if (this.entitySelection !== null) {
	                this.commander.push("cut", this, [this.entitySelection]);
	            }
	        }

	        /**
	         * Copy selected entity
	         */

	    }, {
	        key: "copyEntity",
	        value: function copyEntity() {

	            if (this.entitySelection !== null) {
	                this.commander.push("copy", this, [this.entitySelection, this.entityCopy]);
	            }
	        }

	        /**
	         * Paste selected entity
	         */

	    }, {
	        key: "pasteEntity",
	        value: function pasteEntity() {

	            this.entityPaste = this.entityCopy;

	            this.commander.push("paste", this, [this.entityCopy, this.entityPaste]);
	        }
	    }]);
	    return Editor;
	}();

	exports.default = Editor;

	(0, _utils.inherit)(Editor, render);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderEditorMode = renderEditorMode;
	exports.renderSelectedEntities = renderSelectedEntities;
	exports.renderSelection = renderSelection;
	exports.renderEntitySelection = renderEntitySelection;
	exports.renderEntityCollisionBox = renderEntityCollisionBox;
	exports.renderSelectionText = renderSelectionText;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Edit mode
	 */
	function renderEditorMode() {

	  this.renderSelection();

	  if (this.instance.editor.STATES.SELECTING === true) {
	    //this.renderSelectedEntities();
	  }

	  this.renderEntitySelection();
	}

	/**
	 * Render selected entities
	 */
	function renderSelectedEntities() {

	  var ii = 0;
	  var length = 0;

	  var entity = null;
	  var entities = this.instance.editor.selectedEntities;

	  length = entities.length;

	  var resolution = 0;

	  var x = 0;
	  var y = 0;

	  var width = 0;
	  var height = 0;

	  for (; ii < length; ++ii) {

	    entity = entities[ii];

	    resolution = this.camera.resolution;

	    x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	    y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	    width = entity.size.x * resolution << 0;
	    height = entity.size.y * resolution << 0;

	    this.context.beginPath();

	    this.context.strokeStyle = "red";
	    this.context.lineWidth = resolution / 2 << 0;
	    this.context.strokeRect(x, y, width, height);
	    this.context.stroke();

	    this.context.closePath();
	  };
	}

	/**
	 * Render selection
	 */
	function renderSelection() {

	  if (this.instance.editor.STATES.SELECTING === false) return void 0;

	  var selection = this.instance.editor.selection;

	  var resolution = this.camera.resolution;

	  var x = this.camera.x + selection.x1 * resolution << 0;
	  var y = this.camera.y + selection.y1 * resolution << 0;

	  var width = (selection.x2 - selection.x1) * resolution << 0;
	  var height = (selection.y2 - selection.y1) * resolution << 0;

	  this.context.beginPath();

	  this.context.strokeStyle = "red";
	  this.context.lineWidth = resolution / 2 << 0;
	  this.context.strokeRect(x, y, width, height);
	  this.context.stroke();

	  this.context.closePath();

	  return void 0;
	}

	/**
	 * Render entity selection
	 */
	function renderEntitySelection() {

	  var entity = this.instance.editor.entitySelection;

	  if (entity === null) return void 0;

	  if (this.camera.isInView(entity.position.x, entity.position.y, entity.size.x * entity.scale, entity.size.y * entity.scale) === false) return void 0;
	  if (entity.opacity === .0) return void 0;
	  if (entity.texture === null) return void 0;

	  var resolution = this.camera.resolution;

	  var x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	  var y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	  var width = entity.size.x * entity.scale * resolution << 0;
	  var height = entity.size.y * entity.scale * resolution << 0;

	  this.context.beginPath();

	  this.context.strokeStyle = "red";
	  this.context.lineWidth = resolution / 2 << 0;
	  this.context.strokeRect(x, y, width, height);
	  this.context.stroke();

	  this.context.closePath();

	  this.renderSelectionText(entity, x, y);

	  this.context.globalAlpha = .25;

	  if (entity.collidable === true) {
	    if (entity.collisionBox.length > 0) {
	      this.renderEntityCollisionBox(entity, x, y);
	    } else {
	      this.context.fillStyle = "red";
	      this.context.fillRect(x, y, width, height);
	      this.context.fill();
	    }
	  }

	  this.context.globalAlpha = 1.0;

	  return void 0;
	}

	/**
	 * Render entity collision box
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 */
	function renderEntityCollisionBox(entity, x, y) {

	  var collision = entity.collisionBox;

	  var resolution = this.camera.resolution;

	  var tile = 0;

	  var ii = 0;

	  var xx = 0;
	  var yy = 0;

	  var dim = _cfg.DIMENSION * entity.scale * resolution;

	  var width = entity.width / _cfg.DIMENSION;
	  var height = entity.height / _cfg.DIMENSION;

	  var length = width * height;

	  for (; ii < length; ++ii) {
	    tile = collision[yy + xx];
	    if (tile === 1) {
	      this.context.fillStyle = "red";
	      this.context.fillRect(x + xx * dim, y + yy / width * dim, dim, dim);
	      this.context.fill();
	    }
	    ++xx;
	    if (xx >= width) {
	      yy += width;
	      xx = 0;
	    }
	  };

	  return void 0;
	}

	/**
	 * Render entity selection text
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 */
	function renderSelectionText(entity, x, y) {

	  var resolution = this.camera.resolution;

	  var color = "red";

	  var ln = .5 * resolution;
	  var size = 2.5 * resolution;

	  var xx = x;
	  var yy = y - ln * 1.25 - size;

	  var decimals = 1;

	  var txtX = "X: " + entity.position.x.toFixed(decimals);
	  var txtY = "Y: " + entity.position.y.toFixed(decimals);

	  this.instance.renderer.drawPixelText(txtX, xx, yy, size, ln, color);

	  this.instance.renderer.drawPixelText(txtY, xx, yy += size, size, ln, color);

	  return void 0;
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Commander
	 * @class Commander
	 * @export
	 */

	var Commander = function () {

	  /**
	   * @constructor
	   */

	  function Commander() {
	    (0, _classCallCheck3.default)(this, Commander);

	    /**
	     * Stack position
	     * @type {Number}
	     */
	    this.position = -1;

	    /**
	     * Command templates
	     * @type {Object}
	     */
	    this.commands = {};

	    /**
	     * Command stack
	     * @type {Array}
	     */
	    this.stack = [];
	  }

	  /**
	   * Register a new command
	   * @param {Object} cmd
	   */

	  (0, _createClass3.default)(Commander, [{
	    key: "newCommand",
	    value: function newCommand(cmd) {
	      this.commands[cmd.action] = cmd;
	      cmd = null;
	    }

	    /**
	     * Push a command
	     * @param {String} action
	     * @param {Object} scope
	     * @param {Array} data
	     */

	  }, {
	    key: "push",
	    value: function push(action, scope, data) {

	      var cmd = {
	        action: action,
	        data: data,
	        scope: scope
	      };

	      this.stack.splice(this.position + 1, this.stack.length);

	      this.stack.push(cmd);

	      this.redo();
	      this.undo();
	      this.redo();
	      this.undo();
	      this.redo();
	    }

	    /**
	     * Fire command
	     * @param {Object} cmd
	     * @param {String} action
	     */

	  }, {
	    key: "fire",
	    value: function fire(cmd, action) {
	      var template = this.commands[cmd.action][action];
	      template.bind(cmd.scope).apply(template, cmd.data);
	    }

	    /**
	     * Get cmd from current stack index
	     * @return {Object}
	     */

	  }, {
	    key: "getCurrentCmd",
	    value: function getCurrentCmd() {
	      return this.stack[this.position];
	    }

	    /**
	     * Undo
	     */

	  }, {
	    key: "undo",
	    value: function undo() {

	      if (this.position >= 0) {
	        this.fire(this.getCurrentCmd(), "onUndo");
	        this.position--;
	      }
	    }

	    /**
	     * Redo
	     */

	  }, {
	    key: "redo",
	    value: function redo() {

	      if (this.position < this.stack.length - 1) {
	        this.position++;
	        this.fire(this.getCurrentCmd(), "onRedo");
	      }
	    }
	  }]);
	  return Commander;
	}();

	exports.default = Commander;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.commands = undefined;

	var _cfg = __webpack_require__(6);

	var _MapEntity = __webpack_require__(97);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var commands = exports.commands = [
	/** Select command */
	{
	  action: "select",
	  onUndo: function onUndo(entity, selection) {
	    this.entitySelection = null;
	    this.entitySelection = selection;
	  },
	  onRedo: function onRedo(entity, selection) {
	    this.entitySelection = null;
	    this.entitySelection = entity;
	  }
	},
	/** Drag command */
	{
	  action: "drag",
	  onUndo: function onUndo(x, y) {
	    this.x -= x;
	    this.y -= y;
	    this.y <<= 0;
	    this.y += _cfg.Y_DEPTH_HACK;
	    this.last.x = this.x;
	    this.last.y = this.y;
	  },
	  onRedo: function onRedo(x, y) {
	    this.x += x;
	    this.y += y;
	    this.y <<= 0;
	    this.y += _cfg.Y_DEPTH_HACK;
	    this.last.x = this.x;
	    this.last.y = this.y;
	  }
	},
	/** Delete command */
	{
	  action: "delete",
	  onUndo: function onUndo(entity) {
	    this.instance.addEntity(entity);
	    this.entitySelection = entity;
	  },
	  onRedo: function onRedo(entity) {
	    this.instance.removeEntity(entity);
	    this.entitySelection = null;
	  }
	},
	/** Cut command */
	{
	  action: "cut",
	  onUndo: function onUndo(entity) {
	    this.instance.addEntity(entity);
	    this.entitySelection = entity;
	  },
	  onRedo: function onRedo(entity) {
	    this.entityCopy = entity;
	    this.instance.removeEntity(entity);
	  }
	},
	/** Copy command */
	{
	  action: "copy",
	  onUndo: function onUndo(entity, copy) {
	    this.entityCopy = copy;
	    this.entitySelection = copy;
	  },
	  onRedo: function onRedo(entity, copy) {
	    this.entityCopy = entity;
	    this.entitySelection = entity;
	  }
	},
	/** Paste command */
	{
	  action: "paste",
	  onUndo: function onUndo(entity, paste) {
	    console.log(paste);
	    this.instance.removeEntity(paste);
	  },
	  onRedo: function onRedo(entity, paste) {

	    var entities = this.instance.instance.entities;

	    var map = this.map;

	    var tmp = null;

	    var pushEntity = null;

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
	      }
	      if (tmp.hasShadow) {
	        tmp.shadow.x = entity.shadow.x;
	        tmp.shadow.y = entity.shadow.y;
	      }
	      tmp.fadeIn(.75);
	    } else if (entity instanceof _MapEntity2.default) {
	      tmp = map.objectTemplates[entity.name.toLowerCase()];
	    } else {
	      return void 0;
	    }

	    tmp.x = entity.x;
	    tmp.y = entity.y;
	    tmp.z = entity.z;

	    if (entity instanceof _MapEntity2.default) {
	      pushEntity = map.addEntity(tmp);
	    } else {
	      pushEntity = tmp;
	    }

	    map.entities.push(pushEntity);

	    this.entityCopy = pushEntity;

	    this.entityPaste = pushEntity;
	  }
	}];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(7);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _MapEntity = __webpack_require__(97);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _Camera = __webpack_require__(131);

	var _Camera2 = _interopRequireDefault(_Camera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * MiniMap
	 * @class MiniMap
	 * @export
	 */

	var MiniMap = function () {

	    /**
	     * @constructor
	     * @param {Object} instance
	     */

	    function MiniMap(instance) {
	        (0, _classCallCheck3.default)(this, MiniMap);

	        /**
	         * Game instance ref
	         * @type {Object}
	         */
	        this.instance = instance;

	        /**
	         * Camera ref
	         * @type {Object}
	         */
	        this.camera = new _Camera2.default(this);

	        /**
	         * Camera size ref
	         * @type {Object}
	         */
	        this.camera.size = this.instance.camera.size;

	        /**
	         * Camera pos ref
	         * @type {Object}
	         */
	        this.camera.position = this.instance.camera.position;

	        /**
	         * Width
	         * @type {Number}
	         */
	        this.width = 300;

	        /**
	         * Height
	         * @type {Number}
	         */
	        this.height = 200;

	        /**
	         * Minimap buffer
	         * @type {Object}
	         */
	        this.buffer = null;

	        /**
	         * Minimap background buffer
	         * @type {Object}
	         */
	        this.bgBuffer = null;

	        /**
	         * Minimap front buffer
	         * @type {Object}
	         */
	        this.frBuffer = null;

	        /**
	         * Redraw state
	         * @type {Boolean}
	         */
	        this.redraw = true;

	        this.entities = {};

	        this.resolution = 1.0;

	        this.position = new _Math2.default.Point();

	        this.init();
	    }

	    /**
	     * Initialise
	     */

	    (0, _createClass3.default)(MiniMap, [{
	        key: "init",
	        value: function init() {

	            this.buffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	            this.bgBuffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	            this.frBuffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	            this.createEntityBuffer("Player", "#DBB78A", "#905A23");
	            this.createEntityBuffer("Entity", "#697a21", "#c9db8a");
	            this.createEntityBuffer("LocalPlayer", "#119617", "#abf4c0");
	            this.createEntityBuffer("Tree", "#697a21", "darkgreen");

	            this.resize();

	            this.draw();
	        }

	        /**
	         * Resize
	         */

	    }, {
	        key: "resize",
	        value: function resize() {

	            this.position.x = this.camera.width - this.width;
	            this.position.y = this.camera.height - this.height;
	        }

	        /**
	         * Mouse inside this map offset
	         * @param  {Number} x
	         * @param  {Number} y
	         * @return {Boolean}
	         */

	    }, {
	        key: "inside",
	        value: function inside(x, y) {

	            return _Math2.default.cubicCollision(x, y, 1, 1, this.position.x, this.position.y, this.width, this.height);
	        }

	        /**
	         * Create a entity buffer
	         * @param {String} type
	         * @param {String} fillColor
	         * @param {String} strokeColor
	         */

	    }, {
	        key: "createEntityBuffer",
	        value: function createEntityBuffer(type, fillColor, strokeColor) {

	            var radius = 6;

	            var width = 16;
	            var height = 16;

	            var link = null;

	            this.entities[type] = (0, _utils.createCanvasBuffer)(width, height);

	            link = this.entities[type];

	            link.beginPath();
	            link.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, false);
	            link.fillStyle = fillColor;
	            link.fill();
	            link.lineWidth = 1.5;
	            link.strokeStyle = strokeColor;
	            link.stroke();
	        }

	        /**
	         * Draw mini map
	         * @param {Number} mode
	         * @param {Array}  entities
	         */

	    }, {
	        key: "draw",
	        value: function draw(mode, entities) {

	            this.buffer.clear();
	            this.bgBuffer.clear();
	            this.frBuffer.clear();

	            /** Redraw everything */
	            if (mode === 0) {
	                this.drawBackground();
	                this.drawFront(entities);
	                return void 0;
	            }

	            /** Redraw front only */
	            if (mode === 1) {
	                this.drawFront(entities);
	                return void 0;
	            }

	            return void 0;
	        }

	        /**
	         * Draw a background
	         */

	    }, {
	        key: "drawBackground",
	        value: function drawBackground() {

	            this.bgBuffer.strokeStyle = "red";
	            this.bgBuffer.strokeRect(0, 0, this.width, this.height);
	            this.bgBuffer.stroke();

	            return void 0;
	        }

	        /**
	         * Draw the front layer
	         * @param {Array} entities
	         */

	    }, {
	        key: "drawFront",
	        value: function drawFront(entities) {

	            var entity = null;

	            var ii = 0;
	            var length = 0;

	            length = entities.length;

	            var resolution = this.instance.camera.resolution;
	            var scaling = .0;

	            var camX = this.width / 2 - (this.camera.size.x / 2 - this.camera.position.x) / resolution;
	            var camY = this.height / 2 - (this.camera.size.y / 2 - this.camera.position.y) / resolution;

	            var color = null;

	            var x = 0;
	            var y = 0;

	            var width = 0;
	            var height = 0;

	            for (; ii < length; ++ii) {
	                entity = entities[ii];
	                //if ((entity instanceof Player) === false) continue;
	                scaling = entity.scale + -entity.z / this.resolution / ((entity.width + entity.height) / 2);
	                if (entity.texture === null) continue;
	                x = (camX + entity.x + entity.xMargin + entity.z / (entity.width / 2) / 2) * this.resolution << 0;
	                y = (camY + entity.y + entity.yMargin + entity.z) * this.resolution << 0;
	                width = entity.size.x * scaling << 0;
	                height = entity.size.y * scaling << 0;
	                this.drawEntity(entity, x, y, width, height);
	            };

	            this.drawCameraViewport(camX, camY);

	            return void 0;
	        }
	    }, {
	        key: "drawEntity",
	        value: function drawEntity(entity, x, y, width, height) {

	            var tmpl = null;

	            var Player = this.instance.instance.entities.Player;

	            if (entity.id === this.instance.localEntity.id) {
	                tmpl = this.entities["LocalPlayer"];
	            } else if (entity instanceof Player) {
	                tmpl = this.entities["Player"];
	            } else if (entity.name === "Tree") {
	                tmpl = this.entities["Tree"];
	            } else {
	                tmpl = this.entities["Entity"];
	            }

	            this.bgBuffer.drawImage(tmpl.canvas, x, y);

	            return void 0;
	        }

	        /**
	         * Draw camera viewport
	         */

	    }, {
	        key: "drawCameraViewport",
	        value: function drawCameraViewport(x, y) {

	            var resolution = this.instance.camera.resolution;

	            this.bgBuffer.lineWidth = 1;
	            this.bgBuffer.strokeStyle = "red";
	            this.bgBuffer.strokeRect(x - this.camera.position.x / resolution, y - this.camera.position.y / resolution, this.camera.size.x / resolution, this.camera.size.y / resolution);
	            this.bgBuffer.stroke();

	            return void 0;
	        }
	    }]);
	    return MiniMap;
	}();

	exports.default = MiniMap;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(142);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Packets = __webpack_require__(146);

	var Packet = _interopRequireWildcard(_Packets);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Connection
	 * @class Connection
	 * @export
	 */

	var Connection = function () {

	  /**
	   * @constructor
	   * @param {Object}   instance
	   * @param {String}   url
	   * @param {Function} handler
	   */

	  function Connection(instance, url, handler) {
	    (0, _classCallCheck3.default)(this, Connection);

	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Websocket instance
	     * @type {Object}
	     */
	    this.ws = null;

	    /**
	     * Opening state
	     * @type {Boolean}
	     */
	    this.open = false;

	    if (handler !== void 0 && handler instanceof Function) {
	      this.handleMessage = handler;
	    }

	    this.init(url);
	  }

	  /**
	   * Initialise a ws connection
	   * @param {String} url
	   */

	  (0, _createClass3.default)(Connection, [{
	    key: "init",
	    value: function init(url) {

	      this.open = true;

	      this.ws = new window.WebSocket("ws://" + url);

	      this.ws.binaryType = "arraybuffer";

	      this.ws.addEventListener('open', this.onOpen.bind(this));
	      this.ws.addEventListener('close', this.onClose.bind(this));
	      this.ws.addEventListener('error', this.onError.bind(this));
	      this.ws.addEventListener('message', this.onMessage.bind(this));
	    }

	    /**
	     * On open
	     * @param {Object} e
	     */

	  }, {
	    key: "onOpen",
	    value: function onOpen(e) {

	      console.log("Socket Open!");

	      this.sendUserData();
	    }

	    /**
	     * On close
	     * @param {Object} e
	     */

	  }, {
	    key: "onClose",
	    value: function onClose(e) {
	      console.log(e);
	    }

	    /**
	     * On error
	     * @param {Object} e
	     */

	  }, {
	    key: "onError",
	    value: function onError(e) {
	      console.log("Socket closed!");
	    }

	    /**
	     * On message
	     * @param {Object} e
	     */

	  }, {
	    key: "onMessage",
	    value: function onMessage(e) {
	      /*let delta = this.instance.engine.renderer.delta * 1e3;
	      setTimeout(this::function() {
	        this.handleMessage(new DataView(e.data));
	      }, delta);*/
	      this.handleMessage(new DataView(e.data));
	    }

	    /**
	     * Handle a message
	     * @param {Object} msg
	     */

	  }, {
	    key: "handleMessage",
	    value: function handleMessage(msg) {

	      var offset = 0;

	      var key = msg.getUint8(offset++);

	      function getString() {
	        var text = "";
	        var char = 0;
	        while ((char = msg.getUint16(offset, true)) !== 0) {
	          offset += 2;
	          text += String.fromCharCode(char);
	        };
	        offset += 2;
	        return text;
	      }

	      if (key === 0) {
	        var data = this.getString(msg);
	        console.log(data);
	      }

	      /** User joined map */
	      if (key === 22) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var player = this.instance.entities.Player;
	        var entity = new player(data);
	        entity.instance = this.instance.engine;
	        this.instance.engine.addEntity(entity);
	        if (entity.isLocalPlayer === true) {
	          this.instance.engine.localEntity = entity;
	          this.instance.engine.camera.focus(entity, false);
	        }
	      }

	      /** Jumping */
	      if (key === 30) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var entity = this.instance.engine.getEntityByProperty(data.name, "name");
	        entity.jump();
	      }

	      /** Facing */
	      if (key === 31) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var entity = this.instance.engine.getEntityByProperty(data.name, "name");
	        entity.changeFacing(data.dir);
	      }

	      /** Movement */
	      if (key === 32) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var entity = this.instance.engine.getEntityByProperty(data.name, "name");
	        entity.position.x = data.x;
	        entity.position.y = data.y;
	        entity.move(data.dir);
	      }

	      /** Velocity */
	      if (key === 33) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var entity = this.instance.engine.getEntityByProperty(data.name, "name");
	        entity.velocity = data.velocity;
	      }

	      /** Kill */
	      if (key === 34) {
	        offset += 4;
	        offset += 4;
	        var data = JSON.parse(getString());
	        var entity = this.instance.engine.getEntityByProperty(data.name, "name");
	        entity.fadeOut(1, true);
	      }

	      return void 0;
	    }

	    /**
	     * Prepare data to send
	     * @param  {Number} length
	     * @return {Object}
	     */

	  }, {
	    key: "prepareData",
	    value: function prepareData(length) {
	      return new DataView(new ArrayBuffer(length));
	    }

	    /**
	     * Send data
	     * @param {Object} a
	     */

	  }, {
	    key: "send",
	    value: function send(a) {
	      this.ws.send(a.buffer);
	      return void 0;
	    }

	    /**
	     * Send user data
	     */

	  }, {
	    key: "sendUserData",
	    value: function sendUserData() {

	      if (this.open === false) return void 0;

	      var text = location.search.replace("?", "");

	      var msg = this.prepareData(1 + 2 * text.length);

	      msg.setUint8(0, 0);

	      for (var ii = 0; ii < text.length; ++ii) {
	        msg.setUint16(1 + 2 * ii, text.charCodeAt(ii), true);
	      };

	      this.send(msg);
	    }

	    /**
	     * Sto buffer
	     * @param {Array} message
	     * @return {Object}
	     */

	  }, {
	    key: "stobuf",
	    value: function stobuf(buffer) {

	      var ii = 0;
	      var length = buffer.length;
	      var arrayBuffer = new ArrayBuffer(length);
	      var view = new Uint8Array(arrayBuffer);

	      for (; ii < length; ++ii) {
	        view[ii] = buffer[ii];
	      };

	      return view.buffer;
	    }

	    /**
	     * Send data
	     * @param {String} type
	     * @param {Array}  data
	     */

	  }, {
	    key: "sendData",
	    value: function sendData(type, data) {

	      var pClass = Packet[type];

	      if (pClass === void 0 || pClass === null) return void 0;

	      var packet = new (Function.prototype.bind.apply(pClass, [null].concat((0, _toConsumableArray3.default)(data))))();

	      this.send(packet);
	    }
	  }, {
	    key: "getString",
	    value: function getString(view) {

	      if ((view.byteLength + 1) % 2 === 1) {
	        return void 0;
	      }

	      var txt = "";
	      var maxLen = 32 * 2;
	      for (var i = 1; i < view.byteLength && i <= maxLen; i += 2) {
	        var charCode = view.getUint16(i, true);
	        if (charCode == 0) {
	          return void 0;
	        }
	        txt += String.fromCharCode(charCode);
	      }
	      return txt;
	    }
	  }]);
	  return Connection;
	}();

	exports.default = Connection;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(143);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	__webpack_require__(145);
	module.exports = __webpack_require__(19).Array.from;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(20)
	  , $export     = __webpack_require__(17)
	  , toObject    = __webpack_require__(68)
	  , call        = __webpack_require__(47)
	  , isArrayIter = __webpack_require__(48)
	  , toLength    = __webpack_require__(49)
	  , getIterFn   = __webpack_require__(50);
	$export($export.S + $export.F * !__webpack_require__(61)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Facing = __webpack_require__(147);

	Object.defineProperty(exports, "Facing", {
	  enumerable: true,
	  get: function get() {
	    return _Facing.Facing;
	  }
	});

	var _Jumping = __webpack_require__(148);

	Object.defineProperty(exports, "Jumping", {
	  enumerable: true,
	  get: function get() {
	    return _Jumping.Jumping;
	  }
	});

	var _Position = __webpack_require__(149);

	Object.defineProperty(exports, "Position", {
	  enumerable: true,
	  get: function get() {
	    return _Position.Position;
	  }
	});

	var _Velocity = __webpack_require__(150);

	Object.defineProperty(exports, "Velocity", {
	  enumerable: true,
	  get: function get() {
	    return _Velocity.Velocity;
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Facing = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Facing packet
	 * @class Facing
	 * @export
	 */

	var Facing = exports.Facing = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} dir
	   * @param  {Number} x
	   * @param  {Number} y
	   * @return {Object}
	   * @constructor
	   */

	  function Facing(id, dir) {
	    (0, _classCallCheck3.default)(this, Facing);

	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Direction
	     * @type {Number}
	     */
	    this.dir = dir;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Facing, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(5);
	      var view = new DataView(buffer);

	      view.setUint8(0, 31, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.dir, true);

	      return view;
	    }
	  }]);
	  return Facing;
	}();

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Jumping = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Jumping packet
	 * @class Jumping
	 * @export
	 */

	var Jumping = exports.Jumping = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} dir
	   * @param  {Number} x
	   * @param  {Number} y
	   * @return {Object}
	   * @constructor
	   */

	  function Jumping(id, dir) {
	    (0, _classCallCheck3.default)(this, Jumping);

	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Jumping, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(3);
	      var view = new DataView(buffer);

	      view.setUint8(0, 30, true);
	      view.setUint16(1, this.id, true);

	      return view;
	    }
	  }]);
	  return Jumping;
	}();

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Position = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Position packet
	 * @class Position
	 * @export
	 */

	var Position = exports.Position = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} dir
	   * @param  {Number} x
	   * @param  {Number} y
	   * @return {Object}
	   * @constructor
	   */

	  function Position(id, dir, x, y) {
	    (0, _classCallCheck3.default)(this, Position);

	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Direction
	     * @type {Number}
	     */
	    this.dir = dir;

	    /**
	     * X
	     * @type {Number}
	     */
	    this.x = x;

	    /**
	     * Y
	     * @type {Number}
	     */
	    this.y = y;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Position, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(9);
	      var view = new DataView(buffer);

	      view.setUint8(0, 32, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.dir, true);
	      view.setUint16(5, this.x, true);
	      view.setUint16(7, this.y, true);

	      return view;
	    }
	  }]);
	  return Position;
	}();

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Velocity = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Velocity packet
	 * @class Velocity
	 * @export
	 */

	var Velocity = exports.Velocity = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} velocity
	   * @return {Object}
	   * @constructor
	   */

	  function Velocity(id, velocity) {
	    (0, _classCallCheck3.default)(this, Velocity);

	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Velocity
	     * @type {Number}
	     */
	    this.velocity = velocity;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */

	  (0, _createClass3.default)(Velocity, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(5);
	      var view = new DataView(buffer);

	      view.setUint8(0, 33, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.velocity, true);

	      return view;
	    }
	  }]);
	  return Velocity;
	}();

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.global = exports.mouse = exports.keys = undefined;

	var _cfg = __webpack_require__(6);

	var cfg = _interopRequireWildcard(_cfg);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var keys = exports.keys = [{
	  name: "SHIFT",
	  fire: function fire() {},
	  leave: function leave() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.STATES.SELECTING = false;
	      this.engine.editor.selectedEntities = [];
	    }
	  }
	}, {
	  name: "CTRL+Z",
	  simultaneous: false,
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.commander.undo();
	    }
	  }
	}, {
	  name: "CTRL+Y",
	  simultaneous: false,
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.commander.redo();
	    }
	  }
	}, {
	  name: "CTRL+C",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.copyEntity();
	    }
	  }
	}, {
	  name: "CTRL+V",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.pasteEntity();
	    }
	  }
	}, {
	  name: "CTRL+X",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.cutEntity();
	    }
	  }
	}, {
	  name: "DELETE",
	  fire: function fire() {
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.deleteEntity();
	    }
	  }
	}, {
	  name: "F1",
	  spam: false,
	  fire: function fire() {
	    cfg.DEBUG_MODE = cfg.DEBUG_MODE ? false : true;
	    if (!cfg.DEBUG_MODE) {
	      cfg.FREE_CAMERA = false;
	    }
	    this.engine.renderer.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);
	    this.engine.renderer.resize(true);
	    this.engine.renderer.clear();
	    this.engine.renderer.draw();
	  }
	}, {
	  name: "F2",
	  spam: false,
	  fire: function fire() {
	    if (cfg.DEBUG_MODE) {
	      cfg.EDIT_MODE = cfg.EDIT_MODE ? false : true;
	    }
	  }
	}, {
	  name: "F3",
	  spam: false,
	  fire: function fire() {
	    if (cfg.DEBUG_MODE) {
	      cfg.FREE_CAMERA = cfg.FREE_CAMERA ? false : true;
	      if (!cfg.FREE_CAMERA) {
	        this.engine.camera.dragging = false;
	      }
	    }
	  }
	}, {
	  name: "F4",
	  spam: false,
	  fire: function fire() {
	    if (cfg.DEBUG_MODE) {
	      cfg.GOD_MODE = cfg.GOD_MODE ? false : true;
	    }
	  }
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "Y",
	  fire: function fire() {}
	}, {
	  name: "Z",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.action();
	  }
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "G",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "V",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "CTRL",
	  fire: function fire() {}
	}, {
	  name: "ESCAPE",
	  spam: false,
	  fire: function fire() {
	    if (this.engine.scenes.Pause.active) {
	      this.engine.scenes.Pause.hide();
	    } else {
	      this.engine.scenes.Pause.show();
	    }
	  }
	}, {
	  name: "X",
	  spam: false,
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.velocity = 2;
	  },
	  leave: function leave() {
	    var local = this.engine.localEntity;
	    local.velocity = 1;
	  }
	}, {
	  name: "C",
	  spam: false,
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.jump();
	    }
	  }
	}, {
	  name: "←",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.LEFT);
	    }
	  }
	}, {
	  name: "→",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.RIGHT);
	    }
	  }
	}, {
	  name: "↑",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.UP);
	    }
	  }
	}, {
	  name: "↓",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.DOWN);
	    }
	  }
	}, {
	  name: "W",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.UP);
	    }
	  }
	}, {
	  name: "A",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.LEFT);
	    }
	  }
	}, {
	  name: "S",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.DOWN);
	    }
	  }
	}, {
	  name: "D",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (!this.engine.activeScene) {
	      local.move(cfg.RIGHT);
	    }
	  }
	}, {
	  name: "SPACE",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    if (cfg.FREE_CAMERA || this.engine.camera.objectFocus !== null && this.engine.camera.objectFocus.id !== local.id) {
	      this.engine.camera.focus(local, true);
	      cfg.FREE_CAMERA = false;
	    }
	  }
	}];

	var mouse = exports.mouse = [{
	  name: "dblclick",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (!cfg.DEBUG_MODE) return void 0;
	    cfg.FREE_CAMERA = false;
	    if (cfg.EDIT_MODE) {
	      if (!this.engine.editor.dragging) {
	        var entity = this.engine.editor.getEntityByMouse(e.clientX, e.clientY);
	        if (entity !== null) {
	          this.engine.camera.focus(entity, false);
	        }
	        this.engine.editor.editEntity(e.clientX, e.clientY);
	      }
	    }
	  }
	}, {
	  name: "mousedown|touchstart",
	  fire: function fire(e) {
	    var x = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
	    var y = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
	    e.preventDefault();
	    if (this.input.KeyBoard.isKeyPressed("G")) {
	      this.engine.ping(x, y, "notify");
	      return void 0;
	    }
	    if (!cfg.DEBUG_MODE) return void 0;
	    if (cfg.EDIT_MODE && e.which === 1 && this.input.KeyBoard.isKeyPressed("SHIFT")) {
	      this.engine.editor.STATES.SELECTING = true;
	      this.engine.editor.selectFrom(x, y);
	      this.engine.editor.selectTo(x, y);
	      return void 0;
	    }
	    if (e.which !== 1) {
	      cfg.FREE_CAMERA = true;
	    }
	    if (cfg.FREE_CAMERA && (e instanceof TouchEvent || e.which !== 1)) {
	      this.engine.camera.dragging = true;
	      this.engine.camera.click(x, y);
	    }
	    if (cfg.EDIT_MODE && (e instanceof TouchEvent || e.which === 1)) {
	      this.engine.editor.dragging = true;
	      this.engine.editor.selectEntity(x, y);
	    }
	  }
	}, {
	  name: "mouseup|touchend",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (!cfg.DEBUG_MODE) return void 0;
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.dragging = false;
	    }
	    if (cfg.EDIT_MODE) {
	      if (e instanceof TouchEvent || e.which === 1) {
	        this.engine.editor.dragging = false;
	        this.engine.editor.STATES.SELECTING = false;
	        this.engine.editor.selectedEntities = [];
	      }
	    }
	  }
	}, {
	  name: "mousemove|touchmove",
	  fire: function fire(e) {
	    var x = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
	    var y = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
	    e.preventDefault();
	    if (!cfg.DEBUG_MODE) return void 0;
	    if (cfg.FREE_CAMERA && this.engine.camera.dragging) {
	      this.engine.camera.move(x, y);
	    }
	    if (this.input.KeyBoard.isKeyPressed("SHIFT") && this.engine.editor.STATES.SELECTING) {
	      this.engine.editor.selectTo(x, y);
	      return void 0;
	    }
	    if (cfg.EDIT_MODE && this.engine.editor.dragging) {
	      this.engine.editor.dragEntity(x, y);
	    }
	  }
	}, {
	  name: "mousewheel",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.click(e.clientX, e.clientY);
	    }
	    this.engine.camera.zoom(e);
	  }
	}, {
	  name: "contextmenu",
	  fire: function fire(e) {
	    e.preventDefault();
	  }
	}];

	var global = exports.global = [{
	  name: "resize",
	  fire: function fire(e) {
	    this.engine.renderer.resize(true);
	  }
	}];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Player = __webpack_require__(153);

	Object.defineProperty(exports, "Player", {
	  enumerable: true,
	  get: function get() {
	    return _Player.Player;
	  }
	});

	var _Monster = __webpack_require__(156);

	Object.defineProperty(exports, "Monster", {
	  enumerable: true,
	  get: function get() {
	    return _Monster.Monster;
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Player = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(7);

	var _Entity2 = __webpack_require__(98);

	var _Entity3 = _interopRequireDefault(_Entity2);

	var _movement = __webpack_require__(154);

	var movement = _interopRequireWildcard(_movement);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Player = exports.Player = function (_Entity) {
	  (0, _inherits3.default)(Player, _Entity);

	  /**
	   * @constructor
	   * @param {Object} obj
	   */

	  function Player(obj) {
	    (0, _classCallCheck3.default)(this, Player);

	    /**
	     * Local entity requires instance ref
	     * @type {Object}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Player).call(this, obj));

	    _this.instance = null;

	    /**
	     * Gravity
	     * @type {Number}
	     */
	    _this.gravity = _cfg.GRAVITY;

	    /**
	     * Player facing
	     * @type {Number}
	     */
	    _this.facing = 0;

	    /**
	     * Idle state
	     * @type {Number}
	     */
	    _this.idle = 0;

	    /**
	     * States
	     * @type {Object}
	     */
	    _this.STATES["WALKING"] = false;
	    _this.STATES["RUNNING"] = false;
	    _this.STATES["BUMPING"] = false;
	    _this.STATES["WALKING"] = false;
	    _this.STATES["FACING"] = false;

	    /**
	     * Shadow offsets
	     * @type {Number}
	     */
	    _this.shadowX = 0;
	    _this.shadowY = -1.75;

	    /**
	     * Local player check
	     * @type {Boolean}
	     */
	    _this.isLocalPlayer = false;

	    /**
	     * NPC check
	     * @type {Boolean}
	     */
	    _this.isNPC = false;

	    /**
	     * Network player check
	     * @type {Boolean}
	     */
	    _this.isNetworkPlayer = false;

	    /**
	     * Animation frames
	     * @type {Array}
	     */
	    _this.frames = [0, 1, 0, 2, 3, 4];

	    /**
	     * Reset frame
	     * @type {Array}
	     */
	    _this.frameReset = [0, 2, 2, 0];

	    /**
	     * Last facing
	     * @type {Number}
	     */
	    _this.lastFacing = 0;

	    /**
	     * Step count
	     * @type {Number}
	     */
	    _this.stepCount = 0;

	    /**
	     * Face count
	     * @type {Number}
	     */
	    _this.faceCount = 0;

	    /**
	     * Latency
	     * @type {Number}
	     */
	    _this.latency = .5;

	    /**
	     * Map the player is on
	     * @type {String}
	     */
	    _this.map = obj.map;

	    /**
	     * Step sound
	     * @type {Number}
	     */
	    _this.soundSteps = _cfg.DIMENSION * 2;

	    _this.xMargin = -(_cfg.DIMENSION / 2);
	    _this.yMargin = -_cfg.DIMENSION;

	    if (obj.x !== void 0 && obj.y !== void 0) {
	      _this.x = obj.x;
	      _this.y = obj.y;
	    }

	    _this.init(obj);

	    return _this;
	  }

	  /**
	   * @getter
	   */

	  (0, _createClass3.default)(Player, [{
	    key: "init",

	    /**
	     * Initialise
	     * @param  {Object} obj
	     */
	    value: function init(obj) {
	      this.setPlayerType(obj);
	    }

	    /**
	     * Set player entity type
	     * Xtra safe
	     * @param {Object} obj
	     */

	  }, {
	    key: "setPlayerType",
	    value: function setPlayerType(obj) {

	      if (obj.isLocalPlayer === true) {
	        this.isLocalPlayer = true;
	        this.isNPC = false;
	        this.isNetworkPlayer = false;
	      } else if (obj.isNPC === true) {
	        this.isLocalPlayer = false;
	        this.isNPC = true;
	        this.isNetworkPlayer = false;
	      } else if (obj.isNetworkPlayer === true) {
	        this.isLocalPlayer = false;
	        this.isNPC = false;
	        this.isNetworkPlayer = true;
	      }
	      /** Default is npc */
	      else {
	          this.isLocalPlayer = false;
	          this.isNPC = true;
	          this.isNetworkPlayer = false;
	        }
	    }

	    /**
	     * Get frame index
	     * @return {Number}
	     */

	  }, {
	    key: "getFrameIndex",
	    value: function getFrameIndex() {
	      return this.STATES.RUNNING === true ? 2 : 0;
	    }

	    /**
	     * Reset sprite frame
	     */

	  }, {
	    key: "resetFrame",
	    value: function resetFrame() {
	      this.frame = this.frameReset[this.frame] + this.getFrameIndex();
	    }

	    /**
	     * Refresh entity states
	     */

	  }, {
	    key: "refreshState",
	    value: function refreshState() {
	      this.STATES.RUNNING = this.velocity === .5 ? false : this.velocity === 1 && this.STATES.WALKING === true ? true : false;
	      this.STATES.JUMPING = this.z !== 0;
	    }

	    /**
	     * Trigger faced tile
	     */

	  }, {
	    key: "action",
	    value: function action() {
	      var position = _Math2.default.getTilePosition(this.x << 0, this.y << 0, this.facing);
	      _utils.Maps[this.map].actionTrigger(position, this);
	    }
	  }, {
	    key: "velocity",
	    get: function get() {
	      return this.latency;
	    }

	    /**
	     * @param {Number} value
	     * @setter
	     */
	    ,
	    set: function set(value) {
	      this.latency = value / 2;
	      if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	        this.instance.engine.connection.sendData("Velocity", [this.id, value]);
	      }
	      this.refreshState();
	    }

	    /**
	     * Player is moving
	     * @return {Boolean}
	     * @getter
	     */

	  }, {
	    key: "moving",
	    get: function get() {
	      return this.STATES.WALKING === true || this.STATES.RUNNING === true;
	    }

	    /**
	     * Player is moving
	     * @param {Boolean} value
	     * @setter
	     */
	    ,
	    set: function set(value) {
	      this.STATES.WALKING = value;
	      this.STATES.RUNNING = value;
	    }
	  }]);
	  return Player;
	}(_Entity3.default);

	(0, _utils.inherit)(Player, movement);

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jump = jump;
	exports.jumping = jumping;
	exports.moveRoute = moveRoute;
	exports.move = move;
	exports.changeFacing = changeFacing;
	exports.halfStep = halfStep;
	exports.bump = bump;
	exports.playStateSound = playStateSound;
	exports.walk = walk;
	exports.startMoving = startMoving;
	exports.stopMoving = stopMoving;

	var _getIterator2 = __webpack_require__(94);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(7);

	var _Math = __webpack_require__(85);

	var _Math2 = _interopRequireDefault(_Math);

	var _Audio = __webpack_require__(155);

	var _Audio2 = _interopRequireDefault(_Audio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Jump
	 */
	function jump() {

	  this.refreshState();

	  if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	  this.STATES.JUMPING = true;

	  if (this.onJump !== null) {
	    _utils.Maps[this.map].triggerEvent(this, this, "onJump");
	  }

	  this.jumping();

	  if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	    this.instance.engine.connection.sendData("Jumping", [this.id]);
	  }

	  this.idleTime = 0;
	}

	/**
	 * Jumping
	 */
	function jumping() {
	  var _this = this;

	  this.frame = 3;

	  if (this.z === 0) {
	    this.playStateSound();
	  }

	  this.z += this.gravity;

	  this.refreshState();

	  if (this.z < 0) {
	    this.gravity += .1;
	    this.shadow.position.set(-(this.z / 2), this.shadowY - this.z);
	    this.shadow.scale.set(this.z, this.z);
	  } else {
	    this.gravity = _cfg.GRAVITY;
	    this.z = 0;
	    this.resetFrame();
	    this.refreshState();
	    this.shadow.position.set(this.shadowX, this.shadowY);
	    this.shadow.scale.set(0, 0);

	    if (this.isLocalPlayer === true) {
	      var ii = 0;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var entity = _step.value;

	          ++ii;
	          if (entity.id === _this.id) return "continue";
	          setTimeout(function () {
	            entity.jump();
	          }, ii * 25);
	        };

	        for (var _iterator = (0, _getIterator3.default)(game.engine.currentMap.entities), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _ret = _loop();

	          if (_ret === "continue") continue;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }
	  }
	}

	/**
	 * Walk a path
	 * moveRoute("1d,2r,2u,2l,1d,1r");
	 * @param  {String} path
	 */
	function moveRoute(path) {

	  var move = null;
	  var moves = path.split(",");

	  var ii = 0;
	  var length = moves.length;

	  var rxN = /(\d+)/g;

	  for (; ii < length; ++ii) {
	    move = moves[ii].replace('"', "");
	    var dir = move.replace(rxN, "");
	    var amount = Number(move.match(rxN));
	    console.log(dir, amount);
	  };

	  return void 0;
	}

	/**
	 * Move player
	 * @param {Number}   dir
	 * @param {Function} resolve
	 */
	function move(dir, resolve) {

	  if (this.STATES.LOCK === true || this.STATES.EDITING === true) return void 0;

	  /** Wait until we finished */
	  if (this.moving === true) return void 0;

	  if (this.facing !== dir) {
	    /** Skip bumping state */
	    if (this.STATES.BUMPING === true) {
	      this.stepCount = 0;
	      if (this.animations[this.animationIndex - 1].type === "bump") {
	        this.animations.splice(this.animationIndex - 1, 1);
	      }
	      this.moving = false;
	      this.STATES.BUMPING = false;
	    }
	  } else {
	    if (this.STATES.BUMPING === true) return void 0;
	  }

	  if (this.STATES.BUMPING === true) return void 0;

	  this.moveCB = resolve || null;

	  this.startMoving(this.x, this.y, dir);

	  this.refreshState();
	}

	/**
	 * Change facing
	 * @param {Number} dir
	 */
	function changeFacing(dir) {

	  if (this.STATES.LOCK === true) return void 0;

	  this.idleTime = 0;

	  if (this.moving === false && this.STATES.BUMPING === false) {
	    this.lastFacing = this.facing;
	    this.facing = dir;
	    if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	      this.instance.engine.connection.sendData("Facing", [this.id, this.facing]);
	    }
	    this.frame = (this.frame + 3 + this.getFrameIndex()) % 4;
	  }

	  /** TODO: Avoid settimeout */
	  setTimeout(function () {
	    if (this.moving === false && this.STATES.BUMPING === false && this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	  }.bind(this), 30);
	}

	/**
	 * Do halfstep
	 */
	function halfStep() {

	  var half = Math.ceil(Math.ceil(_cfg.DIMENSION / (this.velocity * 2)) / 2);

	  if (this.stepCount === half) {
	    this.frame = (this.frame + 1 + this.getFrameIndex()) % 4;
	  }
	}

	/**
	 * Bump
	 * @param {Object} animation
	 */
	function bump(animation) {

	  if (this.stepCount <= 0) {
	    this.playStateSound();
	  }

	  this.stepCount += .5;

	  if (this.STATES.JUMPING === false) {
	    this.halfStep();
	  }

	  if (this.stepCount >= _cfg.DIMENSION * 2) {
	    if (this.STATES.JUMPING === false) {
	      this.halfStep();
	      this.resetFrame();
	    }
	    this.stepCount = 0;
	    this.stopAnimation();
	    this.STATES.BUMPING = false;
	    this.refreshState();
	  }
	}

	/**
	 * Play sound
	 */
	function playStateSound() {

	  if (_cfg.BGS !== true) return void 0;

	  var volume = this.isLocalPlayer === true ? _cfg.VOLUME.NETWORK_PLAYER : _cfg.VOLUME.LOCAL_PLAYER;

	  var dist = _utils.Maps[this.map].distance(this, game.engine.camera);

	  if (this.STATES.JUMPING === true && this.z === 0) {
	    _Audio2.default.playSound("jump", volume, dist.x, dist.y);
	  }

	  /** Player is bumping */
	  if (this.STATES.BUMPING === true) {
	    _Audio2.default.playSound("bump", volume, dist.x, dist.y);
	    /** Player is walking */
	  } else {
	      if (this.moving === true) {
	        if (this.soundSteps >= _cfg.DIMENSION * 2) {
	          this.soundSteps = 0;
	          if (this.STATES.RUNNING === true) {
	            _Audio2.default.playSound("run_step", volume, dist.x, dist.y);
	          } else {
	            _Audio2.default.playSound("ground_step", volume, dist.x, dist.y);
	          }
	        }
	      }
	    }
	}

	/**
	 * Walk
	 * @param {Object} animation
	 */
	function walk(animation) {

	  if (this.stepCount <= 0) {
	    if (this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	    if (animation.obstacle === false) {
	      /** onEnter event => animation.x, animation.y */
	    }
	  }

	  this.playStateSound();

	  if (animation.obstacle === false) {
	    if (this.STATES.JUMPING === false) {
	      this.halfStep();
	    }
	    if (this.x > animation.x) {
	      this.x -= this.velocity;
	    } else if (this.x < animation.x) {
	      this.x += this.velocity;
	    } else if (this.y > animation.y) {
	      this.y -= this.velocity;
	    } else if (this.y < animation.y) {
	      this.y += this.velocity;
	    }
	    this.stepCount += this.velocity;
	  } else {
	    animation.x = this.x;
	    animation.y = this.y;
	    this.stopMoving(animation);
	  }

	  if (this.stepCount >= _cfg.DIMENSION) {
	    this.lastFacing = this.facing;
	    this.stopMoving(animation);
	  }

	  this.soundSteps += this.velocity;
	}

	/**
	 * Start moving
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} dir
	 */
	function startMoving(x, y, dir) {

	  if (this.facing !== dir) {
	    this.changeFacing(dir);
	    if (this.moveCB !== null) {
	      this.moveCB();
	    }
	    return void 0;
	  }

	  var position = _Math2.default.getTilePosition(x, y, dir);
	  var obstacle = _utils.Maps[this.map].isObstacle(this, dir);

	  if (this.isLocalPlayer === true && _cfg.GOD_MODE === true) {
	    obstacle = false;
	  }

	  if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	    this.instance.engine.connection.sendData("Position", [this.id, dir, x, y]);
	  }

	  /** Blocked, bump so */
	  if (obstacle === true) {
	    this.animations.push({
	      type: "bump",
	      x: x,
	      y: y
	    });
	    this.STATES.BUMPING = true;
	    /** Crossable */
	  } else {
	      this.animations.push({
	        type: "walk",
	        obstacle: obstacle,
	        x: position.x,
	        y: position.y,
	        oX: x,
	        oY: y
	      });
	      this.moving = true;
	    }

	  this.idleTime = 0;
	}

	/**
	 * Stop moving
	 * @param {Object} animation
	 */
	function stopMoving(animation) {

	  this.x = animation.x;
	  /** Depth sorting vertical hack */
	  this.y = animation.y + _cfg.Y_DEPTH_HACK;

	  this.last.x = animation.oX;
	  this.last.y = animation.oY;

	  this.moving = false;

	  this.stepCount = 0;

	  setTimeout(function () {
	    if (this.moving === false && this.STATES.BUMPING === false && this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	  }.bind(this), 100);

	  this.stopAnimation();

	  this.refreshState();

	  /** Continue moving */
	  if (this.isLocalPlayer === true) {
	    if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.LEFT)) === true) {
	      this.move(_cfg.LEFT);
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.UP)) === true) {
	      this.move(_cfg.UP);
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.RIGHT)) === true) {
	      this.move(_cfg.RIGHT);
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.DOWN)) === true) {
	      this.move(_cfg.DOWN);
	    } else {
	      this.soundSteps = _cfg.DIMENSION;
	    }
	  } else {
	    this.soundSteps = _cfg.DIMENSION;
	  }

	  if (this.moveCB !== null) {
	    this.moveCB();
	  }
	}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Audio
	 * @class Audio
	 * @export
	 */

	var Audio = function () {

	  /**
	   * @constructor
	   */

	  function Audio() {
	    (0, _classCallCheck3.default)(this, Audio);
	  }

	  /**
	   * Play a sound with custom volume
	   * @param {String} name
	   * @param {Number} vol
	   * @param {Number} x
	   * @param {Number} y
	   */

	  (0, _createClass3.default)(Audio, [{
	    key: "playSound",
	    value: function playSound(name, vol, x, y) {
	      var path = "assets/audio/" + name + ".ogg";
	      var sound = new Howl({
	        urls: [path],
	        autoplay: true,
	        loop: false,
	        pos3d: [x, y, vol / 1e3]
	      });
	    }
	  }]);
	  return Audio;
	}();

	exports.default = Audio = new Audio();

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Monster = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Entity2 = __webpack_require__(98);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Monster = exports.Monster = function (_Entity) {
	  (0, _inherits3.default)(Monster, _Entity);

	  /**
	   * @constructor
	   * @param {Object} obj
	   */

	  function Monster(obj) {
	    (0, _classCallCheck3.default)(this, Monster);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Monster).call(this, obj));

	    _this.init(obj);
	    return _this;
	  }

	  (0, _createClass3.default)(Monster, [{
	    key: "init",
	    value: function init() {
	      console.log(this);
	    }
	  }]);
	  return Monster;
	}(_Entity3.default);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Pause = __webpack_require__(158);

	Object.defineProperty(exports, "Pause", {
	  enumerable: true,
	  get: function get() {
	    return _Pause.Pause;
	  }
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Pause = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Element2 = __webpack_require__(159);

	var _Element3 = _interopRequireDefault(_Element2);

	var _UI = __webpack_require__(160);

	var elements = _interopRequireWildcard(_UI);

	var _Input = __webpack_require__(133);

	var _Input2 = _interopRequireDefault(_Input);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Pause = exports.Pause = function (_Element) {
	  (0, _inherits3.default)(Pause, _Element);

	  /**
	   * @constructor
	   * @param {Object} instance
	   */

	  function Pause(instance) {
	    (0, _classCallCheck3.default)(this, Pause);

	    /**
	     * Instance ref
	     * @type {Object}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pause).call(this, {}));

	    _this.instance = instance;

	    /**
	     * Active state
	     * @type {Boolean}
	     */
	    _this.active = false;

	    /**
	     * Background color
	     * @type {String}
	     */
	    _this.backgroundColor = "#1f1f1f";

	    /**
	     * Text color
	     * @type {String}
	     */
	    _this.color = "#fff";

	    /**
	     * Selected menu item
	     * @type {Object}
	     */
	    _this.selectedItem = null;

	    var input = {
	      keys: [{
	        name: "↑",
	        spam: false,
	        fire: function fire() {
	          if (this.active) {
	            this.navigate(-1);
	          }
	        }
	      }, {
	        name: "↓",
	        spam: false,
	        fire: function fire() {
	          if (this.active) {
	            this.navigate(1);
	          }
	        }
	      }] };

	    _this.input = new _Input2.default(input, _this);

	    _this.x = _this.y = 0;

	    _this.width = window.innerWidth;
	    _this.height = window.innerHeight;

	    _this.children.push(new elements.Label({
	      zIndex: 2,
	      text: "Game Paused"
	    }), new elements.Label({
	      zIndex: 2,
	      text: "Editor"
	    }), new elements.Label({
	      zIndex: 2,
	      text: "Exit"
	    }));

	    _this.children.push(new elements.Background({}));

	    _this.selectedItem = _this.children[1];

	    _this.hide();

	    return _this;
	  }

	  /**
	   * Render
	   */

	  (0, _createClass3.default)(Pause, [{
	    key: "render",
	    value: function render() {}

	    /**
	     * Navigate
	     * @param {Number} dir
	     */

	  }, {
	    key: "navigate",
	    value: function navigate(dir) {

	      var index = this.getChildrenIndexById(this.selectedItem.id);

	      var length = this.children.length;

	      if (index + dir >= length) {
	        this.selectedItem = this.children[2];
	      } else if (index + dir <= 1) {
	        this.selectedItem = this.children[length - 1];
	      } else {
	        this.selectedItem = this.children[index + dir];
	      }

	      this.refresh();
	    }

	    /**
	     * Update positions
	     */

	  }, {
	    key: "updatePositions",
	    value: function updatePositions() {

	      var element = null;

	      var x = this.width / 2;
	      var y = this.height / 2;

	      var width = 0;
	      var height = 0;

	      for (var key in this.children) {

	        element = this.children[key];

	        if (element.id === this.id) continue;
	        if (!(element instanceof elements.Label)) continue;

	        if (element.id === this.selectedItem.id) {
	          element.opacity = 1.0;
	        } else {
	          element.opacity = .25;
	        }

	        width = element.drawContext.measureText(element.text).width;
	        height = element.fontSize << 0;

	        element.x = x - width;
	        element.y = y - height;

	        y += element.fontSize * 2;
	      };
	    }

	    /**
	     * Refresh
	     */

	  }, {
	    key: "refresh",
	    value: function refresh() {
	      this.hide();
	      this.show();
	    }

	    /**
	     * Show
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      this.active = true;
	      this.instance.activeScene = true;
	      this.updatePositions();
	      this.render();
	      this.draw();
	    }

	    /**
	     * Hide
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      this.active = false;
	      this.instance.activeScene = false;
	      this.drawContext.canvas.width = this.width;
	    }
	  }]);
	  return Pause;
	}(_Element3.default);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _DisplayObject2 = __webpack_require__(99);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Element
	 * @class Element
	 * @export
	 */

	var Element = function (_DisplayObject) {
	    (0, _inherits3.default)(Element, _DisplayObject);

	    /**
	     * @constructor
	     * @param {Object} obj
	     */

	    function Element(obj) {
	        (0, _classCallCheck3.default)(this, Element);

	        /**
	         * X
	         * @type {Number}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Element).call(this, null));

	        _this.x = Number(obj.x) || 0;

	        /**
	         * Y
	         * @type {Number}
	         */
	        _this.y = Number(obj.y) || 0;

	        /**
	         * Width
	         * @type {Number}
	         */
	        _this.width = Number(obj.width) || 250;

	        /**
	         * Height
	         * @type {Number}
	         */
	        _this.height = Number(obj.height) || 75;

	        /**
	         * Scale factor
	         * @type {Number}
	         */
	        _this.scale = 1.0;

	        /**
	         * Opacity
	         * @type {Number}
	         */
	        _this.opacity = obj.opacity || 1.0;

	        /**
	         * Z index
	         * @type {Number}
	         */
	        _this.zIndex = obj.zIndex || 0;

	        /**
	         * Child nodes
	         * @type {Array}
	         */
	        _this.children = [];

	        /**
	         * Node
	         * @type {Object}
	         */
	        _this.node = document.querySelector("#ui");

	        /**
	         * Main drawing context
	         * @type {Object}
	         */
	        _this.drawContext = _this.node.getContext("2d");

	        /**
	         * 2d buffer
	         * @type {Object}
	         */
	        _this.buffer = (0, _utils.createCanvasBuffer)(_this.width, _this.height);

	        /**
	         * Resolution
	         * @type {Number}
	         * @getter
	         * @setter
	         */
	        Object.defineProperty(_this, "resolution", {
	            get: function get() {
	                return this.scale;
	            },
	            set: function set(value) {
	                this.scale = value;
	                this.render();
	            }
	        });

	        _this.children.push(_this);

	        _this.render();

	        return _this;
	    }

	    /**
	     * Get children index by id
	     * @param  {Number} id
	     * @return {Number} index
	     */

	    (0, _createClass3.default)(Element, [{
	        key: "getChildrenIndexById",
	        value: function getChildrenIndexById(id) {

	            var ii = 0;
	            var length = 0;

	            length = this.children.length;

	            for (; ii < length; ++ii) {
	                if (this.children[ii].id === id) return ii;
	            };

	            return -1;
	        }

	        /**
	         * @param {Array} array
	         */

	    }, {
	        key: "depthSort",
	        value: function depthSort(array) {

	            var ii = 0;
	            var jj = 0;

	            var key = null;

	            var length = array.length;

	            for (; ii < length; ++ii) {
	                jj = ii;
	                key = array[jj];
	                for (; jj > 0 && array[jj - 1].zIndex > key.zIndex; --jj) {
	                    array[jj] = array[jj - 1];
	                };
	                array[jj] = key;
	            };

	            return void 0;
	        }

	        /**
	         * Render
	         */

	    }, {
	        key: "render",
	        value: function render() {}

	        /**
	         * Sort attached children
	         */

	    }, {
	        key: "sort",
	        value: function sort() {
	            this.depthSort(this.children);
	        }

	        /**
	         * Draw
	         */

	    }, {
	        key: "draw",
	        value: function draw() {

	            var ii = 0;
	            var length = 0;

	            length = this.children.length;

	            this.sort();

	            for (; ii < length; ++ii) {
	                this.children[ii].render();
	                if (this.children[ii].id === this.id) continue;
	                this.children[ii].draw();
	            };

	            return void 0;
	        }
	    }]);
	    return Element;
	}(_DisplayObject3.default);

	exports.default = Element;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Label = __webpack_require__(161);

	Object.defineProperty(exports, "Label", {
	  enumerable: true,
	  get: function get() {
	    return _Label.Label;
	  }
	});

	var _Button = __webpack_require__(162);

	Object.defineProperty(exports, "Button", {
	  enumerable: true,
	  get: function get() {
	    return _Button.Button;
	  }
	});

	var _Background = __webpack_require__(163);

	Object.defineProperty(exports, "Background", {
	  enumerable: true,
	  get: function get() {
	    return _Background.Background;
	  }
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Label = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Element2 = __webpack_require__(159);

	var _Element3 = _interopRequireDefault(_Element2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Label
	 * @class Label
	 * @export
	 */

	var Label = exports.Label = function (_Element) {
	    (0, _inherits3.default)(Label, _Element);

	    /**
	     * @constructor
	     * @param {Object} obj
	     */

	    function Label(obj) {
	        (0, _classCallCheck3.default)(this, Label);

	        /**
	         * Background color
	         * @type {String}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Label).call(this, obj));

	        _this.backgroundColor = obj.backgroundColor;

	        /**
	         * Text color
	         * @type {String}
	         */
	        _this.color = obj.color || "#fff";

	        /**
	         * Z Index
	         * @type {Number}
	         */
	        _this.zIndex = Number(obj.zIndex) || 0;

	        /**
	         * Text
	         * @type {String}
	         */
	        _this.text = obj.text || "undefined";

	        /**
	         * Font size
	         * @type {Number}
	         */
	        _this.fontSize = 25;

	        return _this;
	    }

	    /**
	     * Render
	     */

	    (0, _createClass3.default)(Label, [{
	        key: "render",
	        value: function render() {

	            this.drawContext.globalAlpha = this.opacity;

	            this.drawContext.font = this.fontSize + "px AdvoCut";
	            this.drawContext.strokeStyle = "white";
	            this.drawContext.lineWidth = 1.0;

	            this.drawContext.fillStyle = "white";
	            this.drawContext.fillText(this.text, this.x, this.y);

	            this.drawContext.globalAlpha = 1.0;
	        }
	    }]);
	    return Label;
	}(_Element3.default);

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Button = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Element2 = __webpack_require__(159);

	var _Element3 = _interopRequireDefault(_Element2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Button
	 * @class Button
	 * @export
	 */

	var Button = exports.Button = function (_Element) {
	    (0, _inherits3.default)(Button, _Element);

	    /**
	     * @constructor
	     * @param {Object} obj
	     */

	    function Button(obj) {
	        (0, _classCallCheck3.default)(this, Button);

	        /**
	         * Background color
	         * @type {String}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Button).call(this, obj));

	        _this.backgroundColor = obj.backgroundColor;

	        /**
	         * Text color
	         * @type {String}
	         */
	        _this.color = obj.color || "#fff";

	        /**
	         * Z Index
	         * @type {Number}
	         */
	        _this.zIndex = Number(obj.zIndex) || 0;

	        _this.width = obj.width || 250;
	        _this.height = obj.height || 75;

	        _this.render();

	        return _this;
	    }

	    /**
	     * Update position
	     */

	    (0, _createClass3.default)(Button, [{
	        key: "updatePosition",
	        value: function updatePosition() {

	            this.x = window.innerWidth / 2;
	            this.y = window.innerHeight / 2;

	            this.x -= this.width / 2;
	            this.y -= this.height / 2;
	        }

	        /**
	         * Render
	         */

	    }, {
	        key: "render",
	        value: function render() {

	            this.updatePosition();

	            var width = this.buffer.canvas.width = this.width;
	            var height = this.buffer.canvas.height = this.height;

	            this.buffer.fillStyle = this.backgroundColor;
	            this.buffer.fillRect(0, 0, this.width, this.height);

	            this.drawContext.drawImage(this.buffer.canvas, 0, 0, width, height, this.x, this.y, width, height);
	        }
	    }]);
	    return Button;
	}(_Element3.default);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Background = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Element2 = __webpack_require__(159);

	var _Element3 = _interopRequireDefault(_Element2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Background
	 * @class Background
	 * @export
	 */

	var Background = exports.Background = function (_Element) {
	    (0, _inherits3.default)(Background, _Element);

	    /**
	     * @constructor
	     * @param {Object} obj
	     */

	    function Background(obj) {
	        (0, _classCallCheck3.default)(this, Background);

	        /**
	         * Background color
	         * @type {String}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Background).call(this, obj));

	        _this.backgroundColor = obj.color || "#1f1f1f";

	        /**
	         * Text color
	         * @type {String}
	         */
	        _this.color = obj.color || "#fff";

	        _this.x = _this.y = 0;

	        /**
	         * Z Index
	         * @type {Number}
	         */
	        _this.zIndex = Number(obj.zIndex) || 0;

	        _this.render();

	        return _this;
	    }

	    /**
	     * Render
	     */

	    (0, _createClass3.default)(Background, [{
	        key: "render",
	        value: function render() {

	            var width = this.buffer.canvas.width = this.width = window.innerWidth;
	            var height = this.buffer.canvas.height = this.height = window.innerHeight;

	            this.buffer.globalAlpha = this.opacity;

	            this.buffer.fillStyle = this.backgroundColor;
	            this.buffer.fillRect(this.x, this.y, this.width, this.height);

	            this.drawContext.drawImage(this.buffer.canvas, 0, 0, width, height, 0, 0, width, height);
	        }
	    }]);
	    return Background;
	}(_Element3.default);

/***/ }
/******/ ]);