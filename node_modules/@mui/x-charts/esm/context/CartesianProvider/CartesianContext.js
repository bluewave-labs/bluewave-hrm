import * as React from 'react';
export const CartesianContext = /*#__PURE__*/React.createContext({
  isInitialized: false,
  data: {
    xAxis: {},
    yAxis: {},
    xAxisIds: [],
    yAxisIds: []
  }
});
if (process.env.NODE_ENV !== 'production') {
  CartesianContext.displayName = 'CartesianContext';
}