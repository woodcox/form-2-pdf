/**
 * @fileoverview Externs for the Island class from 11ty is-lands.
 * 
 * @externs
 */

/**
 * @constructor
 * @extends {HTMLElement}
 */
class Island extends HTMLElement {
  /**
   * @type {string}
   */
  static tagName;

  /**
   * @type {string}
   */
  static prefix;

  /**
   * @type {Object}
   */
  static attr;

  /**
   * @type {Map}
   */
  static onceCache;

  /**
   * @type {Map}
   */
  static onReady;

  /**
   * @type {Object}
   */
  static fallback;
}

/**
 * @constructor
 */
class Conditions {
  /**
   * @type {Object}
   */
  static map;
}
