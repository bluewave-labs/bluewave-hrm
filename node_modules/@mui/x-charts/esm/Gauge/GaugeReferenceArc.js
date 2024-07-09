import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { styled } from '@mui/material/styles';
import { useGaugeState } from './GaugeProvider';
import { jsx as _jsx } from "react/jsx-runtime";
const StyledPath = styled('path', {
  name: 'MuiGauge',
  slot: 'ReferenceArc',
  overridesResolver: (props, styles) => styles.referenceArc
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.divider
}));
export function GaugeReferenceArc(props) {
  const {
    startAngle,
    endAngle,
    outerRadius,
    innerRadius,
    cornerRadius,
    cx,
    cy
  } = useGaugeState();
  return /*#__PURE__*/_jsx(StyledPath, _extends({
    transform: `translate(${cx}, ${cy})`,
    d: d3Arc().cornerRadius(cornerRadius)({
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    })
  }, props));
}