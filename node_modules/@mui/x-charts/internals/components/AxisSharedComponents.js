"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxisRoot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _styles = require("@mui/material/styles");
var _axisClasses = require("../../ChartsAxis/axisClasses");
const AxisRoot = exports.AxisRoot = (0, _styles.styled)('g', {
  name: 'MuiChartsAxis',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  [`& .${_axisClasses.axisClasses.tickLabel}`]: (0, _extends2.default)({}, theme.typography.caption, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${_axisClasses.axisClasses.label}`]: (0, _extends2.default)({}, theme.typography.body1, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${_axisClasses.axisClasses.line}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 1
  },
  [`& .${_axisClasses.axisClasses.tick}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: 'crispEdges'
  }
}));