import NODE_LIST from "./NodeList";

/**
 * Parse a block
 * @return {Object}
 */
export function parseBlock() {

  let ast = null;
  let tmp = null;

  if (this.accept("IF") === true) {
    this.next();
    ast = new NODE_LIST.IfStatement();
    ast.condition = this.parseParentheseExpression();
    ast.consequent = this.parseBraceBody();
    if (this.accept("LBRACE")) {
      ast.alternate = this.parseBraceBody();
    }
    return (ast);
  }

  if (this.accept("RETURN") === true) {
    this.next();
    ast = new NODE_LIST.ReturnStatement();
    ast.value = this.parseParentheseExpression();
    this.next();
    return (ast);
  }

  if (this.accept("ATSIGN") === true) {
    this.next();
    ast = new NODE_LIST.AsyncStatement();
    ast.init = this.parseBlock();
    return (ast);
  }

  if (this.accept("IDENTIFIER") === true) {
    /** Function call */
    if (this.tokens[this.index + 1].name === "LBRACK") {
      ast = this.parseCallExpression();
      this.next();
      return (ast);
    } else {
      ast = new NODE_LIST.AssignmentExpression();
      ast.left = this.parseExpression(0);
      ast.operator = this.node.value;
      this.expect("ASSIGN");
      ast.right = this.parseExpression(0);
      this.next();
      return (ast);
    }
  }

  if (
    this.accept("NUMBER") === true ||
    this.accept("STRING") === true
  ) {
    ast = this.parseExpression(0);
    return (ast);
  }

  return (null);

}

/**
 * Parse brace body
 * { Body }
 * @return {Object}
 */
export function parseBraceBody() {

  let ast = null;

  this.expect("LBRACE");
  ast = this.parseBlockStatement();
  this.expect("RBRACE");

  return (ast);

}

/**
 * Parse block statement
 * @return {Object}
 */
export function parseBlockStatement() {

  let ast = new NODE_LIST.BlockStatement();

  for (;true;) {
    if (this.accept("RBRACE") === true) break;
    ast.body.push(this.parseBlock());
  };

  return (ast);

}

/**
 * Parse arguments
 * [ , ]
 * @return {Array}
 */
export function parseArguments() {

  let ast = null;

  let args = [];

  this.expect("LBRACK");

  args[0] = this.parseBlock();

  for (;this.accept("COMMA") === true;) {
    this.next();
    if (this.accept("LBRACK") === true) {
      this.next();
      args.push(this.parseCallExpression());
    } else {
      args.push(this.parseBlock());
    }
    if (this.accept("RBRACK") === true) {
      this.next();
      break;
    }
  };

  return (args);

}

/**
 * Parse brace body
 * { Body }
 * @return {Object}
 */
export function parseBraceBody() {

  let ast = null;

  this.expect("LBRACE");
  ast = this.parseBlockStatement();
  this.expect("RBRACE");

  return (ast);

}

/**
 * Parse parenthese expression
 * ( Expression )
 */
export function parseParentheseExpression() {

  let ast = null;

  this.expect("LPAREN");
  ast = this.parseExpression(0);
  this.expect("RPAREN");

  return (ast);

}