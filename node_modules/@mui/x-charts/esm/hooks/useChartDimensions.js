import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { DEFAULT_MARGINS } from '../constants';
const useChartDimensions = (width, height, margin) => {
  const defaultizedMargin = _extends({}, DEFAULT_MARGINS, margin);
  const drawingArea = React.useMemo(() => ({
    left: defaultizedMargin.left,
    top: defaultizedMargin.top,
    right: defaultizedMargin.right,
    bottom: defaultizedMargin.bottom,
    width: Math.max(0, width - defaultizedMargin.left - defaultizedMargin.right),
    height: Math.max(0, height - defaultizedMargin.top - defaultizedMargin.bottom)
  }), [width, height, defaultizedMargin.top, defaultizedMargin.bottom, defaultizedMargin.left, defaultizedMargin.right]);
  return drawingArea;
};
export default useChartDimensions;