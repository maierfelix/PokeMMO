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

	var _Engine = __webpack_require__(7);

	var _Engine2 = _interopRequireDefault(_Engine);

	var _Input = __webpack_require__(117);

	var _Input2 = _interopRequireDefault(_Input);

	var _Editor = __webpack_require__(121);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _input = __webpack_require__(122);

	var Events = _interopRequireWildcard(_input);

	var _entities = __webpack_require__(123);

	var entities = _interopRequireWildcard(_entities);

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

	    this.node = document.querySelector("#main");

	    this.entities = entities;

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
	          this.addMap(function () {
	            return _this.setup(stage);
	          });
	          return void 0;
	        case 2:
	          this.addEntities(function () {
	            return _this.setup(stage);
	          });
	          return void 0;
	        case 3:
	          this.animateNPC();
	          this.setup(stage);
	          return void 0;
	        case 4:
	          /** Instant focus local player */
	          this.engine.camera.focus(this.engine.localEntity, true);
	          this.setup(stage);
	          return void 0;
	        case 5:
	          if (_cfg.EDIT_MODE) {
	            this.engine.editor = new _Editor2.default(this.engine);
	          }
	          this.setup(stage);
	          return void 0;
	        case 6:
	          this.engine.renderer.render();
	          this.setup(stage);
	          return void 0;
	        case 7:
	          this.input = new _Input2.default(Events, this);
	          this.setup(stage);
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
	     * Add map
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addMap",
	    value: function addMap(resolve) {
	      this.engine.addMap("shared/maps/town/town.json", resolve);
	    }

	    /**
	     * Add entities
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addEntities",
	    value: function addEntities(resolve) {

	      var player = this.entities.Player;

	      this.engine.addEntity(new player({ name: "Felix", map: "Town", x: 112, y: 112, zIndex: 4, sprite: "assets/img/0.png", width: 16, height: 16, isLocalPlayer: true, collidable: true, shadow: true }));

	      this.engine.addEntity(new player({ name: "Joy", map: "Town", x: 120, y: 120, zIndex: 4, sprite: "assets/img/200.png", width: 16, height: 16, shadow: true, collidable: true }));

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
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Grid width
	 * @constant
	 * @type {Number}
	 */
	var GRID_WIDTH = exports.GRID_WIDTH = 1;

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
	var VERSION = exports.VERSION = "0.0.1";

	/**
	 * Walk by keyboard
	 * @constant
	 * @type {Boolean}
	 */
	var WALK_BY_KEYBOARD = exports.WALK_BY_KEYBOARD = true;

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
	 * God mode
	 * @constant
	 * @type {Boolean}
	 */
	var GOD_MODE = exports.GOD_MODE = false;

	/**
	 * Debug mode
	 * @constant
	 * @type {Boolean}
	 */
	var DEBUG_MODE = exports.DEBUG_MODE = true;

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
	var MIN_SCALE = exports.MIN_SCALE = 1.0;

	/**
	 * @constant
	 * @type {Number}
	 */
	var MAX_SCALE = exports.MAX_SCALE = 12.5;

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
	var GRAVITY = exports.GRAVITY = -.9375;

	/**
	 * @constant
	 * @type {Object}
	 */
	var VOLUME = exports.VOLUME = {
	  LOCAL_PLAYER: 100,
	  NETWORK_PLAYER: 20
	};

	/**
	 * @constant
	 * @type {Array}
	 */
	var ColorPalette = exports.ColorPalette = [[200, 60, 100], [200, 70, 100], [200, 80, 100], [200, 85, 100], [200, 90, 100], [200, 105, 100], [200, 120, 100], [200, 145, 100], [200, 175, 100],
	/** Morning */
	[175, 155, 100], [155, 155, 100], [145, 145, 100], [130, 130, 100],
	/** Day */
	[125, 125, 100], [120, 120, 100], [120, 120, 100], [120, 120, 100], [125, 125, 100],
	/** Early night */
	[130, 130, 100], [145, 145, 100], [175, 145, 100], [200, 125, 100], [200, 105, 100], [200, 85, 100], [200, 75, 100]];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _functions = __webpack_require__(53);

	var map = _interopRequireWildcard(_functions);

	var _functions2 = __webpack_require__(105);

	var entity = _interopRequireWildcard(_functions2);

	var _Renderer = __webpack_require__(106);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _DisplayObject2 = __webpack_require__(97);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Camera = __webpack_require__(116);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _utils = __webpack_require__(54);

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
	         * Node
	         * @type {Object}
	         */
	        _this.node = _this.instance.node;

	        /**
	         * Context
	         * @type {Object}
	         */
	        _this.context = _this.node.getContext("2d");

	        /**
	         * Active entities
	         * @type {Array}
	         */
	        _this.entities = [];

	        /**
	         * Parsed maps
	         * @type {Object}
	         */
	        _this.maps = {};

	        /**
	         * Active layers
	         * @type {Array}
	         */
	        _this.layers = [];

	        _this.width = width || 0;
	        _this.height = height || 0;

	        /**
	         * Camera object
	         * @type {Object}
	         */
	        _this.camera = new _Camera2.default(_this.width, _this.height);

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

	        return _this;
	    }

	    /**
	     * @param {Number} width
	     * @setter
	     */

	    (0, _createClass3.default)(Engine, [{
	        key: "walkTo",

	        /**
	         * Local entity walk to
	         * @param {Number} x
	         * @param {Number} y
	         */
	        value: function walkTo(x, y) {

	            var ii = 0;
	            var length = 0;

	            var lastX = this.instance.localEntity.x;
	            var lastY = this.instance.localEntity.y;

	            var xx = 0;
	            var yy = 0;

	            var offset = this.getGameMouseOffset(x, y);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	module.exports = __webpack_require__(16).Object.getPrototypeOf;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(11);

	__webpack_require__(13)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
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
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
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
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(21);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _symbol = __webpack_require__(22);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof _Symbol !== "undefined" && obj.constructor === _Symbol ? "symbol" : typeof obj; }

	exports.default = function (obj) {
	  return obj && typeof _symbol2.default !== "undefined" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(44);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(5)
	  , global         = __webpack_require__(15)
	  , has            = __webpack_require__(25)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(27)
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(31)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(32)
	  , keyOf          = __webpack_require__(34)
	  , $names         = __webpack_require__(38)
	  , enumKeys       = __webpack_require__(39)
	  , isArray        = __webpack_require__(40)
	  , anObject       = __webpack_require__(41)
	  , toIObject      = __webpack_require__(35)
	  , createDesc     = __webpack_require__(29)
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

	  if(DESCRIPTORS && !__webpack_require__(43)){
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
/* 25 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(5).setDesc
	  , has = __webpack_require__(25)
	  , TAG = __webpack_require__(32)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(30)('wks')
	  , uid    = __webpack_require__(33)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
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

	var $         = __webpack_require__(5)
	  , toIObject = __webpack_require__(35);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(35)
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(37);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 44 */
/***/ function(module, exports) {

	

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(46);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(50);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(21);

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	module.exports = __webpack_require__(16).Object.setPrototypeOf;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(49).set});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(5).getDesc
	  , isObject = __webpack_require__(42)
	  , anObject = __webpack_require__(41);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 52 */
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Math
	 * @class Math
	 * @export
	 */

	var Math = function () {
	  function Math() {
	    (0, _classCallCheck3.default)(this, Math);
	  }

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
	     * Cubic collision
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
	    key: "cubicCollision",
	    value: function cubicCollision(xx, yy, width, height, x, y, scale) {
	      return window.Math.abs(2 * (x - xx * scale) + -(width * scale)) <= width * scale && window.Math.abs(2 * (y - yy * scale) + -(height * scale)) <= height * scale;
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
	     * @param {Number} factor
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

	      var x = this.roundTo(window.Math.sqrt(window.Math.pow(x1 - x2, 2)), _cfg.DIMENSION);
	      var y = this.roundTo(window.Math.sqrt(window.Math.pow(y1 - y2, 2)), _cfg.DIMENSION);

	      return {
	        x: x1 - x2 < 0 ? -x : x,
	        y: y1 - y2 < 0 ? -y : y
	      };
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addMap = addMap;
	exports.distance = distance;

	var _utils = __webpack_require__(54);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _Map = __webpack_require__(87);

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
	 * Measure distane between 2 entities
	 * @param {Object} entityA
	 * @param {Object} entityB
	 * @return {Object}
	 */
	function distance(entityA, entityB) {

	  var distance = _Math2.default.distance(entityA.x, entityA.y, entityB.x, entityB.y);

	  return distance;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Maps = exports.TextureCache = undefined;
	exports.getSprite = getSprite;
	exports.uHash = uHash;
	exports.getPath = getPath;
	exports.inherit = inherit;
	exports.createCanvasBuffer = createCanvasBuffer;
	exports.imageToCanvas = imageToCanvas;
	exports.getTime = getTime;
	exports.ajax = ajax;

	var _promise = __webpack_require__(55);

	var _promise2 = _interopRequireDefault(_promise);

	var _Texture = __webpack_require__(85);

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
	 * Get a sprite
	 * @param {String}   sprite
	 * @param {Function} resolve
	 */
	function getSprite(sprite, resolve) {

	  if (TextureCache[sprite]) {
	    resolve(TextureCache[sprite]);
	    return void 0;
	  }

	  new _Texture2.default(sprite, function (instance) {
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
	 * @param {Object} img
	 * @return {Object}
	 */
	function imageToCanvas(img) {

	  var ctx = createCanvasBuffer(img.width, img.height);

	  ctx.drawImage(img, 0, 0, img.width, img.height);

	  return ctx;
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	__webpack_require__(57);
	__webpack_require__(63);
	__webpack_require__(67);
	module.exports = __webpack_require__(16).Promise;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(58)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(60)(String, 'String', function(iterated){
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(59)
	  , defined   = __webpack_require__(12);
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
/* 59 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(43)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(27)
	  , hide           = __webpack_require__(28)
	  , has            = __webpack_require__(25)
	  , Iterators      = __webpack_require__(61)
	  , $iterCreate    = __webpack_require__(62)
	  , setToStringTag = __webpack_require__(31)
	  , getProto       = __webpack_require__(5).getProto
	  , ITERATOR       = __webpack_require__(32)('iterator')
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
/* 61 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(5)
	  , descriptor     = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(31)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(28)(IteratorPrototype, __webpack_require__(32)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	var Iterators = __webpack_require__(61);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(65)
	  , step             = __webpack_require__(66)
	  , Iterators        = __webpack_require__(61)
	  , toIObject        = __webpack_require__(35);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(60)(Array, 'Array', function(iterated, kind){
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
/* 65 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(5)
	  , LIBRARY    = __webpack_require__(43)
	  , global     = __webpack_require__(15)
	  , ctx        = __webpack_require__(17)
	  , classof    = __webpack_require__(68)
	  , $export    = __webpack_require__(14)
	  , isObject   = __webpack_require__(42)
	  , anObject   = __webpack_require__(41)
	  , aFunction  = __webpack_require__(18)
	  , strictNew  = __webpack_require__(69)
	  , forOf      = __webpack_require__(70)
	  , setProto   = __webpack_require__(49).set
	  , same       = __webpack_require__(75)
	  , SPECIES    = __webpack_require__(32)('species')
	  , speciesConstructor = __webpack_require__(76)
	  , asap       = __webpack_require__(77)
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
	    if(works && __webpack_require__(26)){
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
	  __webpack_require__(82)(P.prototype, {
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
	__webpack_require__(31)(P, PROMISE);
	__webpack_require__(83)(PROMISE);
	Wrapper = __webpack_require__(16)[PROMISE];

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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(84)(function(iter){
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(37)
	  , TAG = __webpack_require__(32)('toStringTag')
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
/* 69 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(17)
	  , call        = __webpack_require__(71)
	  , isArrayIter = __webpack_require__(72)
	  , anObject    = __webpack_require__(41)
	  , toLength    = __webpack_require__(73)
	  , getIterFn   = __webpack_require__(74);
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(41);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(61)
	  , ITERATOR   = __webpack_require__(32)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(59)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(32)('iterator')
	  , Iterators = __webpack_require__(61);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(41)
	  , aFunction = __webpack_require__(18)
	  , SPECIES   = __webpack_require__(32)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , macrotask = __webpack_require__(78).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(37)(process) == 'process'
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(17)
	  , invoke             = __webpack_require__(79)
	  , html               = __webpack_require__(80)
	  , cel                = __webpack_require__(81)
	  , global             = __webpack_require__(15)
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
	  if(__webpack_require__(37)(process) == 'process'){
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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(27);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(16)
	  , $           = __webpack_require__(5)
	  , DESCRIPTORS = __webpack_require__(26)
	  , SPECIES     = __webpack_require__(32)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(32)('iterator')
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

	var _utils = __webpack_require__(54);

	var _cfg = __webpack_require__(6);

	var _effects = __webpack_require__(86);

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
	     * @param {Function} resolve
	     * @constructor
	     */

	    function Texture(url, resolve) {
	        (0, _classCallCheck3.default)(this, Texture);

	        /**
	         * Texture
	         * @type {Object}
	         */
	        this.texture = null;

	        /**
	         * Effect texture
	         * @type {Object}
	         */
	        this.texture_effect = null;

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
	                _utils.TextureCache[url] = this;
	                this.texture = (0, _utils.imageToCanvas)(img);
	                this.renderEffects();
	                resolve();
	            }.bind(this));

	            img.src = url;

	            return void 0;
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

	            var width = this.texture.canvas.width;
	            var height = this.texture.canvas.height;

	            var texture = (0, _utils.createCanvasBuffer)(width, height);

	            this.drawTimeLightning(this.texture, texture, 0, 0, width, height, _cfg.ColorPalette);

	            this.texture_effect = texture;
	        }
	    }]);
	    return Texture;
	}();

	exports.default = Texture;

	(0, _utils.inherit)(Texture, effect);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drawTimeLightning = drawTimeLightning;
	exports.colorizePixels = colorizePixels;

	var _utils = __webpack_require__(54);

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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(88);

	var _assign2 = _interopRequireDefault(_assign);

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(54);

	var _MapEntity = __webpack_require__(95);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _DisplayObject2 = __webpack_require__(97);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Texture = __webpack_require__(85);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Path = __webpack_require__(99);

	var _Path2 = _interopRequireDefault(_Path);

	var _events = __webpack_require__(102);

	var events = _interopRequireWildcard(_events);

	var _functions = __webpack_require__(53);

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
	    (0, _utils.getSprite)(_this.tileset, function (texture) {
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
	   * Load map file
	   * @param {Function} resolve
	   */

	  (0, _createClass3.default)(Map, [{
	    key: "loadMapFile",
	    value: function loadMapFile(resolve) {

	      var path = this.mapPath + this.name.toLowerCase() + ".js";

	      (0, _utils.ajax)(path).then(function (data) {
	        var map = new Function(data)();
	        this.entities = map.entities;
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
	        this.entities[ii] = this.addEntity((0, _assign2.default)(this.objects[this.entities[ii].type], this.entities[ii]));
	      };
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

	      var tileset = this.texture.texture_effect.canvas;

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(91)});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(5)
	  , toObject = __webpack_require__(11)
	  , IObject  = __webpack_require__(36);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(19)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(57);
	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(41)
	  , get      = __webpack_require__(74);
	module.exports = __webpack_require__(16).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Entity2 = __webpack_require__(96);

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

	        _this.frames = [0, 0];

	        _this.facing = 0;

	        _this.opacity = 1.0;

	        _this.frame = 1;

	        _this.reversed = [0, 0];

	        _this.reverseShadow = [0, 0];

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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(54);

	var _DisplayObject2 = __webpack_require__(97);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _Texture = __webpack_require__(85);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _Shadow = __webpack_require__(98);

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
	   * @param {Object}   obj
	   * @param {Function} resolve
	   * @constructor
	   */

	  function Entity(obj, resolve) {
	    (0, _classCallCheck3.default)(this, Entity);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Entity).call(this, null));

	    _this.name = obj.name || null;

	    /**
	     * Last position
	     * @type {Object}
	     */
	    _this.last = new _Math2.default.Point();

	    /**
	     * Z priority
	     * @type {Number}
	     */
	    _this.zIndex = obj.zIndex === void 0 ? 0 : obj.zIndex;

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
	     * Static state
	     * Used for faster rendering
	     * @type {Boolean}
	     */
	    _this.static = obj.static === void 0 ? false : obj.static;

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
	    _this.hasShadow = obj.shadow || false;

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
	     * States
	     * @type {Object}
	     */
	    _this.STATES = {
	      JUMPING: false,
	      LOCK: false,
	      EDITING: false
	    };

	    /** Load texture */
	    (0, _utils.getSprite)(_this.sprite, function (texture) {
	      this.texture = texture;
	      if (obj.shadow === true) {
	        this.shadow = new _Shadow2.default(this);
	      }
	      if (resolve !== void 0 && resolve instanceof Function) resolve();
	    }.bind(_this));

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

	    return _this;
	  }

	  /**
	   * Refresh entity states
	   */

	  (0, _createClass3.default)(Entity, [{
	    key: "refreshState",
	    value: function refreshState() {
	      this.STATES.JUMPING = this.z !== 0;
	    }

	    /**
	     * Jump
	     */

	  }, {
	    key: "jump",
	    value: function jump() {

	      this.refreshState();

	      if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	      this.STATES.JUMPING = true;

	      this.idleTime = 0;
	    }

	    /**
	     * Jumping
	     */

	  }, {
	    key: "jumping",
	    value: function jumping() {

	      this.z += this.gravity;

	      if (this.z < 0) {
	        this.gravity += .1;
	        if (this.hasShadow === true) {
	          this.shadow.position.set(-(this.z / 2), this.shadowY - this.z);
	          this.shadow.scale.set(this.z, this.z);
	        }
	      } else {
	        this.gravity = _cfg.GRAVITY;
	        this.z = 0;
	        this.refreshState();
	        if (this.hasShadow === true) {
	          this.shadow.position.set(this.shadowX, this.shadowY);
	          this.shadow.scale.set(0, 0);
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
	     */

	  }, {
	    key: "fadeIn",
	    value: function fadeIn() {
	      this.animations.push({
	        type: "fade",
	        fade: 1
	      });
	    }

	    /**
	     * Fade out
	     */

	  }, {
	    key: "fadeOut",
	    value: function fadeOut() {
	      this.animations.push({
	        type: "fade",
	        fade: 0
	      });
	    }

	    /**
	     * Fade animation
	     * @param {Object} animation
	     */

	  }, {
	    key: "fade",
	    value: function fade(animation) {

	      this.opacity += animation.fade === 1 ? .025 : -.025;

	      if (animation.fade === 1 && this.opacity > 1) {
	        this.opacity = 1.0;
	        this.stopAnimation();
	      } else if (animation.fade === 0 && this.opacity < 0) {
	        this.opacity = .0;
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
	  }]);
	  return Entity;
	}(_DisplayObject3.default);

	exports.default = Entity;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _utils = __webpack_require__(54);

	var _Math = __webpack_require__(52);

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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(97);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _utils = __webpack_require__(54);

	var _effects = __webpack_require__(86);

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
	         * Unique id
	         * @type {Number}
	         */

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shadow).call(this, null));

	        _this.id = (0, _utils.uHash)();

	        _this.parent = parent;

	        /**
	         * Texture
	         * @type {Object}
	         */
	        _this.texture = null;

	        _this.position.set(parent.shadowX, parent.shadowY);

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

	            var texture = _utils.TextureCache["Shadow:" + this.parent.sprite];

	            this.texture = texture === void 0 ? this.buildShadow() : texture;
	        }

	        /**
	         * Build shadow
	         * @return {Object}
	         */

	    }, {
	        key: "buildShadow",
	        value: function buildShadow() {

	            var texture = this.parent.texture.texture;

	            var width = texture.canvas.width;
	            var height = texture.canvas.height;

	            var shadow = (0, _utils.createCanvasBuffer)(width, height);

	            shadow.translate(0, height);
	            shadow.scale(1, -1);

	            this.drawShadow(texture, shadow, 0, -height, width, height);

	            shadow.setTransform(1, 0, 0, 1, 0, 0);

	            _utils.TextureCache["Shadow:" + this.parent.sprite] = shadow;

	            return this.texture = shadow;
	        }

	        /**
	         * Create shadow of a sprite
	         * @param {Object} buffer
	         * @param {Object} ctx
	         * @param {Number} x
	         * @param {Number} y
	         * @param {Number} width
	         * @param {Number} height
	         */

	    }, {
	        key: "drawShadow",
	        value: function drawShadow(buffer, ctx, x, y, width, height) {

	            ctx.clear();

	            ctx.drawImage(buffer.canvas, 0, 0, width, height);

	            this.drawTint(ctx, 0, 0, width, height, 85);
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
/* 99 */
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

	var _astar = __webpack_require__(100);

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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = __webpack_require__(21);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(101)(module)))

/***/ },
/* 101 */
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isEntityCollidable = isEntityCollidable;
	exports.collidesWithCollisionBox = collidesWithCollisionBox;
	exports.isObstacle = isObstacle;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	  for (; ii < length; ++ii) {
	    if (entities[ii].id === entity.id) continue;
	    if (entities[ii].collidable === false) continue;
	    if (entities[ii].collisionBox.length > 0) {
	      if (this.collidesWithCollisionBox(entities[ii], x, y) === true) return true;
	    } else {
	      if (_Math2.default.cubicCollision(entities[ii].x << 0, entities[ii].y << 0, entities[ii].width + entities[ii].xMargin - _cfg.DIMENSION, entities[ii].height + entities[ii].yMargin - _cfg.DIMENSION, x, y, 1) === true) {
	        return true;
	      }
	    }
	  };

	  return false;
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

	  var width = (entity.width + entity.xMargin) / _cfg.DIMENSION;
	  var height = (entity.height + entity.yMargin) / _cfg.DIMENSION;

	  var length = width * height;

	  var eX = entity.x << 0;
	  var eY = entity.y << 0;

	  for (; ii < length; ++ii) {
	    tile = entity.collisionBox[yy + xx];
	    if (tile === 1) {
	      if (eX + xx * _cfg.DIMENSION === x && eY + yy / width * _cfg.DIMENSION === y) {
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

/***/ },
/* 103 */,
/* 104 */,
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

	var _index = __webpack_require__(96);

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

	  entity.fadeIn();

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

	__webpack_require__(107);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(54);

	var _functions = __webpack_require__(105);

	var entity = _interopRequireWildcard(_functions);

	var _render = __webpack_require__(109);

	var render = _interopRequireWildcard(_render);

	var _debug = __webpack_require__(111);

	var debug = _interopRequireWildcard(_debug);

	var _edit = __webpack_require__(115);

	var edit = _interopRequireWildcard(_edit);

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
	         * Size
	         * @type {Object}
	         */
	        this.size = instance.size;

	        /**
	         * Entities ref
	         * @type {Object}
	         */
	        this.entities = instance.entities;

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
	         * Context ref
	         * @type {Object}
	         */
	        this.context = instance.context;

	        /**
	         * Image smoothing
	         * @type {Boolean}
	         */
	        this.imageSmoothing = false;

	        /**
	         * Dimension
	         * @type {Number}
	         */
	        this.dimension = _cfg.DIMENSION;

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

	        /**
	         * Sprite cache queue
	         * @type {Array}
	         */
	        this.spriteQueue = [];

	        this.resize(false);
	    }

	    /**
	     * @param {Boolean} value
	     * @setter
	     */

	    (0, _createClass3.default)(Renderer, [{
	        key: "update",

	        /**
	         * Update
	         */
	        value: function update() {

	            this.updateTimers();

	            if (this.camera.entityfocus !== null) {
	                this.camera.animate();
	            }

	            if (this.camera.queue.length <= 0) {
	                this.camera.focusEntity();
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
	            this.delta = (this.now - this.then) / 1E3;
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
	            this.node.width = this.width;
	            this.node.height = this.height;
	            this.camera.width = this.width;
	            this.camera.height = this.height;
	            this.instance.width = this.width;
	            this.instance.height = this.height;
	            this.clear();
	            if (redraw === true) {
	                this.draw();
	            }
	        }

	        /**
	         * Sort layers and entities
	         */

	    }, {
	        key: "sort",
	        value: function sort() {

	            this.depthSort(this.instance.currentMap.entities);

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
	                for (; jj > 0 && array[jj - 1].position.y + array[jj - 1].yMargin + array[jj - 1].size.y > key.position.y + key.yMargin + key.size.y; --jj) {
	                    array[jj] = array[jj - 1];
	                };
	                array[jj] = key;
	            };

	            return void 0;
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
	(0, _utils.inherit)(Renderer, edit);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _audio = __webpack_require__(108);

	window.Sound = _audio.AudioPlayer;

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

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	// Web Audio and 3D Soundscapes: Implementation
	// http://gamedev.tutsplus.com/tutorials/web-audio-and-3d-soundscapes-implementation--cms-22651
	//
	(function () {
		if (window.AudioContext === undefined) {
			return;
		}

		// Helper function.
		function is(o, c) {
			if (o === null || o === undefined) {
				return false;
			}

			if (c === null || c === undefined) {
				return false;
			}

			if (c === Number) {
				if (o.constructor === c) {
					return isNaN(o) === false;
				}

				return false;
			}

			return o.constructor === c;
		}

		//
		// AudioPlayer constructor.
		//
		function AudioPlayer() {
			if (this.constructor !== AudioPlayer) {
				return;
			}

			var m_this = this;
			var m_context = new AudioContext();
			var m_gain = m_context.createGain();

			// Sounds will connect to this gain node.
			m_gain.connect(m_context.destination);

			// The common coordinate system used with WebGL.
			// The listener is always facing down the negative Z axis, the
			// positive Y axis points up, the positive X axis points right.
			m_context.listener.setOrientation(0, 0, -1, 0, 1, 0);

			var m_loader = new XMLHttpRequest();
			var m_queue = []; // <String>
			var m_buffers = {}; // <String,AudioBuffer>
			var m_sounds = {}; // <String,Sound>
			var m_counter = 0;

			this.IO_ERROR = 1;
			this.DECODING_ERROR = 2;

			this.errorText = null;
			this.errorType = null;
			this.onloadstart = null;
			this.onloaderror = null;
			this.onloadcomplete = null;

			//
			// Loads a sound file.
			// The source paths are queued and loaded sequentially.
			//
			// src: The source path of the sound file to load.
			//
			this.load = function (src) {
				if (is(src, String) === false) {
					throw new Error("Parameter 'src' must be a String");
				}

				if (m_queue.push(src) === 1) {
					load();
				}
			};

			//
			// Creates a new sound and returns an identifier for the sound.
			//
			// src: The source path of the sound file the new sound will use.
			//
			this.create = function (src) {
				if (is(src, String) === false) {
					throw new Error("Parameter 'src' must be a String");
				}

				if (m_buffers[src] === undefined) {
					throw new Error("Sound file has not been loaded: " + src);
				}

				var snd = "snd:" + m_counter++;

				m_sounds[snd] = new Sound();
				m_sounds[snd].snd = snd;
				m_sounds[snd].buffer = m_buffers[src];

				return snd;
			};

			//
			// Destroys a previously created sound. The sound identifier returned
			// from the create() function will be invalidated.
			//
			// snd: The sound identifier.
			//
			this.destroy = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				if (o.source !== null) {
					if (o.source.loop) {
						o.source.stop();
					}
				}

				delete m_sounds[snd];
			};

			//
			// Plays a sound.
			//
			// snd:  The sound identifier.
			// loop: Indicates if the sound should loop. (optional, default = false)
			//
			this.play = function (snd, loop) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				if (is(loop, Boolean) === false) {
					loop = false;
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				if (o.playing) {
					o.source.stop();
				}

				o.source = m_context.createBufferSource();
				o.panner = m_context.createPanner();

				o.source.buffer = o.buffer;
				o.source.loop = loop;
				o.source.onended = onSoundEnded;

				// This is a bit of a hack but we need to reference the sound
				// object in the onSoundEnded event handler, and doing things
				// this way is more optimal than binding the handler.
				o.source.sound = o;

				o.panner.panningModel = "HRTF";
				o.panner.distanceModel = "linear";
				o.panner.setPosition(o.x, o.y, o.z);

				o.source.connect(o.panner);
				o.panner.connect(m_gain);

				o.source.start();

				o.playing = true;
			};

			//
			// Stops a sound playing.
			//
			// snd: The sound identifier.
			//
			this.stop = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				if (o.playing) {
					o.source.stop();
				}
			};

			//
			// Indicates if a sound is playing.
			//
			// src: The sound identifier.
			//
			this.isPlaying = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				return o.playing;
			};

			//
			// Sets the X position of the sound.
			//
			// src: The sound identifier.
			// x:   The position.
			//
			this.setX = function (snd, x) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				if (is(x, Number) === false) {
					throw new Error("Parameter 'x' must be a Number");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				o.x = x;

				if (o.panner !== null) {
					o.panner.setPosition(o.x, o.y, o.z);
				}
			};

			//
			// Returns the X position of a sound.
			//
			// src: The sound identifier.
			//
			this.getX = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				return o.x;
			};

			//
			// Sets the Y position of the sound.
			//
			// src: The sound identifier.
			// y:   The position.
			//
			this.setY = function (snd, y) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				if (is(y, Number) === false) {
					throw new Error("Parameter 'y' must be a Number");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				o.y = y;

				if (o.panner !== null) {
					o.panner.setPosition(o.x, o.y, o.z);
				}
			};

			//
			// Returns the Y position of the sound.
			//
			// src: The sound identifier.
			//
			this.getY = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				return o.y;
			};

			//
			// Sets the Z position of the sound.
			//
			// src: The sound identifier.
			// z:   The position.
			//
			this.setZ = function (snd, z) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				if (is(z, Number) === false) {
					throw new Error("Parameter 'z' must be a Number");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				o.z = z;

				if (o.panner !== null) {
					o.panner.setPosition(o.x, o.y, o.z);
				}
			};

			//
			// Returns the Z position of the sound.
			//
			// src: The sound identifier.
			//
			this.getZ = function (snd) {
				if (is(snd, String) === false) {
					throw new Error("Parameter 'snd' must be a String");
				}

				var o = m_sounds[snd];

				if (o === undefined) {
					throw new Error("Parameter 'snd' is invalid");
				}

				return o.z;
			};

			//
			// Sets the position of a sound.
			//
			// src: The sound identifier.
			// x:   The X position.
			// y:   The Y position.
			// z:   The Z position.
			//
			this.setPosition = function (snd, x, y, z) {
				m_this.setX(snd, x);
				m_this.setY(snd, y);
				m_this.setZ(snd, z);
			};

			//
			// Sets the volume level of the audio player.
			//
			// volume: The volume. (min = 0.0, max = 1.0)
			// time:   The amount of time, in seconds, that the current
			//         volume level should take to reach the new volume level.
			//         (optional, default = 0.01, min = 0.01, max = 120.0)
			//
			this.setVolume = function (volume, time) {
				if (is(volume, Number) === false) {
					throw new Error("Parameter 'volume' must be a Number");
				}

				volume = clamp(volume, 0.0, 1.0);

				if (is(time, Number) === false) {
					time = 0.01;
				} else {
					time = clamp(time, 0.01, 120.0);
				}

				var currentTime = m_context.currentTime;
				var currentVolume = m_gain.gain.value;

				m_gain.gain.cancelScheduledValues(0.0);
				m_gain.gain.setValueAtTime(currentVolume, currentTime);
				m_gain.gain.linearRampToValueAtTime(volume, currentTime + time);
			};

			//
			// Returns the volume level of the audio player.
			//
			this.getVolume = function () {
				return m_gain.gain.value;
			};

			//
			// Private.
			//
			function load() {
				m_this.errorText = null;
				m_this.errorType = null;

				if (m_queue.length === 0 || m_loader.readyState !== 0) {
					return;
				}

				m_loader.open("GET", m_queue[0]);
				m_loader.responseType = "arraybuffer";
				m_loader.onload = onLoad;
				m_loader.send();
			}

			//
			// Private.
			// This function will be scoped to the m_loader object.
			//
			function onLoad(event) {
				var data = m_loader.response;
				var status = m_loader.status;

				// Reset the loader.
				m_loader.abort();

				// Anything higher than 400 will indicate an error.
				if (status < 400) {
					m_context.decodeAudioData(data, onDecode, onDecodeError);
					return;
				}

				var src = m_queue.shift();

				// Clear the queue.
				m_queue = [];

				m_this.errorText = "Failed to load sound file: " + src;
				m_this.errorType = m_this.IO_ERROR;

				if (is(m_this.onloaderror, Function)) {
					m_this.onloaderror();
				} else {
					window.console.error(m_this.errorText);
				}
			}

			//
			// Private.
			// This function will be scoped to the window object.
			//
			function onDecode(buffer) {
				var src = m_queue.shift();

				// Store the audio buffer.
				m_buffers[src] = buffer;

				// Break the loading loop if the queue is empty.
				if (m_queue.length === 0) {
					if (is(m_this.onloadcomplete, Function)) {
						m_this.onloadcomplete();
					}
				}

				load();
			}

			//
			// Private.
			// This function will be scoped to the window object.
			//
			function onDecodeError() {
				var src = m_queue[0];

				// Clear the queue.
				m_queue = [];

				m_this.errorText = "Failed to decode sound file: " + src;
				m_this.errorType = m_this.DECODING_ERROR;

				if (is(m_this.onloaderror, Function)) {
					m_this.onloaderror();
				} else {
					window.console.error(m_this.errorText);
				}
			}

			//
			// Private.
			// This function will be scoped to an AudioSourceBufferNode object.
			//
			function onSoundEnded() {
				var o = this.sound;

				o.panner.disconnect();
				o.source.disconnect();
				o.source.onended = null;

				o.playing = false;
			}
		}

		//
		// Sound constructor.
		//
		function Sound() {
			this.x = 0.0;
			this.y = 0.0;
			this.z = 0.0;
			this.snd = null; // String (sound identifier)
			this.buffer = null; // AudioBuffer
			this.source = null; // AudioBufferSourceNode
			this.panner = null; // PannerNode
			this.playing = false;
		}

		//
		// Expose the AudioPlayer constructor as a read-only property.
		//
		Object.defineProperty(window, "AudioPlayer", {
			value: AudioPlayer
		});
	})();

	exports.AudioPlayer = AudioPlayer;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;
	exports.clear = clear;
	exports.draw = draw;
	exports.renderMap = renderMap;
	exports.renderMapEntities = renderMapEntities;
	exports.getAnimationFrame = getAnimationFrame;
	exports.renderEntities = renderEntities;
	exports.renderEntity = renderEntity;
	exports.renderShadow = renderShadow;
	exports.drawPixelText = drawPixelText;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _grid = __webpack_require__(110);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Rendering
	 */
	function render() {
	  var _this = this;

	  if (_cfg.DEBUG_MODE === true) {
	    this.clear();
	  }

	  this.update();

	  this.sort();

	  this.draw();

	  if (_cfg.DEBUG_MODE === true) {
	    setTimeout(function () {
	      return _this.render();
	    }, 1E3 / _cfg.DEBUG_FPS);
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
	  this.node.width = this.node.width;
	  this.context.setImageSmoothing(this.imageSmoothing);
	}

	/**
	 * Draw
	 */
	function draw() {

	  this.renderMap();

	  this.renderEntities();

	  if (_cfg.DEBUG_MODE === true) {
	    this.context.beginPath();
	    (0, _grid.drawGrid)(this.context, this.camera.x, this.camera.y, this.width, this.height, this.dimension, this.camera.resolution, .05, "#FFF");
	    this.context.closePath();
	  }

	  if (_cfg.EDIT_MODE === true) {
	    this.renderEditorMode();
	  }

	  if (_cfg.DEBUG_MODE === true) {
	    this.renderDebugScene();
	  }

	  return void 0;
	}

	/**
	 * Render map
	 */
	function renderMap() {

	  var map = this.instance.currentMap;

	  /** Render background layer */
	  this.context.drawImage(map.buffers[1].canvas, this.camera.x << 0, this.camera.y << 0, map.width * this.dimension * this.camera.resolution << 0, map.height * this.dimension * this.camera.resolution << 0);

	  return void 0;
	}

	/**
	 * Render map entities
	 * @param {Object} map
	 */
	function renderMapEntities(map) {

	  var entity = null;

	  var ii = 0;
	  var length = 0;

	  length = map.entities.length;

	  for (; ii < length; ++ii) {
	    entity = map.entities[ii];
	    if (!this.instance.camera.isInView(entity.position.x, entity.position.y, entity.size.x, entity.size.y)) continue;
	    this.renderEntity(entity);
	  };

	  return void 0;
	}

	/**
	 * Get animation frame
	 * @param  {Object} entity
	 * @return {Number}
	 */
	function getAnimationFrame(entity) {
	  return Math.floor((this.now - entity.animationStart) / entity.animationSpeed) % (entity.animationFrames + (entity.loop === true ? 1 : 0)) * (entity.size.x * 2 << 0 * entity.size.x / entity.frames);
	}

	/**
	 * Render entities
	 */
	function renderEntities() {

	  var entities = this.instance.currentMap.entities;

	  var entity = null;

	  var resolution = this.camera.resolution;

	  var ii = 0;
	  var length = entities.length;

	  var x = .0;
	  var y = .0;

	  var width = .0;
	  var height = .0;

	  var eWidth = .0;
	  var eHeight = .0;

	  var frame = 0;

	  var dim = _cfg.DIMENSION;

	  for (; ii < length; ++ii) {

	    entity = entities[ii];

	    entity.idleTime++;

	    if (entity.static === false) entity.animate();

	    if (this.instance.camera.isInView(entity.position.x, entity.position.y, entity.size.x, entity.size.y) === false) continue;
	    if (entity.opacity === .0) continue;
	    if (entity.texture === null || entity.shadow === null) continue;

	    x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	    y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	    width = entity.size.x * resolution << 0;
	    height = entity.size.y * resolution << 0;

	    eWidth = entity.size.x / entity.scale * 2 << 0;
	    eHeight = entity.size.y / entity.scale * 2 << 0;

	    if (entity.animation === true) {
	      frame = this.getAnimationFrame(entity);
	    } else {
	      frame = (entity.frames[entity.frame] + entity.getFrameIndex()) * eWidth;
	    }

	    /** Rendering */
	    this.renderEntity(entity, frame, x, y, width, height, eWidth, eHeight);
	  };

	  return void 0;
	}

	/**
	 * Render a single entity
	 * @param {Object} entity
	 * @param {Number} frame
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderEntity(entity, frame, x, y, width, height, eWidth, eHeight) {

	  var cOpacity = entity.customOpacity();

	  if (cOpacity === true) {
	    this.context.globalAlpha = entity.opacity;
	  }

	  /** Shadow */
	  if (entity.hasShadow === true) {
	    this.renderShadow(entity, frame, x, y, width, height, eWidth, eHeight);
	  }

	  /** Sprite */
	  this.context.drawImage(entity.texture.texture_effect.canvas,
	  /** Frame */
	  frame, eHeight * entity.facing,
	  /** Scale */
	  eWidth, eHeight, x, y, width, height);

	  /** Reset ctx opacity */
	  if (cOpacity === true) {
	    this.context.globalAlpha = 1.0;
	  }

	  return void 0;
	}

	/**
	 * Render shadow
	 * @param {Object} entity
	 * @param {Number} frame
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderShadow(entity, frame, x, y, width, height, eWidth, eHeight) {

	  var resolution = this.camera.resolution;

	  this.context.drawImage(
	  /** Texture */
	  entity.shadow.texture.canvas,
	  /** Frame */
	  frame, eHeight * entity.shadowFacing(entity.facing),
	  /** Scale */
	  eWidth, eHeight,
	  /** Position */
	  x + entity.shadow.position.x * resolution << 0, y + entity.shadow.position.y * resolution + eHeight / 2 * entity.scale * resolution << 0,
	  /** Scretch */
	  (width + entity.shadow.scale.x * resolution) / _cfg.SHADOW_X << 0, (height + entity.shadow.scale.y * resolution) / _cfg.SHADOW_Y << 0);

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
	  this.context.fillStyle = 'white';
	  this.context.fillText(str, x, y);

	  return void 0;
	}

/***/ },
/* 110 */
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderDebugScene = renderDebugScene;

	var _keys = __webpack_require__(112);

	var _keys2 = _interopRequireDefault(_keys);

	var _utils = __webpack_require__(54);

	var _cfg = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Render debug scene
	 */
	function renderDebugScene() {

	  var color = '#313131';

	  this.drawPixelText("WIDTH: " + this.width + " HEIGHT " + this.height, 15, 30, 20, 1.5, color);

	  this.drawPixelText("DIMENSION: " + _cfg.DIMENSION, 15, 60, 20, 1.5, color);

	  this.drawPixelText("X: " + this.camera.x + " Y: " + this.camera.y, 15, 90, 20, 1.5, color);

	  this.drawPixelText("DELTA: " + this.delta * 1E3 + " ms", 15, 120, 20, 1.5, color);

	  this.drawPixelText("SCALE: " + this.camera.resolution.toFixed(6), 15, 150, 20, 1.5, color);

	  this.drawPixelText("ENTITIES: " + this.instance.currentMap.entities.length, 15, 180, 20, 1.5, color);

	  var ii = 0;
	  var kk = 0;

	  var length = 0;

	  var entities = this.instance.currentMap.entities;

	  length = entities.length;

	  for (; ii < length; ++ii) {
	    if (this.instance.camera.isInView(entities[ii].x, entities[ii].y, entities[ii].width, entities[ii].height) && ++kk) {}
	  };

	  this.drawPixelText("ENTITIES IN VIEW: " + kk, 15, 210, 20, 1.5, color);

	  this.drawPixelText("TEXTURES: " + (0, _keys2.default)(_utils.TextureCache).length, 15, 240, 20, 1.5);

	  if (this.instance.localEntity !== null) {
	    this.drawPixelText("LOCAL X: " + this.instance.localEntity.x + " Y: " + this.instance.localEntity.y, 15, 270, 20, 1.5, color);
	  }

	  this.drawPixelText("GOD MODE: " + (_cfg.GOD_MODE === true ? "enabled" : "disabled"), 15, 300, 20, 1.5, color);

	  this.drawPixelText("FREE CAMERA: " + (_cfg.FREE_CAMERA === true ? "enabled" : "disabled"), 15, 330, 20, 1.5, color);

	  this.drawPixelText("EDIT MODE: " + (_cfg.EDIT_MODE === true ? "enabled" : "disabled"), 15, 360, 20, 1.5, color);
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(114);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(11);

	__webpack_require__(13)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderEditorMode = renderEditorMode;
	exports.renderSelection = renderSelection;
	exports.renderEntityCollisionBox = renderEntityCollisionBox;
	exports.renderSelectionText = renderSelectionText;

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Edit mode
	 */
	function renderEditorMode() {

	  this.renderSelection();
	}

	/**
	 * Render entity selection
	 */
	function renderSelection() {

	  var entity = this.instance.editor.entitySelection;

	  if (entity === null) return void 0;

	  if (this.camera.isInView(entity.position.x, entity.position.y, entity.size.x, entity.size.y) === false) return void 0;
	  if (entity.opacity === .0) return void 0;
	  if (entity.texture === null || entity.shadow === null) return void 0;

	  var resolution = this.camera.resolution;

	  var x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	  var y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	  var width = entity.size.x * resolution << 0;
	  var height = entity.size.y * resolution << 0;

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

	  var dim = _cfg.DIMENSION * resolution;

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

	  this.drawPixelText(txtX, xx, yy, size, ln, color);

	  this.drawPixelText(txtY, xx, yy += size, size, ln, color);
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(6);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(97);

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
	   * @param {Number} width
	   * @param {Number} height
	   */

	  function Camera(width, height) {
	    (0, _classCallCheck3.default)(this, Camera);

	    /**
	     * Drag offset
	     * @type {Object}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Camera).call(this, null));

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

	    /**
	     * Animation queue
	     * @type {Array}
	     */
	    _this.queue = [];

	    /** Camera size */
	    _this.size.set(width || 0, height || 0);

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
	     * Entity to focus
	     * @type {Object}
	     */
	    _this.entityFocus = null;

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

	      var amount = e.deltaY ? -e.deltaY : e.deltaY;

	      amount = amount / 2 / (_Math2.default.hypot(this.width, this.height) / Math.PI) * _Math2.default.zoomScale(this.scale);

	      this.drag.pz = this.resolution;

	      this.scale += amount / 2;

	      if (this.scale < _cfg.MIN_SCALE) this.scale = _cfg.MIN_SCALE;
	      if (this.scale > _cfg.MAX_SCALE) this.scale = _cfg.MAX_SCALE;

	      this.x -= this.drag.sx * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	      this.y -= this.drag.sy * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	    }

	    /**
	     * Get x center position
	     * @param  {Number} x
	     * @return {Number}
	     */

	  }, {
	    key: "getX",
	    value: function getX(x) {
	      return this.size.x / 2 - x * this.resolution - _cfg.DIMENSION / 2 * this.resolution;
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
	     * Play camera animations
	     */

	  }, {
	    key: "animate",
	    value: function animate() {

	      if (this.queue.length <= 0) return void 0;

	      var velocity = this.queue[0];

	      var x = this.getX(this.queue[0].entity.x);
	      var y = this.getY(this.queue[0].entity.y);

	      /**
	       * TODO: Get camera movement working
	       * while change resolution
	       * TODO: Make more stable
	       */

	      /**
	       * Immediate camera value injection
	       * ?: so we do grid based movement
	       */
	      if (this.position.x !== x) {
	        this.position.x += this.position.x < x ? this.resolution : -this.resolution;
	      } else {
	        this.position.y += this.position.y < y ? this.resolution : -this.resolution;
	      }

	      if (this.position.x === x && this.position.y === y) {
	        this.entityFocus = this.queue[0].entity;
	        this.queue.shift();
	      }

	      return void 0;
	    }

	    /**
	     * Animate focus
	     * @param {Object} entity
	     */

	  }, {
	    key: "animateFocus",
	    value: function animateFocus(entity) {
	      this.queue.push({
	        entity: entity
	      });
	    }

	    /**
	     * Focus focusEntity
	     */

	  }, {
	    key: "focusEntity",
	    value: function focusEntity() {

	      if (_cfg.FREE_CAMERA === true) {
	        return void 0;
	      }

	      if (this.entityFocus === null || this.entityFocus === void 0) return void 0;

	      this.position.x = this.getX(this.entityFocus.x);
	      this.position.y = this.getY(this.entityFocus.y);

	      return void 0;
	    }

	    /**
	     * Focus a entity
	     * @param {Object}  entity
	     * @param {Boolean} instant
	     */

	  }, {
	    key: "focus",
	    value: function focus(entity, instant) {
	      if (instant === true) {
	        this.entityFocus = entity;
	        return void 0;
	      }
	      this.animateFocus(entity);
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

	      return x + width >= 0 && x - width <= this.size.x && y + height >= 0 && y - height <= this.size.y;
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Keyboard = __webpack_require__(118);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _Mouse = __webpack_require__(119);

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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(112);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(54);

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
	    }]);
	    return Keyboard;
	}();

	exports.default = Keyboard;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _wheel = __webpack_require__(120);

	var _wheel2 = _interopRequireDefault(_wheel);

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

	      if (event.name === "mousewheel") {
	        _wheel2.default.addWheelListener(document.body, function (e) {
	          return event.fire.call(root, e);
	        });
	        return void 0;
	      }

	      window.addEventListener(event.name, function (e) {
	        return event.fire.call(root, e);
	      }, false);
	    }
	  }]);
	  return Mouse;
	}();

	exports.default = Mouse;

/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * This module unifies handling of mouse whee event across different browsers
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel
	 * for more details
	 *
	 * Usage:
	 *  var addWheelListener = require('wheel').addWheelListener;
	 *  var removeWheelListener = require('wheel').removeWheelListener;
	 *  addWheelListener(domElement, function (e) {
	 *    // mouse wheel event
	 *  });
	 *  removeWheelListener(domElement, function);
	 */
	// by default we shortcut to 'addEventListener':

	module.exports = addWheelListener;

	// But also expose "advanced" api with unsubscribe:
	module.exports.addWheelListener = addWheelListener;
	module.exports.removeWheelListener = removeWheelListener;

	var prefix = "",
	    _addEventListener,
	    _removeEventListener,
	    onwheel,
	    support;

	detectEventModel(typeof window !== 'undefined' && window, typeof document !== 'undefined' && document);

	function addWheelListener(elem, callback, useCapture) {
	    _addWheelListener(elem, support, callback, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (support == "DOMMouseScroll") {
	        _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
	    }
	};

	function removeWheelListener(elem, callback, useCapture) {
	    _removeWheelListener(elem, support, callback, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (support == "DOMMouseScroll") {
	        _removeWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
	    }
	};

	function _addWheelListener(elem, eventName, callback, useCapture) {
	    // TODO: in theory this anonymous function may result in incorrect
	    // unsubscription in some browsers. But in practice, I don't think we should
	    // worry too much about it (those browsers are on the way out)
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
	            delatZ: 0,
	            preventDefault: function preventDefault() {
	                originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
	            },
	            stopPropagation: function stopPropagation() {
	                if (originalEvent.stopPropagation) originalEvent.stopPropagation();
	            },
	            stopImmediatePropagation: function stopImmediatePropagation() {
	                if (originalEvent.stopImmediatePropagation) originalEvent.stopImmediatePropagation();
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

	function _removeWheelListener(elem, eventName, callback, useCapture) {
	    elem[_removeEventListener](prefix + eventName, callback, useCapture || false);
	}

	function detectEventModel(window, document) {
	    if (window && window.addEventListener) {
	        _addEventListener = "addEventListener";
	        _removeEventListener = "removeEventListener";
	    } else {
	        _addEventListener = "attachEvent";
	        _removeEventListener = "detachEvent";
	        prefix = "on";
	    }

	    if (document) {
	        // detect available wheel event
	        support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	        "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
	    } else {
	            support = "wheel";
	        }
	}

/***/ },
/* 121 */
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

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _MapEntity = __webpack_require__(95);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

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
	         * Instance reference
	         * @type {Object}
	         */
	        this.instance = instance;

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
	         * Copied entity
	         * @type {Object}
	         */
	        this.entityCopy = null;

	        /**
	         * Editing states
	         * @type {Object}
	         */
	        this.STATES = {
	            DRAGGING: false
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

	            entity.STATES.EDITING = true;

	            /** Don't allow dragging of focused entity */
	            if (this.instance.camera.entityFocus !== void 0 && entity.id === this.instance.camera.entityFocus.id) {
	                return void 0;
	            }

	            offset = this.camera.getGameMouseOffset(x, y);

	            entity.x <<= 0;
	            entity.y <<= 0;

	            /** Entity contains last coordinate offset */
	            if (entity.last !== void 0 && entity.last.x !== void 0 && entity.last.y !== void 0) {
	                entity.last.x = entity.x;
	                entity.last.y = entity.y;
	            }

	            entity.x += offset.x - this.drag.x;
	            entity.y += offset.y - this.drag.y + _cfg.Y_DEPTH_HACK;

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

	            if (this.entitySelection !== null) {
	                this.entitySelection.STATES.EDITING = false;
	            }

	            this.entitySelection = null;
	            this.entitySelection = this.getEntityByMouse(x, y);

	            var offset = this.camera.getGameMouseOffset(x, y);

	            this.drag.x = offset.x;
	            this.drag.y = offset.y;
	        }

	        /**
	         * Loose selected entity
	         */

	    }, {
	        key: "looseEntity",
	        value: function looseEntity() {

	            if (this.entitySelection !== null) {
	                this.STATES.DRAGGING = false;
	                this.entitySelection.STATES.EDITING = false;
	                this.entitySelection = null;
	            }
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
	        }

	        /**
	         * Delete selected entity
	         */

	    }, {
	        key: "deleteEntity",
	        value: function deleteEntity() {

	            if (this.entitySelection !== null) {
	                this.instance.removeEntity(this.entitySelection);
	                this.entitySelection = null;
	            }
	        }

	        /**
	         * Cut out selected entity
	         */

	    }, {
	        key: "cutEntity",
	        value: function cutEntity() {

	            if (this.entitySelection !== null) {
	                this.entityCopy = this.entitySelection;
	                this.instance.removeEntity(this.entitySelection);
	                this.entitySelection = null;
	            }
	        }

	        /**
	         * Copy selected entity
	         */

	    }, {
	        key: "copyEntity",
	        value: function copyEntity() {

	            var entity = this.entitySelection;

	            if (entity === null) return void 0;

	            this.entityCopy = entity;
	        }

	        /**
	         * Paste selected entity
	         */

	    }, {
	        key: "pasteEntity",
	        value: function pasteEntity() {

	            var entity = this.entityCopy;

	            if (entity === null) return void 0;

	            var map = this.instance.currentMap;

	            if (entity instanceof _MapEntity2.default === false) return void 0;

	            var tpl = map.objectTemplates[entity.name.toLowerCase()];

	            tpl.x = entity.x;
	            tpl.y = entity.y;
	            tpl.z = entity.z;

	            var pushEntity = map.addEntity(tpl);

	            this.entityCopy = pushEntity;

	            map.entities.push(pushEntity);
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
	                if (_Math2.default.cubicCollision(entity.x << 0, entity.y << 0, entity.width + entity.xMargin - _cfg.DIMENSION, entity.height + entity.yMargin - _cfg.DIMENSION, xx, yy, 1) === true) {
	                    entities.push(entity);
	                }
	            };

	            if (entities.length <= 0) return null;

	            return entities[_Math2.default.get2DClosest(entities, xx, yy)];
	        }
	    }]);
	    return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 122 */
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
	  name: "CTRL+C",
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
	      cfg.EDIT_MODE = false;
	      cfg.FREE_CAMERA = false;
	    }
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
	  name: "V",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "CTRL",
	  fire: function fire() {}
	}, {
	  name: "ESCAPE",
	  fire: function fire() {
	    console.log("Escape", this);
	  }
	}, {
	  name: "X",
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
	    local.jump();
	  }
	}, {
	  name: "←",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.LEFT);
	  }
	}, {
	  name: "→",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.RIGHT);
	  }
	}, {
	  name: "↑",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.UP);
	  }
	}, {
	  name: "↓",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.DOWN);
	  }
	}, {
	  name: "W",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.UP);
	  }
	}, {
	  name: "A",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.LEFT);
	  }
	}, {
	  name: "S",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.DOWN);
	  }
	}, {
	  name: "D",
	  fire: function fire() {
	    var local = this.engine.localEntity;
	    local.move(cfg.RIGHT);
	  }
	}];

	var mouse = exports.mouse = [{
	  name: "mousedown",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (cfg.FREE_CAMERA && e.which !== 1) {
	      this.engine.camera.dragging = true;
	      this.engine.camera.click(e.clientX, e.clientY);
	    }
	    if (cfg.EDIT_MODE && e.which === 1) {
	      this.engine.editor.dragging = true;
	      this.engine.editor.selectEntity(e.clientX, e.clientY);
	    }
	  }
	}, {
	  name: "mouseup",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.dragging = false;
	    }
	    if (cfg.EDIT_MODE && e.which === 1) {
	      this.engine.editor.dragging = false;
	    }
	  }
	}, {
	  name: "mousemove",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (cfg.FREE_CAMERA && this.engine.camera.dragging) {
	      this.engine.camera.move(e.clientX, e.clientY);
	    }
	    if (cfg.EDIT_MODE && this.engine.editor.dragging === true) {
	      this.engine.editor.dragEntity(e.clientX, e.clientY);
	    }
	  }
	}, {
	  name: "contextmenu",
	  fire: function fire(e) {
	    e.preventDefault();
	    if (cfg.EDIT_MODE) {
	      this.engine.editor.editEntity(e.clientX, e.clientY);
	    }
	  }
	}, {
	  name: "mousewheel",
	  fire: function fire(e) {
	    event.preventDefault();
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.click(e.clientX, e.clientY);
	    }
	    this.engine.camera.zoom(e);
	  }
	}];

	var global = exports.global = [{
	  name: "resize",
	  fire: function fire(e) {
	    this.engine.renderer.resize(true);
	  }
	}];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Player = __webpack_require__(124);

	Object.defineProperty(exports, "Player", {
	  enumerable: true,
	  get: function get() {
	    return _Player.Player;
	  }
	});

	var _Monster = __webpack_require__(127);

	Object.defineProperty(exports, "Monster", {
	  enumerable: true,
	  get: function get() {
	    return _Monster.Monster;
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Player = undefined;

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(54);

	var _Entity2 = __webpack_require__(96);

	var _Entity3 = _interopRequireDefault(_Entity2);

	var _movement = __webpack_require__(125);

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
	     * Gravity
	     * @type {Number}
	     */

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Player).call(this, obj));

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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jump = jump;
	exports.jumping = jumping;
	exports.move = move;
	exports.changeFacing = changeFacing;
	exports.halfStep = halfStep;
	exports.bump = bump;
	exports.playStateSound = playStateSound;
	exports.walk = walk;
	exports.startMoving = startMoving;
	exports.stopMoving = stopMoving;

	var _getIterator2 = __webpack_require__(92);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _cfg = __webpack_require__(6);

	var _utils = __webpack_require__(54);

	var _Math = __webpack_require__(52);

	var _Math2 = _interopRequireDefault(_Math);

	var _Audio = __webpack_require__(126);

	var _Audio2 = _interopRequireDefault(_Audio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Jump
	 */
	function jump() {

	  this.refreshState();

	  if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	  this.STATES.JUMPING = true;

	  this.idleTime = 0;
	}

	/**
	 * Jumping
	 */
	function jumping() {

	  this.frame = 3;

	  if (this.z === 0) {
	    this.playStateSound();
	  }

	  this.z += this.gravity;

	  if (this.z < 0) {
	    this.gravity += .1;
	    this.shadow.position.set(-(this.z / 2), this.shadowY - this.z);
	    this.shadow.scale.set(this.z, this.z);
	  } else {
	    this.gravity = _cfg.GRAVITY;
	    this.z = 0;
	    this.resetFrame();
	    this.refreshState();
	    this.shadow.position.set(0, this.shadowY);
	    this.shadow.scale.set(0, 0);
	  }

	  if (this.isLocalPlayer === true) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(game.engine.currentMap.entities), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var entity = _step.value;

	        if (entity.id !== this.id) {
	          entity.jump();
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
	}

	/**
	 * Move player
	 * @param {Number} dir
	 */
	function move(dir) {

	  if (this.STATES.LOCK === true || this.STATES.EDITING === true) return void 0;

	  /** Wait until we finished */
	  if (this.moving === true) return void 0;

	  if (this.STATES.BUMPING === true) return void 0;

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
	    this.frame = (this.frame + 3 + this.getFrameIndex()) % 4;
	  }

	  /** TODO: Avoid settimeout */
	  setTimeout(function () {
	    if (this.moving === false && this.STATES.BUMPING === false && this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	  }.bind(this), 30);

	  /**
	   * Player changed facing while in
	   * bumping state -> skip bumping
	   * and let him move immediately
	   */
	  if (this.STATES.BUMPING === true) {
	    this.stepCount = 0;
	    this.stopAnimation();
	    this.moving = false;
	    this.STATES.BUMPING = false;
	  }
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
	  }
	}

	/**
	 * Play sound
	 */
	function playStateSound() {

	  if (_cfg.BGS !== true) return void 0;

	  var volume = this.isLocalPlayer === true ? _cfg.VOLUME.NETWORK_PLAYER : _cfg.VOLUME.LOCAL_PLAYER;

	  var dist = _utils.Maps[this.map].distance(this, game.engine.localEntity);

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
	    return void 0;
	  }

	  var position = _Math2.default.getTilePosition(x, y, dir);
	  var obstacle = _utils.Maps[this.map].isObstacle(this, dir);

	  if (this.isLocalPlayer === true && _cfg.GOD_MODE === true) {
	    obstacle = false;
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

	  /** Continue moving */
	  if (this.isLocalPlayer === true) {
	    if (this.instance.input.KeyBoard.KEYS[this.facingToKey(_cfg.LEFT)].state === 1) {
	      this.move(_cfg.LEFT);
	    } else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(_cfg.UP)].state === 1) {
	      this.move(_cfg.UP);
	    } else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(_cfg.RIGHT)].state === 1) {
	      this.move(_cfg.RIGHT);
	    } else if (this.instance.input.KeyBoard.KEYS[this.facingToKey(_cfg.DOWN)].state === 1) {
	      this.move(_cfg.DOWN);
	    } else {
	      this.soundSteps = _cfg.DIMENSION;
	    }
	  } else {
	    this.soundSteps = _cfg.DIMENSION;
	  }
	}

