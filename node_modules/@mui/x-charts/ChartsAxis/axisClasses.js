"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axisClasses = void 0;
exports.getAxisUtilityClass = getAxisUtilityClass;
var _utils = require("@mui/utils");
function getAxisUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiChartsAxis', slot);
}
const axisClasses = exports.axisClasses = (0, _utils.unstable_generateUtilityClasses)('MuiChartsAxis', ['root', 'line', 'tickContainer', 'tick', 'tickLabel', 'label', 'directionX', 'directionY', 'top', 'bottom', 'left', 'right']);