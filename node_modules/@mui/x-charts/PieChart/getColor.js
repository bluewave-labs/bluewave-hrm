"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColor;
function getColor(series) {
  return dataIndex => {
    return series.data[dataIndex].color;
  };
}