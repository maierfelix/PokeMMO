/**
 * Commander
 * @class Commander
 * @export
 */
export default class Commander {

  /**
   * @constructor
   */
  constructor() {

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
  newCommand(cmd) {
    this.commands[cmd.action] = cmd;
    cmd = null;
  }

  /**
   * Push a command
   * @param {String} action
   * @param {Object} scope
   * @param {Array} data
   */
  push(action, scope, data) {

    let cmd = {
      action: action,
      data:   data,
      scope:  scope
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
  fire(cmd, action) {
    let template = this.commands[cmd.action][action];
    template.bind(cmd.scope).apply(template, cmd.data);
  }

  /**
   * Get cmd from current stack index
   * @return {Object}
   */
  getCurrentCmd() {
    return (this.stack[this.position]);
  }

  /**
   * Undo
   */
  undo() {

    if (this.position >= 0) {
      this.fire(this.getCurrentCmd(), "onUndo");
      this.position--;
    }

  }

  /**
   * Redo
   */
  redo() {

    if (this.position < this.stack.length - 1) {
      this.position++;
      this.fire(this.getCurrentCmd(), "onRedo");
    }

  }

}