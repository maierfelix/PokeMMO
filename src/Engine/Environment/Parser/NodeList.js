/**
 * Numeric node types
 * @type {Object}
 */
export let NODE_TYPES = {
  Program: 1,
  BlockStatement: 2,
  ReturnStatement: 3,
  Literal: 4,
  Identifier: 5,
  IfStatement: 6,
  BinaryExpression: 7,
  AsyncStatement: 8,
  MemberExpression: 9,
  CallExpression: 10,
  AssignmentExpression: 11
};

/**
 * NODE_LIST
 * @class NODE_LIST
 * @export
 */
export default class NODE_LIST {

  constructor() {}

  static get Program() {
    return (
      class Program {
        constructor() {
          this.type = NODE_TYPES.Program;
          this.body = [];
        }
      }
    );
  }

  static get BlockStatement() {
    return (
      class BlockStatement {
        constructor() {
          this.type = NODE_TYPES.BlockStatement;
          this.body = [];
        }
      }
    );
  }

  static get ReturnStatement() {
    return (
      class ReturnStatement {
        constructor() {
          this.type = NODE_TYPES.ReturnStatement;
          this.value = null;
        }
      }
    );
  }

  static get Literal() {
    return (
      class Literal {
        constructor() {
          this.type = NODE_TYPES.Literal;
          this.name  = null;
          this.value = null;
        }
      }
    );
  }

  static get Identifier() {
    return (
      class Identifier {
        constructor() {
          this.type = NODE_TYPES.Identifier;
          this.name = null;
        }
      }
    );
  }

  static get IfStatement() {
    return (
      class IfStatement {
        constructor() {
          this.type = NODE_TYPES.IfStatement;
          this.condition  = null;
          this.consequent = null;
          this.alternate  = null;
        }
      }
    );
  }

  static get BinaryExpression() {
    return (
      class BinaryExpression {
        constructor() {
          this.type = NODE_TYPES.BinaryExpression;
          this.operator = null;
          this.left  = null;
          this.right = null;
        }
      }
    );
  }

  static get AsyncStatement() {
    return (
      class AsyncStatement {
        constructor() {
          this.type = NODE_TYPES.AsyncStatement;
          this.init = null;
        }
      }
    );
  }

  static get MemberExpression() {
    return (
      class MemberExpression {
        constructor() {
          this.type = NODE_TYPES.MemberExpression;
          this.object   = null;
          this.property = null;
        }
      }
    );
  }

  static get CallExpression() {
    return (
      class CallExpression {
        constructor() {
          this.type = NODE_TYPES.CallExpression;
          this.callee = null;
          this.arguments = [];
        }
      }
    );
  }

  static get AssignmentExpression() {
    return (
      class AssignmentExpression {
        constructor() {
          this.type = NODE_TYPES.AssignmentExpression;
          this.operator = null;
          this.left  = null;
          this.right = null;
        }
      }
    );
  }

}