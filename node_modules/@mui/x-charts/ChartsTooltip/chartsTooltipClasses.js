"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartsTooltipClasses = void 0;
exports.getChartsTooltipUtilityClass = getChartsTooltipUtilityClass;
var _utils = require("@mui/utils");
function getChartsTooltipUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiChartsTooltip', slot);
}
const chartsTooltipClasses = exports.chartsTooltipClasses = (0, _utils.unstable_generateUtilityClasses)('MuiChartsTooltip', ['root', 'table', 'row', 'cell', 'mark', 'markCell', 'labelCell', 'valueCell']);