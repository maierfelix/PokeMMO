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
      FLAGS: this.instance.FLAGS,

      /**
       * Dynamic global scope ref
       * @type {Object}
       */
      this: null,

      /**
       * Dynamic trigger scope ref
       * @type {Object}
       */
      trigger: null,

      console: window.console,

      alert: window.alert

    };

  }

  /**
   * Set global scope
   * @param {Object} scope
   */
  setGlobalScope(scope) {
    this.context["this"] = scope;
  }

  /**
   * Set trigger scope
   * @param {Object} scope
   */
  setTriggerScope(scope) {
    this.context["trigger"] = scope;
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
   * Is call expression
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isCallExpression(ast) {
    return (
      ast.type === NODE_TYPES.CallExpression
    );
  }

  /**
   * Is asynchronous statement
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isAsyncStatement(ast) {
    return (
      ast.type === NODE_TYPES.AsyncStatement
    );
  }

  /**
   * Is binary expression
   * @param  {Object}  ast
   * @return {Boolean}
   */
  isBinaryExpression(ast) {
    return (
      ast.type === NODE_TYPES.BinaryExpression ||
      ast.type === NODE_TYPES.UnaryExpression ||
      this.isLiteral(ast) === true ||
      this.isIdentifier(ast) === true ||
      this.isMemberExpression(ast) === true
    );
  }

  /**
   * Evaluate an ast
   * @param  {Object} ast
   * @return {*}
   */
  evaluate(ast, resolve) {
    this.evaluateBody(
      ast, 0,
      (result) => resolve(result)
    );
  }

  /**
   * Evaluate an ast body
   * @param  {Object}   ast
   * @param  {Number}   index
   * @param  {Function} resolve
   * @return {*}
   */
  evaluateBody(ast, index, resolve) {

    this.evalStatement(ast.body[index], this::function(result) {
      if (++index < ast.body.length) {
        this.evaluateBody(ast, index, (result) => resolve(result));
      } else {
        resolve(result);
      }
    });

    return void 0;

  }

  /**
   * Eval statement
   * @param {Object} ast
   */
  evalStatement(ast, resolve) {

    if (this.isBinaryExpression(ast) === true) {
      return resolve(
        this.evalBinaryExpression(ast)
      );
    }

    if (this.isIfStatement(ast) === true) {
      if (ast.condition !== null) {
        /** Condition met */
        if (this.evalExpression(ast.condition).value === true) {
          return this.evaluateBody(ast.consequent, 0, (result) => resolve(result));
        }
        if (ast.alternate !== null) {
          return this.evaluateBody(ast.alternate, 0, (result) => resolve(result));
        }
      } else {
        throw new Error("Invalid if statement condition");
      }
      return resolve();
    }

    if (this.isAssignmentExpression(ast) === true) {
      return resolve(this.evalAssignExpression(ast));
    }

    if (this.isCallExpression(ast) === true) {
      this.evalCallExpression(ast);
      return resolve();
    }

    if (this.isAsyncStatement(ast) === true) {
      return this.evalCallExpression(ast.init, (result) => resolve(result));
    }

    return resolve();

  }

  /**
   * Eval assignment expression
   * Assignments auto return its result
   * @param {Object} ast
   * @return {*}
   */
  evalAssignExpression(ast) {

    let result = null;

    let left = this.evalExpression(ast.left);
    let right = this.evalExpression(ast.right);

    result = right.link !== void 0 ? right.link[right.property] : right.value;

    if (ast.operator === "ASSIGN") {
      return (left.link[left.property] = result);
    }

    if (ast.operator === "ADDSET") {
      return (left.link[left.property] += result);
    }

    if (ast.operator === "SUBSET") {
      return (left.link[left.property] -= result);
    }

    if (ast.operator === "MULSET") {
      return (left.link[left.property] *= result);
    }

    if (ast.operator === "DIVSET") {
      return (left.link[left.property] /= result);
    }

    if (ast.operator === "MODSET") {
      return (left.link[left.property] %= result);
    }

    return (0);

  }

  /**
   * Eval call expression
   * @param {Object} ast
   */
  evalCallExpression(ast, resolve) {

    let callee = this.evalExpression(ast.callee);
    let cmd = null;

    if (callee.link === void 0) {
      cmd = this.context[ast.callee.name];
    } else {
      cmd = callee.link[callee.property];
    }

    this.evalArguments(ast.arguments, function(args) {

      if (args.length >= 1) {
        cmd.apply(callee.link, args);
      } else {
        cmd.bind(callee.link)((result) => resolve(result));
      }

    });

    return void 0;

  }

  /**
   * Eval arguments
   * @param  {Array} args
   * @param  {Function} resolve
   * @return {Array}
   */
  evalArguments(args, resolve) {

    let eArgs = [];

    let ii = 0;
    let length = args.length;

    let index = 0;

    if (length >= 1) {
      for (; ii < length; ++ii) {
        this.evalStatement(args[ii], function(result) {
          index++;
          eArgs.push(result);
          if (index >= length) {
            return resolve(eArgs);
          }
        });
      };
    } else {
      return resolve(eArgs);
    }

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

    if (ast.operator === "MOD") {
      return (
        this.evalBinaryExpression(ast.left) %
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "AND") {
      return (
        this.evalBinaryExpression(ast.left) &&
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "OR") {
      return (
        this.evalBinaryExpression(ast.left) ||
        this.evalBinaryExpression(ast.right)
      );
    }

    if (ast.operator === "NOT") {
      return (!this.evalBinaryExpression(ast.init));
    }

    return (0);

  }

}