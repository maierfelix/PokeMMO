import {
  NODE_LIST, NODE_TYPES
} from "../Parser/NodeList";

import { inherit } from "../../utils";

/**
 * Evaluator
 * @class Evaluator
 * @export
 */
export default class Evaluator {

  /**
   * @constructor
   * @param {Object} instance
   */
  constructor(instance) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Context object
     * @type {Object}
     */
    this.context = {

      /**
       * Flags ref
       * @type {Object}
       */
      FLAGS: this.instance.FLAGS

    };

  }

  /**
   * Is value
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isLiteral(ast) {
    return (
      ast.type === NODE_TYPES.Literal
    );
  }

  /**
   * Is identifier
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isIdentifier(ast) {
    return (
      ast.type === NODE_TYPES.Identifier
    );
  }

  /**
   * Is boolean
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isBoolean(ast) {
    return (
      ast.name === "true" ||
      ast.name === "false"
    );
  }

  /**
   * Is if statement
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isIfStatement(ast) {
    return (
      ast.type === NODE_TYPES.IfStatement
    );
  }

  /**
   * Is assignment expression
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isAssignmentExpression(ast) {
    return (
      ast.type === NODE_TYPES.AssignmentExpression
    );
  }

  /**
   * Is member expression
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isMemberExpression(ast) {
    return (
      ast.type === NODE_TYPES.MemberExpression
    );
  }

  /**
   * Is binary expression
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isBinaryExpression(ast) {
    return (
      ast.type === NODE_TYPES.BinaryExpression
    );
  }

  /**
   * Evaluate an ast
   * @param  {Object} ast
   * @return {*}
   */
  evaluate(ast) {
    return (
      this.evaluateBody(ast)
    );
  }

  /**
   * Evaluate an ast body
   * @param  {Object} ast
   * @return {*}
   */
  evaluateBody(ast) {

    let ii = 0;
    let length = ast.body.length;

    let result = null;

    for (; ii < length; ++ii) {
      result = this.evalStatement(ast.body[ii]);
    };

    return (result);

  }

  /**
   * Eval statement
   * @param {Object} ast
   */
  evalStatement(ast) {

    if (this.isBinaryExpression(ast) === true) {
      return (
        this.evalBinaryExpression(ast)
      );
    }

    if (this.isIfStatement(ast) === true) {
      if (ast.condition !== null) {
        /** Condition met */
        if (this.evalExpression(ast.condition).value === true) {
          return (this.evaluateBody(ast.consequent));
        }
        if (ast.alternate !== null) {
          return (this.evaluateBody(ast.alternate));
        }
      } else {
        throw new Error("Invalid if statement condition");
      }
      return void 0;
    }

    if (this.isAssignmentExpression(ast) === true) {
      let parent = this.evalExpression(ast.left);
      let result = this.evalExpression(ast.right);
      if (result.link !== void 0) {
        parent.link[parent.property] = result.link[result.property];
      } else {
        parent.link[parent.property] = result.value;
      }
    }

    return void 0;

  }

  /**
   * Eval binary expression
   * @param {Object} ast
   * @return {Object}
   */
  evalExpression(ast) {

    if (this.isMemberExpression(ast) === true) {
      return (
        this.evalMemberExpression(this.context, ast)
      );
    }

    return ({
      value: this.evalBinaryExpression(ast)
    });

  }

  /**
   * Eval member expression
   * @param  {Object} root
   * @param  {Object} ast
   * @return {Object}
   */
  evalMemberExpression(root, ast) {

    let link = null;

    if (this.isLiteral(ast) === true) {
      return ({
        value: this.evalBinaryExpression(ast)
      });
    }
    if (this.isIdentifier(ast) === true) {
      return (
        root[ast.name]
      );
    }

    if (this.isIdentifier(ast.object) === true) {
      link = root = root[ast.object.name];
    }

    if (root === void 0) {
      throw new Error(`${ast.object.name} => ${ast.property.name} does not exist!`);
    }

    if (this.isIdentifier(ast.property) === true) {
      root = root[ast.property.name];
    }

    if (this.isMemberExpression(ast.property) === true) {
      return (
        this.evalMemberExpression(link, ast.property)
      );
    }

    return ({
      link: link,
      property: ast.property.name
    });

  }

  /**
   * Eval binary expression
   * @param {Object} ast
   * @return {*}
   */
  evalBinaryExpression(ast) {

    if (this.isLiteral(ast) === true) {
      return (ast.value);
    }

    if (this.isIdentifier(ast) === true) {
      if (this.isBoolean(ast) === true) {
        return (ast.name === "true");
      }
    }

    if (this.isMemberExpression(ast) === true) {
      let exp = this.evalMemberExpression(this.context, ast);
      return (exp.link[exp.property]);
    }

    if (ast.operator === "EQ") {
      return (
        this.evalBinaryExpression(ast.left) ===
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "NEQ") {
      return (
        this.evalBinaryExpression(ast.left) !==
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "LT") {
      return (
        this.evalBinaryExpression(ast.left) <
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "LE") {
      return (
        this.evalBinaryExpression(ast.left) <=
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "GT") {
      return (
        this.evalBinaryExpression(ast.left) >
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "GE") {
      return (
        this.evalBinaryExpression(ast.left) >=
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "ADD") {
      return (
        this.evalBinaryExpression(ast.left) +
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

    if (ast.operator === "DIV") {
      return (
        this.evalBinaryExpression(ast.left) /
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "%") {
      return (
        this.evalBinaryExpression(ast.left) %
        this.evalBinaryExpression(ast.right)
      );
    }

    return (0);

  }

}