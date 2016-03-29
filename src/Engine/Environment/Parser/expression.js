import NODE_LIST from "./NodeList";

/**
 * Recursive object member parsing
 * Identifier *. *Identifier
 * @return {Object}
 */
export function parseMemberExpression() {

  let ast = null;
  let tmp = null;
  let parent = null;

  ast = this.parseUnary();

  for (;this.accept("PERIOD") === true;) {
    parent = new NODE_LIST.MemberExpression();
    parent.object = ast;
    this.next();
    tmp = this.parseMemberExpression();
    parent.property = tmp;
    ast = parent;
  };

  return (ast);

}

/**
 * Parse call expression
 * @return {Object}
 */
export function parseCallExpression() {

  let ast = null;

  ast = new NODE_LIST.CallExpression();
  ast.callee = this.parseUnary();
  ast.arguments = this.parseArguments();

  return (ast);

}

/**
 * Recursive operator precedence based
 * binary expression parsing
 * @param  {Number} id
 * @return {Object}
 */
export function parseExpression(id) {

  let state = null;
  let ast = null;
  let parent = null;
  let tmp = null;

  state = this.precedence[id];

  ast = state === void 0 ? this.parseUnary() : this.parseExpression(id + 1);

  for (;this.acceptPrecedenceState(state) === true;) {
    parent = new NODE_LIST.BinaryExpression();
    parent.operator = this.node.name;
    parent.left = ast;
    this.next();
    tmp = (state === void 0 ? this.parseUnary() : this.parseExpression(id + 1));
    if (tmp === null) return (null);
    parent.right = tmp;
    ast = parent;
    if (this.accept("SEMICOLON") === true) {
      this.next();
    }
  };

  return (ast);

}

/**
 * Parse unary
 * @return {Object}
 */
export function parseUnary() {

  let ast = null;
  let tmp = null;

  if (this.accept("SUB") === true) {
    ast = new NODE_LIST.BinaryExpression();
    ast.operator = this.node.name;
    tmp = new NODE_LIST.Literal();
    tmp.name = "NUMBER";
    tmp.value = 0;
    ast.right = tmp;
    this.next();
    if ((tmp = this.parseBase()) === null) return (null);
    ast.left = tmp;
  } else {
    if (this.accept("ADD") === true) {
      this.next();
    }
    if (!(ast = this.parseBase())) return (null);
  }

  return (ast);

}

/**
 * Parse base
 * @return {Object}
 */
export function parseBase() {

  let ast = null;

  if (
    this.accept("TRUE")  === true ||
    this.accept("FALSE") === true
  ) {
    ast = new NODE_LIST.Identifier();
    ast.name = this.node.value;
    this.next();
    return (ast);
  }

  if (this.accept("NUMBER") === true) {
    ast = new NODE_LIST.Literal();
    ast.name = this.node.name;
    ast.value = Number(this.node.value);
    this.next();
    return (ast);
  }

  if (this.accept("STRING") === true) {
    ast = new NODE_LIST.Literal();
    ast.name = this.node.name;
    ast.value = this.node.value;
    this.next();
    return (ast);
  }

  if (this.accept("LPAREN") === true) {
    this.next();
    ast = this.parseExpression(0);
    this.next();
    return (ast);
  }

  if (this.accept("IDENTIFIER") === true) {
    ast = new NODE_LIST.Identifier();
    ast.name = this.node.value;
    if (this.tokens[this.index + 1].name === "PERIOD") {
      this.next();
      let exp = this.parseMemberExpression();
      exp.object = ast;
      return (exp);
    }
    this.next();
    return (ast);
  }

  return (ast);

}