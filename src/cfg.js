import { supportWGL, getLocalHost } from "./Engine/utils";

/**
 * Is client
 * @type {Boolean}
 */
export let IS_CLIENT = true;

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
 * Connection url
 * @type {String}
 */
export const CONNECTION_URL = getLocalHost();

/**
 * Connection port
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
 * Free camera
 * @type {Boolean}
 */
export let FREE_CAMERA = false;

/**
 * Fix camera
 * @type {Boolean}
 */
export let FIX_CAMERA = false;

/**
 * God mode
 * @constant
 * @type {Boolean}
 */
export let GOD_MODE = false;

/**
 * Debug mode
 * @constant
 * @type {Boolean}
 */
export let DEBUG_MODE = true;

/**
 * Debug fps
 * @constant
 * @type {Number}
 */
export const DEBUG_FPS = 60;

/**
 * Play bgm
 * @constant
 * @type {Number}
 */
export const BGM = false;

/**
 * Play bgs
 * @constant
 * @type {Number}
 */
export const BGS = true;

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
export const MIN_SCALE = 5.0;

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
 * @constant
 * @type {Object}
 */
export const VOLUME = {
  LOCAL_PLAYER:   100,
  NETWORK_PLAYER: 20
};

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