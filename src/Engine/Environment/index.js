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

    console.log(this.FLAGS);

  }

  /**
   * Run a stream
   * @param {Object} local
   * @param {Object} trigger
   * @param {String} stream
   */
  run(local, trigger, stream) {

    this.evaluator.setTriggerScope(local);
    this.evaluator.setGlobalScope(trigger);

    let tokens = this.tokenizer.scan(stream);

    let ast = this.parser.parse(tokens);

    this.evaluator.evaluate(ast, function(result) {
      console.log("Ok!", result);
    });

  }

}