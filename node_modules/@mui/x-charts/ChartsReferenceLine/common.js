"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceLineRoot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _styles = require("@mui/material/styles");
var _chartsReferenceLineClasses = require("./chartsReferenceLineClasses");
const ReferenceLineRoot = exports.ReferenceLineRoot = (0, _styles.styled)('g')(({
  theme
}) => ({
  [`& .${_chartsReferenceLineClasses.referenceLineClasses.line}`]: {
    fill: 'none',
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 1,
    pointerEvents: 'none'
  },
  [`& .${_chartsReferenceLineClasses.referenceLineClasses.label}`]: (0, _extends2.default)({
    fill: (theme.vars || theme).palette.text.primary,
    stroke: 'none',
    pointerEvents: 'none',
    fontSize: 12
  }, theme.typography.body1)
}));