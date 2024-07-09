import { getPercentageValue } from '../internals/utils';
export function getPieCoordinates(series, drawing) {
  const {
    height,
    width
  } = drawing;
  const {
    cx: cxParam,
    cy: cyParam
  } = series;
  const availableRadius = Math.min(width, height) / 2;
  const cx = getPercentageValue(cxParam ?? '50%', width);
  const cy = getPercentageValue(cyParam ?? '50%', height);
  return {
    cx,
    cy,
    availableRadius
  };
}