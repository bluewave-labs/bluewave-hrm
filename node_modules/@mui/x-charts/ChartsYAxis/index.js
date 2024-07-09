"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsYAxis = require("./ChartsYAxis");
Object.keys(_ChartsYAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsYAxis[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsYAxis[key];
    }
  });
});