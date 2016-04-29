import {
  DEFAULT_LANG
} from "../../cfg";

import {
  ajax as $GET
} from "../utils";

/**
 * Language
 * @class Language
 * @export
 */
export default class Language {

  /**
   * @param {Function} resolve
   * @constructor
   */
  constructor(resolve) {

    /**
     * Language packets
     * @type {Object}
     */
    this.packets = {};

    /**
     * String base
     * @type {String}
     */
    this.strBase = "s_";

    /**
     * Active packet ref
     * @type {Object}
     */
    this.activePacket = null;

    /**
     * Default language
     * @type {String}
     */
    this.defaultLanguage = DEFAULT_LANG;

    /**
     * Download default lang packet
     * Download navigators lang packet
     * Auto switch to navigators lang
     */
    this.downloadPacket(this.defaultLanguage, () => {
      this.switch(this.getNavigatorLanguage(), resolve);
    });

  }

  /**
   * Get navigators language
   * @return {String}
   */
  getNavigatorLanguage() {

    let lang = null;

    if (navigator.languages) {
      lang = navigator.languages[0];
    } else if (navigator.userLanguage) {
      lang = navigator.userLanguage;
    } else {
      lang = navigator.language;
    }

    return (lang.split("-")[0]);

  }

  /**
   * Get language dependant string
   * @param  {String} key
   * @return {String}
   */
  get(key) {
    return (
      this.activePacket[key] !== void 0 ? this.activePacket[key] :
      this.packets[this.defaultLanguage][key] !== void 0 ? this.packets[this.defaultLanguage][key] :
      "undefined"
    );
  }

  /**
   * Download language packet
   * @param {String}   name
   * @param {Function} resolve
   */
  downloadPacket(name, resolve) {

    if (this.packets[name] !== void 0) {
      return resolve();
    }

    let path = "assets/i18n/";

    try {
      $GET(`${path + name}.json`).then(
        JSON.parse
      ).then(this::function(data) {
        this.packets[name] = data;
        resolve();
      });
    } catch(e) {
      console.error(`${name} is a invalid language packet!`);
      resolve();
    }

    return void 0;

  }

  /**
   * Switch to another language packet
   * @param {String}   name
   * @param {Function} resolve
   */
  switch(name, resolve) {

    if (this.packets[name] !== void 0) {
      this.activePacket = this.packets[name];
      return (resolve && resolve());
    }

    this.downloadPacket(name, () => {
      this.activePacket = this.packets[name];
      return (resolve && resolve());
    });

    return void 0;

  }

}