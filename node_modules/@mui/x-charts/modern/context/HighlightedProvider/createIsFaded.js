export const createIsFaded = (highlightScope, highlightedItem) => input => {
  if (!highlightScope) {
    return false;
  }
  if (highlightScope.fade === 'series') {
    return input.seriesId === highlightedItem?.seriesId && input.dataIndex !== highlightedItem?.dataIndex;
  }
  if (highlightScope.fade === 'global') {
    return input.seriesId !== highlightedItem?.seriesId || input.dataIndex !== highlightedItem?.dataIndex;
  }
  return false;
};