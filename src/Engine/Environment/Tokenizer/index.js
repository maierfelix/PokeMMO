/**
 * Tokenizer
 * @class Tokenizer
 * @export
 */
export default class Tokenizer {

  /**
   * @constructor
   * @param {Object} tokens
   * @param {Array}  ignore
   */
  constructor(tokens, ignore) {

    /**
     * Operand lookup map
     * @type {Object}
     */
    this.TOKEN_LIST = tokens || {};

    /**
     * Ignore token list
     * @type {Array}
     */
    this.IGNORE_LIST = ignore || [];

    /**
     * Stream buffer
     * @type {String}
     */
    this.buffer = null;

    /**
     * Stream index
     * @type {Number}
     */
    this.index = 0;

  }

  /**
   * Is digit
   * @param {Number} c
   */
  isDigit(c) {
    return (
      c >= 48 && c <= 57
    );
  }

  /**
   * Is alpha
   * @param {Number} c
   */
  isAlpha(c) {
    return (
      c > 64 && c < 91 ||
      c > 96 && c < 123
    );
  }

  /**
   * Is alpha digit
   * @param {Number} c
   */
  isAlphaDigit(c) {
    return (
      c > 47 && c < 58  ||
      c > 64 && c < 91  ||
      c > 96 && c < 123 ||
      c === 95
    );
  }

  /**
   * Token validation
   * @param  {Object}  token
   * @return {Boolean}
   */
  isValidToken(token) {
    return (
      token.name !== void 0 &&
      this.IGNORE_LIST.indexOf(token.name) <= -1
    );
  }

  /**
   * Token name validation
   * @param  {String}  name
   * @return {Boolean}
   */
  isIgnoredName(name) {
    return (
      this.IGNORE_LIST.indexOf(name) <= -1
    );
  }

  /**
   * Creates number token
   */
  readNumber() {

    let end = this.index + 1;

    let c = null;

    for (; end < this.length; ++end) {
      c = this.buffer.charAt(end).charCodeAt(0);
      /** Also check for floating numbers */
      if (c !== 46 && this.isDigit(c) === false) break;
    };

    let value = this.buffer.slice(this.index, end);

    this.index = end;

    return ({
      name: "NUMBER",
      value: value
    });

  }

  /**
   * Creates identifier or keyword token
   */
  readIdentifier() {

    let end = this.index + 1;

    for (; end < this.length && this.isAlphaDigit(this.buffer.charAt(end).charCodeAt(0)) === true; ++end) {};

    let value = this.buffer.slice(this.index, end);

    this.index = end;

    /** Keyword */
    if (this.TOKEN_LIST[value] !== void 0) {
      return ({
        name: this.TOKEN_LIST[value],
        value: value
      });
    /** Identifier */
    } else {
      return ({
        name: "IDENTIFIER",
        value: value
      });
    }

  }

  /**
   * Creates string token
   */
  readString() {

    let end = this.buffer.indexOf("'", this.index + 1);

    if (end === -1) {
      end = this.buffer.indexOf('"', this.index + 1);
      if (end === -1) throw new Error(`Unexpected quote at ${ this.index }!`);
    }

    let token = {
      name: "STRING",
      value: this.buffer.slice(this.index, end + 1)
    };

    this.index = end + 1;

    return (token);

  }

  /**
   * Read sign
   * @return {Object}
   */
  readSign() {

    let c = null;

    let name = null;

    let value = "";

    for (;;) {
      c = this.buffer.charAt(this.index);
      value += c;
      if (this.TOKEN_LIST[value] === void 0) break;
      name = this.TOKEN_LIST[value];
      if (this.index > this.length) break;
      this.index++;
    };

    return ({
      name: name,
      value: value
    });

  }

  /**
   * Lexical analysis
   * @param {String} stream
   */
  scan(stream) {

    this.index  = 0;
    this.vIndex = 0;
    this.buffer = stream;
    this.length = this.buffer.length;

    let c       = null;
    let op      = null;
    let cCode   = 0;
    let token   = null;

    let tokens = [];

    for (;;) {

      if (!(c = this.buffer.charAt(this.index)) || this.index >= this.length) break;

      cCode = c.charCodeAt(0);

      if ((op = this.TOKEN_LIST[c]) !== void 0) {
        token = this.readSign();
        if (this.isValidToken(token)) {
          tokens.push(token);
        }
      }
      if (this.isAlpha(cCode) === true) {
        token = this.readIdentifier();
        if (this.isValidToken(token)) tokens.push(token);
      }
      if (this.isDigit(cCode) === true) {
        token = this.readNumber();
        if (this.isValidToken(token)) tokens.push(token);
      }
      if (cCode === 34 || cCode === 39) {
        token = this.readString();
        if (this.isValidToken(token)) tokens.push(token);
      }

    };

    return (tokens);

  }

}