"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRadius = void 0;
/**
 * Returns if the corner should have a radius or not based on the layout and the data.
 * @param {GetRadiusCorner} corner The corner to check.
 * @param {GetRadiusData} cornerData The data for the corner.
 * @returns {number} The radius for the corner.
 */
const getRadius = (corner, {
  hasNegative,
  hasPositive,
  borderRadius,
  layout
}) => {
  if (!borderRadius) {
    return 0;
  }
  const isVertical = layout === 'vertical';
  if (corner === 'top-left' && (isVertical && hasPositive || !isVertical && hasNegative)) {
    return borderRadius;
  }
  if (corner === 'top-right' && (isVertical && hasPositive || !isVertical && hasPositive)) {
    return borderRadius;
  }
  if (corner === 'bottom-right' && (isVertical && hasNegative || !isVertical && hasPositive)) {
    return borderRadius;
  }
  if (corner === 'bottom-left' && (isVertical && hasNegative || !isVertical && hasNegative)) {
    return borderRadius;
  }
  return 0;
};
exports.getRadius = getRadius;