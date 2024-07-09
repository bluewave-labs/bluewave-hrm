"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCartesianSeries = isCartesianSeries;
exports.isCartesianSeriesType = isCartesianSeriesType;
var _configInit = require("./configInit");
function isCartesianSeriesType(seriesType) {
  return _configInit.cartesianSeriesTypes.getTypes().has(seriesType);
}
function isCartesianSeries(series) {
  return isCartesianSeriesType(series.type);
}