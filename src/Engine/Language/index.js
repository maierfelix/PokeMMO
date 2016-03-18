/**
 * Lang
 * @class Lang
 * @export
 */
class Lang {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Language packets
     * @type {Object}
     */
    this.packets = {};

    /**
     * Active packet ref
     * @type {Object}
     */
    this.activePacket = null;

  }

  /**
   * Get language dependant string
   * @param  {String} key
   * @return {String}
   */
  get(key) {
    return (
      this.activePacket[key]
    );
  }

  /**
   * Switch to another language packet
   * @param {String}   lang
   * @param {Function} resolve
   */
  switch(lang, resolve) {

  }

}

export let Language = new Lang();