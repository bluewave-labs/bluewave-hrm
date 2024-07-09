"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChartsAxisHighlight = require("./ChartsAxisHighlight");
Object.keys(_ChartsAxisHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChartsAxisHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ChartsAxisHighlight[key];
    }
  });
});