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
   * @param {String} title
   * @param {String} expression
   * @param {*} result
   * @return {Boolean}
   */
  test(title, expression, result) {

    console.log(title);

    let calc1 = this.evaluator.evaluate(this.parser.parse(this.tokenizer.scan(expression)));
    let calc2 = eval(expression);

    if (calc1 !== calc2) {
      console.log(this.parser.parse(this.tokenizer.scan(expression)));
    }

    return (
      calc1 === calc2
    );

  }

  /**
   * Setup
   */
  setup() {

    let failures = 0;

    for (let key of tests.tests) {
      this.test(key.name, key.exp) === false && ++failures;
    };

    if (failures) {
      console.error(`${failures} ${failures === 1 ? "tests" : "test"} failed!`);
    } else {
      console.info("All tests passed successfully!");
    }

  }

}