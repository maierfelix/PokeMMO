import { DIMENSION } from "../../cfg";

import * as actions from "./actions";

/**
 * Controller
 * @class Controller
 * @export
 */
export default class Controller {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    /**
     * Instance
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Engine ref
     * @type {Object}
     */
    this.engine = this.instance;

    /**
     * Actions ref
     * @type {Object}
     */
    this.actions = actions.actions;

    /**
     * Log array
     * @type {Array}
     */
    this.logs = [];

  }

  /**
   * Execute a action
   * @param {String} name
   * @param {Array}  args
   */
  action(name, args = args || []) {

    let cmd = this.actions[name];
    let rule = this.engine.instance::cmd.rule() === true;

    if (rule === true) {
      cmd.action.bind(this.engine.instance).apply(this, args);
    }

    if (cmd.log !== false) this.log(name, rule);

    return void 0;

  }

  /**
   * Log a action
   * @param {String} name
   */
  log(name, failed) {

    this.logs.push({
      name: name,
      success: failed,
      timestamp: this.instance.renderer.now
    });

  }

}