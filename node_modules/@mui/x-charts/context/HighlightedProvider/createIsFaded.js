"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIsFaded = void 0;
const createIsFaded = (highlightScope, highlightedItem) => input => {
  if (!highlightScope) {
    return false;
  }
  if (highlightScope.fade === 'series') {
    return input.seriesId === highlightedItem?.seriesId && input.dataIndex !== highlightedItem?.dataIndex;
  }
  if (highlightScope.fade === 'global') {
    return input.seriesId !== highlightedItem?.seriesId || input.dataIndex !== highlightedItem?.dataIndex;
  }
  return false;
};
exports.createIsFaded = createIsFaded;