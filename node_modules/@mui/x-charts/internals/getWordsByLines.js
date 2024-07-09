"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWordsByLines = getWordsByLines;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _domUtils = require("./domUtils");
function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split('\n').map(subText => (0, _extends2.default)({
    text: subText
  }, needsComputation ? (0, _domUtils.getStringSize)(subText, style) : {
    width: 0,
    height: 0
  }));
}