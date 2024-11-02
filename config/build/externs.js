/**
 * @fileoverview Externs for the Island class from 11ty is-lands.
 * 
 * @externs
 */

/**
 * @constructor
 * @extends {HTMLElement}
 */
var Island = function() {};

/**
 * @type {string}
 */
Island.tagName;

/**
 * @type {string}
 */
Island.prefix;

/**
 * @type {Object}
 */
Island.attr;

/**
 * @type {Map}
 */
Island.onceCache;

/**
 * @type {Map}
 */
Island.onReady;

/**
 * @type {Object}
 */
Island.fallback;

/**
 * @constructor
 */
var Conditions = function() {};

/**
 * @type {Object<string, Function>}
 */
Conditions.map;
