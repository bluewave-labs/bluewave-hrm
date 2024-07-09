import * as React from 'react';

/**
 * The data of the highlighted item.
 * To highlight an item, you need to provide the series id and the item id.
 * If targeting the whole series, you can omit the item id.
 * To clear the highlight, set the value to an empty object.
 *
 * @example
 * // Highlight the item with the series id 'london' and the item id 0.
 * { seriesId: 'london', dataIndex: 0 }
 *
 * // Highlight the whole series with the series id 'london'.
 * { seriesId: 'london' }
 *
 * // Clear the highlight.
 * {}
 */

export const HighlightedContext = /*#__PURE__*/React.createContext({
  isInitialized: false,
  data: {
    highlightedItem: null,
    setHighlighted: () => {},
    clearHighlighted: () => {},
    isHighlighted: () => false,
    isFaded: () => false
  }
});
if (process.env.NODE_ENV !== 'production') {
  HighlightedContext.displayName = 'HighlightedContext';
}