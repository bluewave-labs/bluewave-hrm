"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartsGridClasses = void 0;
exports.getChartsGridUtilityClass = getChartsGridUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getChartsGridUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiChartsGrid', slot);
}
const chartsGridClasses = exports.chartsGridClasses = (0, _generateUtilityClasses.default)('MuiChartsGrid', ['root', 'line', 'horizontalLine', 'verticalLine']);