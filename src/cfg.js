import { supportWGL } from "./Engine/utils";

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
 * @constant
 * @type {String}
 */
export const __dirname = "./src/";

/**
 * Version
 * @constant
 * @type {String}
 */
export const VERSION = "0.0.1";

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
export const MIN_SCALE = 2.0;

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
export const GRAVITY = -.9375;

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
  [200, 60,  100],
  [200, 70,  100],
  [200, 80,  100],
  [200, 85,  100],
  [200, 90,  100],
  [200, 105, 100],
  [200, 120, 100],
  [200, 145, 100],
  [200, 175, 100],
  /** Morning */
  [175, 155, 100],
  [155, 155, 100],
  [145, 145, 100],
  [130, 130, 100],
  /** Day */
  [125, 125, 100],
  [120, 120, 100],
  [120, 120, 100],
  [120, 120, 100],
  [125, 125, 100],
  /** Early night */
  [130, 130, 100],
  [145, 145, 100],
  [175, 145, 100],
  [200, 125, 100],
  [200, 105, 100],
  [200, 85,  100],
  [200, 75,  100]
];