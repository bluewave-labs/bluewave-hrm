"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsVoronoiHandler = require("./ChartsVoronoiHandler");
Object.keys(_ChartsVoronoiHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsVoronoiHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsVoronoiHandler[key];
    }
  });
});