import { curveCatmullRom, curveLinear, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore } from 'd3-shape';
export default function getCurveFactory(curveType) {
  switch (curveType) {
    case 'catmullRom':
      {
        return curveCatmullRom.alpha(0.5);
      }
    case 'linear':
      {
        return curveLinear;
      }
    case 'monotoneX':
      {
        return curveMonotoneX;
      }
    case 'monotoneY':
      {
        return curveMonotoneY;
      }
    case 'natural':
      {
        return curveNatural;
      }
    case 'step':
      {
        return curveStep;
      }
    case 'stepBefore':
      {
        return curveStepBefore;
      }
    case 'stepAfter':
      {
        return curveStepAfter;
      }
    default:
      return curveMonotoneX;
  }
}