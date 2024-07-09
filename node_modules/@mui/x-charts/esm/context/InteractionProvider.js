import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const InteractionContext = /*#__PURE__*/React.createContext({
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
      return _extends({}, prevState, {
        item: action.data
      });
    case 'exitChart':
      if (prevState.item === null && prevState.axis.x === null && prevState.axis.y === null) {
        return prevState;
      }
      return _extends({}, prevState, {
        axis: {
          x: null,
          y: null
        },
        item: null
      });
    case 'updateVoronoiUsage':
      return _extends({}, prevState, {
        useVoronoiInteraction: action.useVoronoiInteraction
      });
    case 'leaveItem':
      if (prevState.item === null || Object.keys(action.data).some(key => action.data[key] !== prevState.item[key])) {
        // The item is already something else
        return prevState;
      }
      return _extends({}, prevState, {
        item: null
      });
    case 'updateAxis':
      if (action.data.x === prevState.axis.x && action.data.y === prevState.axis.y) {
        return prevState;
      }
      return _extends({}, prevState, {
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
  const value = React.useMemo(() => _extends({}, data, {
    dispatch
  }), [data]);
  return /*#__PURE__*/_jsx(InteractionContext.Provider, {
    value: value,
    children: children
  });
}
export { InteractionProvider };