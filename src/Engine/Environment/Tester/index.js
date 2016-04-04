import {
  NODE_LIST, NODE_TYPES
} from "../Parser/NodeList";

import * as tests from "./tests";

import { inherit } from "../../utils";

/**
 * Tester
 * @class Tester
 * @export
 */
export default class Tester {

  /**
   * @constructor
   * @param {Object} tokenizer
   * @param {Object} parser
   * @param {Object} evaluator
   */
  constructor(tokenizer, parser, evaluator) {

    /**
     * Tokenizer instance ref
     * @type {Object}
     */
    this.tokenizer = tokenizer;

    /**
     * Parser instance ref
     * @type {Object}
     */
    this.parser = parser;

    /**
     * Evaluator instance ref
     * @type {Object}
     */
    this.evaluator = evaluator;

    this.setup();

  }

  /**
   * Test
   * @param {Object}   key
   * @param {Function} resolve
   */
  test(key, resolve) {

    let ast = this.parser.parse(this.tokenizer.scan(key.expression));

    this.evaluator.evaluate(ast, this::function(result) {
      if (result !== key.expect) {
        console.log(this.parser.parse(this.tokenizer.scan(key.expression)));
        console.info(`%c ☓ ${key.name} :: ${key.expression} = ${result}`, "color: darkred;");
        resolve(false);
      }
      resolve(true);
    });

    return void 0;

  }

  /**
   * Setup
   */
  setup() {

    let failures = 0;

    for (let type in tests) {
      for (let key of tests[type]) {
        this.test(key, (result) => result === false && ++failures);
      };
      if (failures <= 0) {
        console.info(`%c ✓ ${type}`, "color: darkgreen;");
      }
    };

    if (failures) {
      console.error(`${failures} ${failures > 1 || failures === 0 ? "tests" : "test"} failed!`);
    } else {
      console.info("%cAll tests passed successfully!", "color: green;");
    }

  }

}