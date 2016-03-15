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
          this.type = "Program";
          this.body = [];
        }
      }
    );
  }

  static get BlockStatement() {
    return (
      class BlockStatement {
        constructor() {
          this.type = "BlockStatement";
          this.body = [];
        }
      }
    );
  }

  static get ReturnStatement() {
    return (
      class ReturnStatement {
        constructor() {
          this.type = "ReturnStatement";
          this.value = null;
        }
      }
    );
  }

  static get Literal() {
    return (
      class Literal {
        constructor() {
          this.type = "Literal";
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
          this.type = "Identifier";
          this.name = null;
        }
      }
    );
  }

  static get IfStatement() {
    return (
      class IfStatement {
        constructor() {
          this.type = "IfStatement";
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
          this.type = "BinaryExpression";
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
          this.type = "AsyncStatement";
          this.init = null;
        }
      }
    );
  }

  static get MemberExpression() {
    return (
      class MemberExpression {
        constructor() {
          this.type = "MemberExpression";
          this.left  = null;
          this.right = null;
        }
      }
    );
  }

  static get CallExpression() {
    return (
      class CallExpression {
        constructor() {
          this.type = "CallExpression";
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
          this.type = "AssignmentExpression";
          this.operator = null;
          this.left  = null;
          this.right = null;
        }
      }
    );
  }

}