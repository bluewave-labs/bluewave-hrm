"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegendUtilityClass = getLegendUtilityClass;
exports.legendClasses = void 0;
var _utils = require("@mui/utils");
function getLegendUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiChartsLegend', slot);
}
const legendClasses = exports.legendClasses = (0, _utils.unstable_generateUtilityClasses)('MuiChartsLegend', ['root', 'series', 'mark', 'label', 'column', 'row']);