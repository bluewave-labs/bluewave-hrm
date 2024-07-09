"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultizeColor = defaultizeColor;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
const DEFAULT_COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
function defaultizeColor(series, seriesIndex, colors = DEFAULT_COLORS) {
  if (series.type === 'pie') {
    return (0, _extends2.default)({}, series, {
      data: series.data.map((d, index) => (0, _extends2.default)({
        color: colors[index % colors.length]
      }, d))
    });
  }
  return (0, _extends2.default)({
    color: colors[seriesIndex % colors.length]
  }, series);
}