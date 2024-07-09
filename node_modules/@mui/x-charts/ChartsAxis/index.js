"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsAxis = require("./ChartsAxis");
Object.keys(_ChartsAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsAxis[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsAxis[key];
    }
  });
});
var _axisClasses = require("./axisClasses");
Object.keys(_axisClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _axisClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _axisClasses[key];
    }
  });
});