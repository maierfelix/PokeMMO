import NODE_LIST from "./NodeList";

import * as pr from "./precedence";

import * as parse from "./parse";
import * as expression from "./expression";

import { inherit } from "../../utils";

/**
 * Parser
 * @class Parser
 * @export
 */
export default class Parser {

  /**
   * @constructor
   */
  constructor() {

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
      get: function() {
        return (this.tokens[this.index]);
      }
    });

  }

  /**
   * Parse
   * @param {Array} tokens
   * @return {Object}
   */
  parse(tokens) {

    this.tokens = tokens;

    this.index = 0;

    let ast = new NODE_LIST.Program();

    let length = this.tokens.length;

    let block = null;

    for (;;) {
      if (this.index >= length) break;
      if ((block = this.parseBlock()) === null) continue;
      ast.body.push(block);
    };

    return (ast);

  }

  /**
   * Increase token index
   */
  next() {
    this.index++;
  }

  /**
   * Node type acception
   * @param  {String} type
   * @return {Boolean}
   */
  accept(type) {
    if (this.node === void 0) return (false);
    if (this.node.name === type) {
      return (true);
    }
    return (false);
  }

  /**
   * Node type expection
   * @param {String} name
   */
  expect(name) {
    for (;true;) {
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
  acceptPrecedenceState(state) {
    return (
      state !== void 0 &&
      state.indexOf(this.node.name) > -1
    );
  }

}

inherit(Parser, parse);
inherit(Parser, expression);