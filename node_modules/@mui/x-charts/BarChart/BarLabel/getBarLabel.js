"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBarLabel = void 0;
const getBarLabel = options => {
  const {
    barLabel,
    value,
    dataIndex,
    seriesId,
    height,
    width
  } = options;
  if (barLabel === 'value') {
    // We don't want to show the label if the value is 0
    return value ? value?.toString() : null;
  }
  return barLabel({
    seriesId,
    dataIndex,
    value
  }, {
    bar: {
      height,
      width
    }
  });
};
exports.getBarLabel = getBarLabel;