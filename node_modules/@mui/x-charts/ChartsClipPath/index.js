"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsClipPath = require("./ChartsClipPath");
Object.keys(_ChartsClipPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsClipPath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsClipPath[key];
    }
  });
});