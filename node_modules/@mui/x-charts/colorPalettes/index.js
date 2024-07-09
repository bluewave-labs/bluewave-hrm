"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _colorPalettes = require("./colorPalettes");
Object.keys(_colorPalettes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _colorPalettes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colorPalettes[key];
    }
  });
});