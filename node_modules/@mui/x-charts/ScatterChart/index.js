"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ScatterChart = require("./ScatterChart");
Object.keys(_ScatterChart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ScatterChart[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ScatterChart[key];
    }
  });
});
var _ScatterPlot = require("./ScatterPlot");
Object.keys(_ScatterPlot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ScatterPlot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ScatterPlot[key];
    }
  });
});
var _Scatter = require("./Scatter");
Object.keys(_Scatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Scatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Scatter[key];
    }
  });
});