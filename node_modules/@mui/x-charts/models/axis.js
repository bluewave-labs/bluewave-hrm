"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBandScaleConfig = isBandScaleConfig;
exports.isPointScaleConfig = isPointScaleConfig;
function isBandScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === 'band';
}
function isPointScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === 'point';
}