"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArcRatios = getArcRatios;
exports.getAvailableRadius = getAvailableRadius;
function deg2rad(angle) {
  return Math.PI * angle / 180;
}
function getPoint(angle) {
  const radAngle = deg2rad(angle);
  return [Math.sin(radAngle), -Math.cos(radAngle)];
}

/**
 * Returns the ratio of the arc bounding box and its center.
 * @param startAngle The start angle (in deg)
 * @param endAngle The end angle (in deg)
 */
function getArcRatios(startAngle, endAngle) {
  // Set the start, end and center point.
  const points = [[0, 0], getPoint(startAngle), getPoint(endAngle)];

  // Add cardinal points included in the arc
  const minAngle = Math.min(startAngle, endAngle);
  const maxAngle = Math.max(startAngle, endAngle);
  const initialAngle = Math.floor(minAngle / 90) * 90;
  for (let step = 1; step <= 4; step += 1) {
    const cardinalAngle = initialAngle + step * 90;
    if (cardinalAngle < maxAngle) {
      points.push(getPoint(cardinalAngle));
    }
  }
  const minX = Math.min(...points.map(([x]) => x));
  const maxX = Math.max(...points.map(([x]) => x));
  const minY = Math.min(...points.map(([, y]) => y));
  const maxY = Math.max(...points.map(([, y]) => y));
  return {
    cx: -minX / (maxX - minX),
    cy: -minY / (maxY - minY),
    minX,
    maxX,
    minY,
    maxY
  };
}
function getAvailableRadius(cx, cy, width, height, {
  minX,
  maxX,
  minY,
  maxY
}) {
  return Math.min(...[{
    ratio: Math.abs(minX),
    space: cx
  }, {
    ratio: Math.abs(maxX),
    space: width - cx
  }, {
    ratio: Math.abs(minY),
    space: cy
  }, {
    ratio: Math.abs(maxY),
    space: height - cy
  }].map(({
    ratio,
    space
  }) => {
    if (ratio < 0.00001) {
      return Infinity;
    }
    return space / ratio;
  }));
}