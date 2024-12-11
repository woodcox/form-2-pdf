/**
 * @fileoverview Externs for defining vars for google closure compiler.
 * 
 * @externs
 */

/** @type {string} */
var entityName;

/** @type {*} */
var val;

/** @type {*} */
var _$HY;

/** @type {boolean} */
var isDev;

/** @type {boolean} */
var isServer;

/** @type {Storage} */
var localStorage;

/** @type {*} */
var UZIP;

// Pdfme has a dependency on fontkit (via pdfkit). There is a duplicate key in the code. Pull request done - https://github.com/foliojs/fontkit/pull/355

// Defining the structure externally to prevent warnings until issue resolved
var ConditionTable = {
  1: {
    axisIndex: 0, // Placeholder, no effect
    filterRangeMinValue: 0,
    filterRangeMaxValue: 0
  }
};