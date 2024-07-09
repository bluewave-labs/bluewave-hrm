"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  isDefaultizedBarSeries: true,
  isBarSeries: true
};
exports.isBarSeries = isBarSeries;
exports.isDefaultizedBarSeries = isDefaultizedBarSeries;
var _line = require("./line");
Object.keys(_line).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _line[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _line[key];
    }
  });
});
var _bar = require("./bar");
Object.keys(_bar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bar[key];
    }
  });
});
var _scatter = require("./scatter");
Object.keys(_scatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scatter[key];
    }
  });
});
var _pie = require("./pie");
Object.keys(_pie).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pie[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pie[key];
    }
  });
});
// Series definition

// item identifier

// Helpers

function isDefaultizedBarSeries(series) {
  return series.type === 'bar';
}
function isBarSeries(series) {
  return series.type === 'bar';
}