/**
 * Tokens to match
 * @type {Object}
 */
export const TOKENS = {
  /** Punctuators */
  "(": "LPAREN",
  ")": "RPAREN",
  "[": "LBRACK",
  "]": "RBRACK",
  "{": "LBRACE",
  "}": "RBRACE",
  ":": "COLON",
  ";": "SEMICOLON",
  ".": "PERIOD",
  "?": "CONDITIONAL",
  "$": "DOLLAR",
  "@": "ATSIGN",
  /** Binary operators */
  ",": "COMMA",
  "|": "OR",
  "&": "AND",
  "+": "ADD",
  "-": "SUB",
  "*": "MUL",
  "/": "DIV",
  "%": "MOD",
  "^": "POW",
  /** Compare operators */
  "<": "LT",
  "<=": "LE",
  ">": "GT",
  ">=": "GE",
  "==": "EQ",
  "!=": "NEQ",
  /** Assignment operators */
  "=": "ASSIGN",
  /** Unary operators */
  "!": "NOT",
  "~": "BIT_NOT",
  /** Literals */
  "null": "NULL",
  "true": "TRUE",
  "false": "FALSE",
  /** Keywords */
  "if": "IF",
  "else": "ELSE",
  "while": "WHILE",
  "do": "DO",
  "for": "FOR",
  "function": "FUNCTION",
  "var": "VAR",
  "const": "CONST",
  "return": "RETURN",
  " ": "BLANK",
  "\t": "TAB",
  "\n": "NL",
  "\r": "X",
  "\f": "X1",
  "\v": "X2"
};

/**
 * Tokens to ignore
 * @type {Array}
 */
export let IGNORE = [
  "BLANK", "TAB", "NL", "X", "X1", "X2"
];