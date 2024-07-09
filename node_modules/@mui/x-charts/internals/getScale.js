"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScale = getScale;
var _d3Scale = require("d3-scale");
function getScale(scaleType, domain, range) {
  switch (scaleType) {
    case 'log':
      return (0, _d3Scale.scaleLog)(domain, range);
    case 'pow':
      return (0, _d3Scale.scalePow)(domain, range);
    case 'sqrt':
      return (0, _d3Scale.scaleSqrt)(domain, range);
    case 'time':
      return (0, _d3Scale.scaleTime)(domain, range);
    case 'utc':
      return (0, _d3Scale.scaleUtc)(domain, range);
    default:
      return (0, _d3Scale.scaleLinear)(domain, range);
  }
}