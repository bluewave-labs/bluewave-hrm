"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useGaugeState: true
};
Object.defineProperty(exports, "useGaugeState", {
  enumerable: true,
  get: function () {
    return _GaugeProvider.useGaugeState;
  }
});
var _Gauge = require("./Gauge");
Object.keys(_Gauge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Gauge[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Gauge[key];
    }
  });
});
var _GaugeContainer = require("./GaugeContainer");
Object.keys(_GaugeContainer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GaugeContainer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GaugeContainer[key];
    }
  });
});
var _GaugeValueText = require("./GaugeValueText");
Object.keys(_GaugeValueText).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GaugeValueText[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GaugeValueText[key];
    }
  });
});
var _GaugeValueArc = require("./GaugeValueArc");
Object.keys(_GaugeValueArc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GaugeValueArc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GaugeValueArc[key];
    }
  });
});
var _GaugeReferenceArc = require("./GaugeReferenceArc");
Object.keys(_GaugeReferenceArc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GaugeReferenceArc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GaugeReferenceArc[key];
    }
  });
});
var _gaugeClasses = require("./gaugeClasses");
Object.keys(_gaugeClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gaugeClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gaugeClasses[key];
    }
  });
});
var _GaugeProvider = require("./GaugeProvider");