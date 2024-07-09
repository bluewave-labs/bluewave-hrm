"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedPath = void 0;
var React = _interopRequireWildcard(require("react"));
var _d3Interpolate = require("d3-interpolate");
var _web = require("@react-spring/web");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function usePrevious(value) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Taken from Nivo
const useAnimatedPath = (path, skipAnimation) => {
  const previousPath = usePrevious(path);
  const interpolator = React.useMemo(() => previousPath ? (0, _d3Interpolate.interpolateString)(previousPath, path) : () => path, [previousPath, path]);
  const {
    value
  } = (0, _web.useSpring)({
    from: {
      value: 0
    },
    to: {
      value: 1
    },
    reset: true,
    immediate: skipAnimation
  });
  return (0, _web.to)([value], interpolator);
};
exports.useAnimatedPath = useAnimatedPath;