/***/ },
/* 126 */
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

	    this.player = new window.Sound();
	    this.sounds = [];
	    this.file = {
	      name: null,
	      volume: 0,
	      x: 0,
	      y: 0
	    };
	    this.player.onloadcomplete = this.onLoadComplete.bind(this);
	  }

	  (0, _createClass3.default)(Audio, [{
	    key: "onLoadComplete",
	    value: function onLoadComplete() {
	      this.sounds.push(this.player.create(this.file.name));
	      var sound = this.sounds[this.sounds.length - 1];
	      this.player.setX(sound, this.file.x * 1e2);
	      this.player.setY(sound, this.file.y * 1e2);
	      this.player.setZ(sound, this.file.volume / 1.25 * 1e2);
	      this.player.play(sound, false);
	    }

	    /**
	     * Play a sound with default settings
	     * @param {String} name
	     */

	  }, {
	    key: "playSoundDefault",
	    value: function playSoundDefault(name) {
	      console.log(name);
	    }

	    /**
	     * Play a sound with custom volume
	     * @param {String} name
	     * @param {Number} vol
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "playSound",
	    value: function playSound(name, vol, x, y) {
	      var path = "assets/audio/" + name + ".ogg";
	      this.file.name = path;
	      this.file.volume = vol;
	      this.file.x = x;
	      this.file.y = y;
	      this.player.load(path);
	    }
	  }]);
	  return Audio;
	}();

	exports.default = Audio = new Audio();

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Monster = undefined;

	var _getPrototypeOf = __webpack_require__(8);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(20);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Entity2 = __webpack_require__(96);

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

/***/ }
/******/ ]);