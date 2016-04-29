import { supportWGL, getLocalHost } from "./Engine/utils";

/**
 * Canvas rendering mode
 * @constant
 * @type {Number}
 */
export const CANVAS = 0;

/**
 * WebGL rendering mode
 * @constant
 * @type {Number}
 */
export const WGL = 1;

/**
 * Game rendering mode
 * @type {Number}
 */
export let RENDER_MODE = -1;

/**
 * Grid width
 * @constant
 * @type {Number}
 */
export const GRID_WIDTH = 1;

/**
 * Local player name
 * @type {String}
 */
export let LOCAL_PLAYER = null;

/**
 * Connection url
 * @constant
 * @type {String}
 */
export const CONNECTION_URL = getLocalHost();

/**
 * Connection port
 * @constant
 * @type {String}
 */
export const CONNECTION_PORT = 449;

/**
 * @constant
 * @type {String}
 */
export const __dirname = "./src/";

/**
 * Version
 * @constant
 * @type {String}
 */
export const VERSION = "0.1.0";

/**
 * WebGL support
 * @constant
 * @type {Boolean}
 */
export const WGL_SUPPORT = supportWGL();

/**
 * Walk by keyboard
 * @constant
 * @type {Boolean}
 */
export const WALK_BY_KEYBOARD = true;

/**
 * Free camera
 * @type {Boolean}
 */
export let FREE_CAMERA = false;

/**
 * Easing camera
 * @type {Boolean}
 */
export let EASING_CAMERA = false;

/**
 * Developer mode
 * @type {Boolean}
 */
export let DEV_MODE = true;

/**
 * Debug mode
 * @type {Boolean}
 */
export let DEBUG_MODE = true;

/**
 * Offline mode
 * @constant
 * @type {Boolean}
 */
export let OFFLINE_MODE = true;

/**
 * Record mode
 * @type {Boolean}
 */
export let RECORD_MODE = true;

/**
 * Edit mode
 * @type {Boolean}
 */
export let EDIT_MODE = true;

/**
 * God mode
 * @type {Boolean}
 */
export let GOD_MODE = false;

/**
 * Debug mode
 * @type {Boolean}
 */
export let MINI_MAP = true;

/**
 * Debug fps
 * @constant
 * @type {Number}
 */
export const DEBUG_FPS = 60;

/**
 * Vertical depth sorting hack
 * @constant
 * @type {Number}
 */
export const Y_DEPTH_HACK = .0001;

/**
 * @constant
 * @type {Number}
 */
export const DIMENSION = 8;

/**
 * PP rounding
 * @constant
 * @type {Number}
 */
export const PIXEL_SCALE = .125;

/**
 * @constant
 * @type {Number}
 */
export const MIN_SCALE = 3.0;

/**
 * @constant
 * @type {Number}
 */
export const MAX_SCALE = 12.5;

/**
 * Display shadows
 * @constant
 * @type {Boolean}
 */
export const DISPLAY_SHADOWS = true;

/**
 * Shadow x scale
 * @constant
 * @type {Number}
 */
export const SHADOW_X = 1.0;

/**
 * Shadow y scale
 * @constant
 * @type {Number}
 */
export const SHADOW_Y = 1.45;

/**
 * Shadow alpha
 * @type {Number}
 */
export let SHADOW_ALPHA = .85;

/**
 * Direction
 * @constant
 * @type {Number}
 */
export const LEFT = 3;

/**
 * Direction
 * @constant
 * @type {Number}
 */
export const UP = 1;

/**
 * Direction
 * @constant
 * @type {Number}
 */
export const RIGHT = 2;

/**
 * Direction
 * @constant
 * @type {Number}
 */
export const DOWN = 0;

/**
 * Gravity
 * @constant
 * @type {Number}
 */
export const GRAVITY = -1;

/**
 * Play bgm
 * @constant
 * @type {Number}
 */
export const BGM = true;

/**
 * Play bgs
 * @constant
 * @type {Number}
 */
export const BGS = true;

/**
 * @constant
 * @type {Object}
 */
export const VOLUME = {
  LOCAL_PLAYER:   100,
  NETWORK_PLAYER: 10,
  MUSIC:          30,
  ENTITY_NOISE:   30
};

/**
 * @constant
 * @type {Object}
 */
export const TYPES = {
  Notification: 0,
  MapEntity:    1,
  Player:       2,
  Ping:         3
};

/**
 * Which browser we
 * are running on
 * @type {Object}
 */
export let BROWSERS = {
  IE:       false,
  iOS:      false,
  Chrome:   false,
  Firefox:  false,
  Vivaldi:  false,
  Electron: false
};

BROWSERS::function() {

  if (typeof window === "undefined") return void 0;

  let isChrome   = !!(navigator.userAgent.match(/Chrome/i));
  let isVivaldi  = !!(navigator.userAgent.match(/Vivaldi/i));
  let isElectron = !!(typeof window !== "undefined" && window.process && window.process.type === "renderer");

  this.IE =       !!(typeof window !== "undefined" && window.ActiveXObject !== void 0);
  this.iOS =      !!(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i));
  this.Firefox =  !!(navigator.userAgent.match(/Firefox/i));

  this.Chrome   = isChrome && !isVivaldi;
  this.Vivaldi  = !this.Chrome;

  this.Electron = !this.Chrome && this.Vivaldi;

}();

/**
 * Default language packet
 * to auto load and use,
 * if no language file for
 * the navigator was found
 * @type {String}
 */
export const DEFAULT_LANG = "en";

/**
 * Is client
 * @type {Boolean}
 */
export let IS_CLIENT = true;

/**
 * @constant
 * @type {Array}
 */
export const ColorPalette = [
  [135, 100, 100],
  [135, 105, 100],
  [140, 110, 100],
  [150, 115, 100],
  [155, 125, 100],
  [150, 135, 100],
  [135, 135, 100],
  [135, 125, 100],
  [130, 125, 100],
  /** Morning */
  [130, 120, 100],
  [135, 120, 100],
  [145, 130, 100],
  [150, 145, 100],
  /** Day */
  [135, 145, 100],
  [145, 150, 100],
  [150, 125, 100],
  [145, 130, 100],
  [135, 130, 100],
  /** Early night */
  [125, 135, 100],
  [135, 130, 100],
  [135, 135, 100],
  [135, 100, 100],
  [135, 105, 100],
  [140, 110, 100],
  [150, 115, 100]
];