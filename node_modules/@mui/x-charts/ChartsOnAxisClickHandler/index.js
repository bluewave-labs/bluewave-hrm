"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsOnAxisClickHandler = require("./ChartsOnAxisClickHandler");
Object.keys(_ChartsOnAxisClickHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsOnAxisClickHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsOnAxisClickHandler[key];
    }
  });
});