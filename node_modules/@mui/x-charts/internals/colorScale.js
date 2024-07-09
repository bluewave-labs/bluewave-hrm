"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorScale = getColorScale;
exports.getOrdinalColorScale = getOrdinalColorScale;
exports.getSequentialColorScale = getSequentialColorScale;
var _d3Scale = require("d3-scale");
function getSequentialColorScale(config) {
  if (config.type === 'piecewise') {
    return (0, _d3Scale.scaleThreshold)(config.thresholds, config.colors);
  }
  return (0, _d3Scale.scaleSequential)([config.min ?? 0, config.max ?? 100], config.color);
}
function getOrdinalColorScale(config) {
  if (config.values) {
    return (0, _d3Scale.scaleOrdinal)(config.values, config.colors).unknown(config.unknownColor ?? null);
  }
  return (0, _d3Scale.scaleOrdinal)(config.colors.map((_, index) => index), config.colors).unknown(config.unknownColor ?? null);
}
function getColorScale(config) {
  return config.type === 'ordinal' ? getOrdinalColorScale(config) : getSequentialColorScale(config);
}