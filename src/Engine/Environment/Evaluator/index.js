import NODE_LIST from "../Parser/NodeList";

import { inherit } from "../../utils";

/**
 * Evaluator
 * @class Evaluator
 * @export
 */
export default class Evaluator {

  /**
   * @constructor
   */
  constructor() {

  }

  /**
   * Evaluate an ast
   * @param  {Object} ast
   * @return {*}
   */
  evaluate(ast) {

    let ii = 0;
    let length = ast.body.length;

    for (; ii < length; ++ii) {
      this.evalStatement(ast.body[ii]);
    };

    return void 0;

  }

  /**
   * Eval statement
   * @param {Object} ast
   */
  evalStatement(ast) {

    if (ast.type === "IfStatement") {
      if (ast.condition !== null) {
        /** Condition met */
        if (this.evalBinaryExpression(ast.condition) === true) {
          return (this.evaluate(ast.consequent));
        }
        if (ast.alternate !== null) {
          return (this.evaluate(ast.alternate));
        }
      } else {
        throw new Error("Invalid if statement condition");
      }
      return void 0;
    }

    if (ast.type === "AssignmentExpression") {
      let value = this.evalMemberExpression(ast.left);
      console.log(value);
    }

    return void 0;

  }

  /**
   * Eval member expression
   * @param  {Object} ast
   * @return {*}
   */
  evalMemberExpression(ast) {
    if (ast.property.type === "MemberExpression") {
      return (
        [ast.object.name][this.evalMemberExpression(ast.property)]
      );
    }
    if (
      ast.object.type   === "Literal" &&
      ast.property.type === "Literal"
    ) {
      return (ast);
    }
  }

  /**
   * Is value
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isLiteral(ast) {
    return (
      ast.type === "Literal"
    );
  }

  /**
   * Eval binary expression
   * @param {Object} ast
   * @return {Number}
   */
  evalBinaryExpression(ast) {

    if (this.isLiteral(ast) === true) {
      return (ast.value);
    }

    if (ast.operator === "LT") {
      return (
        this.evalBinaryExpression(ast.left) <
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "SUB") {
      return (
        this.evalBinaryExpression(ast.left) -
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "MUL") {
      return (
        this.evalBinaryExpression(ast.left) *
        this.evalBinaryExpression(ast.right)
      );
    }

    return (0);

  }

}