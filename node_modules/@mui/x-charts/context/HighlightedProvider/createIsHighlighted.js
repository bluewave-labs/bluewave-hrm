"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIsHighlighted = void 0;
const createIsHighlighted = (highlightScope, highlightedItem) => input => {
  if (!highlightScope) {
    return false;
  }
  if (highlightScope.highlight === 'series') {
    return input.seriesId === highlightedItem?.seriesId;
  }
  if (highlightScope.highlight === 'item') {
    return input.dataIndex === highlightedItem?.dataIndex && input.seriesId === highlightedItem?.seriesId;
  }
  return false;
};
exports.createIsHighlighted = createIsHighlighted;