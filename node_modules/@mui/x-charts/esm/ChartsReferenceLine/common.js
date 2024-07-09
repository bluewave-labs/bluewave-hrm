import _extends from "@babel/runtime/helpers/esm/extends";
import { styled } from '@mui/material/styles';
import { referenceLineClasses } from './chartsReferenceLineClasses';
export const ReferenceLineRoot = styled('g')(({
  theme
}) => ({
  [`& .${referenceLineClasses.line}`]: {
    fill: 'none',
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 1,
    pointerEvents: 'none'
  },
  [`& .${referenceLineClasses.label}`]: _extends({
    fill: (theme.vars || theme).palette.text.primary,
    stroke: 'none',
    pointerEvents: 'none',
    fontSize: 12
  }, theme.typography.body1)
}));