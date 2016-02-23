import {
  uHash
} from "../utils";

/**
 * Keyboard
 * @class Keyboard
 * @export
 */
export default class Keyboard {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

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
    this.hash = uHash();

    /** Keyboard fresh rate */
    this.rate = 60;

    this.init(obj);

    return (this);

  }

  /**
   * Initialise
   * @param {Object} obj
   */
  init(obj) {

    /** Register passed in keys */
    if (
      obj instanceof Object &&
      Object.keys(obj).length > 0
    ) {
      /** Keyboard fresh rate */
      this.rate = obj.rate || 60;
      for (let key in obj) {
        if (
          key.toUpperCase() === key &&
          key !== "rate" &&
          key !== "hash"
        ) {
          this.registerKey(key, obj[key]);
        }
      };
    }

    /** Key loop */
    this.keyLoop = setInterval(this:: function() {
      this.fireKeys();
    }, this.rate);

    this.fireKeys();

    window.addEventListener('keydown', this:: function(e) {
      this.switchKey(this.hash, e.keyCode, 1, e);
    });

    window.addEventListener('keyup', this:: function(e) {
      this.switchKey(this.hash, e.keyCode, 0, e);
    });

  }

  /**
   * Fire a combo
   * @param {Object} combo
   */
  fireCombo(combo, name, state, event) {
    this.COMBOS[name].state = state;
    combo.state = 0;
    for (let key of combo.combo) {
      if (this.COMBOS[key].state !== 1) return void 0;
    };
    combo.state = 1;
  }

  /**
   * Switch fire key
   * @param {Number} hash
   * @param {Number} name
   * @param {Number} state
   * @param {Object} event
   */
  switchKey(hash, name, state, event) {

    const key = String(name);

    if (this.isComboKey(name) === true) {
      let combo = this.COMBOS[name].parent;
      this.COMBOS[key].state = state;
      this.updateKey(combo, state);
      this.fireCombo(combo, name, state, event);
    }

    if (
      this.hash !== hash ||
      this.validKey(key) === false ||
      state > 1 || state < 0
    ) {
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
  updateKey(key, state) {

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
  validKey(name) {

    const key = String(name);

    return (
      this.KEYS[key] instanceof Object &&
      this.KEYS[key].fire instanceof Function &&
      this.KEYS[key].state <= 1 &&
      this.KEYS[key].state >= 0
    );

  }

  /**
   * Validate a key code
   * @param  {String} code
   * @return {Boolean}
   */
  validCode(code) {
    let key = code;
    if (
      (code = this[key] || -1) === -1 ||
      this.KEYS[key] !== void 0
    ) {
      throw new Error(`${key} is a invalid key!`);
      return (false);
    }
    return (true);
  }

  /**
   * Register key combo
   * @param {Object}   obj
   * @param {Function} fire
   * @param {Function} leave
   */
  registerKeyCombo(obj, fire, leave) {

    const key = String(obj.name);

    let combo = key.split("+");

    let codes = [];

    this.COMBOS[key] = {};

    for (let code of combo) {
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
    };

    this.COMBOS[key].combo = codes;
    this.COMBOS[key].fire  = fire;
    this.COMBOS[key].leave = leave;
    this.COMBOS[key].left  = 0;
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
  registerKey(obj, fire, leave) {

    const key = String(obj.name);

    let isCombo = key.split("+").length > 1;

    let code = null;

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
  fireKeys() {

    let key = null;

    for (key in this.KEYS) {
      if (this.validKey(key) === true) {
        if (this.isComboKey(key) === true) {
            let combo = this.COMBOS[key].parent;
            if (
              combo.simultaneous !== false &&
              combo.state === 0
            ) {
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
  isComboKey(key) {
    return (
      this.COMBOS[key] !== void 0 &&
      (this.COMBOS[key] instanceof Object) === true
    );
  }

  /**
   * Fire a single key
   * @param {Number} hash
   * @param {Object} key
   */
  fireKey(hash, key) {

    if (key.state === 1) {
      if (key.fireable === true) {
        key.fire();
        if (key.spam !== void 0) {
          key.fireable = false;
        }
      }
    } else {
      if (
        key.leave !== void 0 &&
        key.state === 0 &&
        key.left === 1
      ) {
        key.leave();
        key.left = 0;
      }
    }

    return void 0;

  }

}