"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStackingGroups = exports.StackOrder = exports.StackOffset = void 0;
var _d3Shape = require("d3-shape");
const StackOrder = exports.StackOrder = {
  /**
   * Series order such that the earliest series (according to the maximum value) is at the bottom.
   * */
  appearance: _d3Shape.stackOrderAppearance,
  /**
   *  Series order such that the smallest series (according to the sum of values) is at the bottom.
   * */
  ascending: _d3Shape.stackOrderAscending,
  /**
   * Series order such that the largest series (according to the sum of values) is at the bottom.
   */
  descending: _d3Shape.stackOrderDescending,
  /**
   * Series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
   */
  insideOut: _d3Shape.stackOrderInsideOut,
  /**
   * Given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
   */
  none: _d3Shape.stackOrderNone,
  /**
   * Reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
   */
  reverse: _d3Shape.stackOrderReverse
};
const StackOffset = exports.StackOffset = {
  /**
   * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
   * */
  expand: _d3Shape.stackOffsetExpand,
  /**
   * Positive values are stacked above zero, negative values are stacked below zero, and zero values are stacked at zero.
   * */
  diverging: _d3Shape.stackOffsetDiverging,
  /**
   * Applies a zero baseline.
   * */
  none: _d3Shape.stackOffsetNone,
  /**
   * Shifts the baseline down such that the center of the streamgraph is always at zero.
   * */
  silhouette: _d3Shape.stackOffsetSilhouette,
  /**
   * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order. See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
   * */
  wiggle: _d3Shape.stackOffsetWiggle
};

/**
 * Takes a set of series and groups their ids
 * @param series the object of all bars series
 * @returns an array of groups, including the ids, the stacking order, and the stacking offset.
 */
const getStackingGroups = params => {
  const {
    series,
    seriesOrder,
    defaultStrategy
  } = params;
  const stackingGroups = [];
  const stackIndex = {};
  seriesOrder.forEach(id => {
    const {
      stack,
      stackOrder,
      stackOffset
    } = series[id];
    if (stack === undefined) {
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder.none,
        stackingOffset: StackOffset.none
      });
    } else if (stackIndex[stack] === undefined) {
      stackIndex[stack] = stackingGroups.length;
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder[stackOrder ?? defaultStrategy?.stackOrder ?? 'none'],
        stackingOffset: StackOffset[stackOffset ?? defaultStrategy?.stackOffset ?? 'diverging']
      });
    } else {
      stackingGroups[stackIndex[stack]].ids.push(id);
      if (stackOrder !== undefined) {
        stackingGroups[stackIndex[stack]].stackingOrder = StackOrder[stackOrder];
      }
      if (stackOffset !== undefined) {
        stackingGroups[stackIndex[stack]].stackingOffset = StackOffset[stackOffset];
      }
    }
  });
  return stackingGroups;
};
exports.getStackingGroups = getStackingGroups;