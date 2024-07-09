"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReferenceLineUtilityClass = getReferenceLineUtilityClass;
exports.referenceLineClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getReferenceLineUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiChartsReferenceLine', slot);
}
const referenceLineClasses = exports.referenceLineClasses = (0, _generateUtilityClasses.default)('MuiChartsReferenceLine', ['root', 'vertical', 'horizontal', 'line', 'label']);