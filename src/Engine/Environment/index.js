import * as tokens from "./Tokenizer/tokens";

import Tokenizer from "./Tokenizer/";
import Parser from "./Parser/";
import Evaluator from "./Evaluator/";

/**
 * Environment
 * @class Environment
 * @export
 */
export default class Environment {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    /**
     * Game instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Tokenizer instance
     * @type {Object}
     */
    this.tokenizer = new Tokenizer(tokens.TOKENS, tokens.IGNORE);

    /**
     * Parser instance
     * @type {Object}
     */
    this.parser = new Parser();

    /**
     * Evaluator instance
     * @type {Object}
     */
    this.evaluator = new Evaluator();

    /**
     * Global flags
     * @type {Object}
     */
    this.GLOBAL_FLAG = {};

    /**
     * Map specific flags
     * @type {Object}
     */
    this.MAP_FLAGS = {};

    this.run(null, null, `
      window.a.b = c;
    `);

  }

  /**
   * Run a stream
   * @param {Object} parent
   * @param {Object} entity
   * @param {String} stream
   */
  run(parent, entity, stream) {

    let tokens = this.tokenizer.scan(stream);

    let ast = this.parser.parse(tokens);

    let result = this.evaluator.evaluate(ast);

    console.log(result);

  }

}