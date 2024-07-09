"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsAxesGradients = require("./ChartsAxesGradients");
Object.keys(_ChartsAxesGradients).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsAxesGradients[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsAxesGradients[key];
    }
  });
});