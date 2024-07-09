"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionContext = void 0;
exports.InteractionProvider = InteractionProvider;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InteractionContext = exports.InteractionContext = /*#__PURE__*/React.createContext({
  item: null,
  axis: {
    x: null,
    y: null
  },
  useVoronoiInteraction: false,
  dispatch: () => null
});
if (process.env.NODE_ENV !== 'production') {
  InteractionContext.displayName = 'InteractionContext';
}
const dataReducer = (prevState, action) => {
  switch (action.type) {
    case 'enterItem':
      return (0, _extends2.default)({}, prevState, {
        item: action.data
      });
    case 'exitChart':
      if (prevState.item === null && prevState.axis.x === null && prevState.axis.y === null) {
        return prevState;
      }
      return (0, _extends2.default)({}, prevState, {
        axis: {
          x: null,
          y: null
        },
        item: null
      });
    case 'updateVoronoiUsage':
      return (0, _extends2.default)({}, prevState, {
        useVoronoiInteraction: action.useVoronoiInteraction
      });
    case 'leaveItem':
      if (prevState.item === null || Object.keys(action.data).some(key => action.data[key] !== prevState.item[key])) {
        // The item is already something else
        return prevState;
      }
      return (0, _extends2.default)({}, prevState, {
        item: null
      });
    case 'updateAxis':
      if (action.data.x === prevState.axis.x && action.data.y === prevState.axis.y) {
        return prevState;
      }
      return (0, _extends2.default)({}, prevState, {
        axis: action.data
      });
    default:
      return prevState;
  }
};
function InteractionProvider(props) {
  const {
    children
  } = props;
  const [data, dispatch] = React.useReducer(dataReducer, {
    item: null,
    axis: {
      x: null,
      y: null
    },
    useVoronoiInteraction: false
  });
  const value = React.useMemo(() => (0, _extends2.default)({}, data, {
    dispatch
  }), [data]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InteractionContext.Provider, {
    value: value,
    children: children
  });
}