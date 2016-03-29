import * as tokens from "./Tokenizer/tokens";

import Tester from "./Tester/";
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
    this.evaluator = new Evaluator(this);

    /**
     * Tester instance
     * @type {Object}
     */
    this.tester = new Tester(
      this.tokenizer,
      this.parser,
      this.evaluator
    );

    this.run(null, null, `
      if (FLAGS.GOT_STARTER_PKMN == 2) {
        FLAGS.GOT_STARTER_PKMN = 1337;
      } {
        FLAGS.GOT_STARTER_PKMN = 99;
      }
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

  }

}