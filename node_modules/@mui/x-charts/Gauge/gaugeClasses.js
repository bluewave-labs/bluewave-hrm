"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gaugeClasses = exports.default = void 0;
exports.getGaugeUtilityClass = getGaugeUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getGaugeUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiGauge', slot);
}
const gaugeClasses = exports.gaugeClasses = (0, _generateUtilityClasses.default)('MuiGauge', ['root', 'valueArc', 'referenceArc', 'valueText']);
var _default = exports.default = gaugeClasses;