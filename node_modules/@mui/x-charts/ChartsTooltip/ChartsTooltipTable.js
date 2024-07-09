"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsTooltipTable = exports.ChartsTooltipRow = exports.ChartsTooltipPaper = exports.ChartsTooltipMark = exports.ChartsTooltipCell = void 0;
var _styles = require("@mui/material/styles");
var _system = require("@mui/system");
var _chartsTooltipClasses = require("./chartsTooltipClasses");
const ChartsTooltipPaper = exports.ChartsTooltipPaper = (0, _styles.styled)('div', {
  name: 'MuiChartsTooltip',
  slot: 'Container'
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  transition: theme.transitions.create('box-shadow'),
  borderRadius: theme.shape.borderRadius
}));
const ChartsTooltipTable = exports.ChartsTooltipTable = (0, _styles.styled)('table', {
  name: 'MuiChartsTooltip',
  slot: 'Table'
})(({
  theme
}) => ({
  borderSpacing: 0,
  '& thead td': {
    borderBottom: `solid ${(theme.vars || theme).palette.divider} 1px`
  }
}));
const ChartsTooltipRow = exports.ChartsTooltipRow = (0, _styles.styled)('tr', {
  name: 'MuiChartsTooltip',
  slot: 'Row'
})(({
  theme
}) => ({
  'tr:first-of-type& td': {
    paddingTop: theme.spacing(1)
  },
  'tr:last-of-type& td': {
    paddingBottom: theme.spacing(1)
  }
}));
const ChartsTooltipCell = exports.ChartsTooltipCell = (0, _styles.styled)('td', {
  name: 'MuiChartsTooltip',
  slot: 'Cell'
})(({
  theme
}) => ({
  verticalAlign: 'middle',
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${_chartsTooltipClasses.chartsTooltipClasses.labelCell}`]: {
    paddingLeft: theme.spacing(1)
  },
  [`&.${_chartsTooltipClasses.chartsTooltipClasses.valueCell}`]: {
    paddingLeft: theme.spacing(4),
    color: (theme.vars || theme).palette.text.primary
  },
  'td:first-of-type&': {
    paddingLeft: theme.spacing(2)
  },
  'td:last-of-type&': {
    paddingRight: theme.spacing(2)
  }
}));
const ChartsTooltipMark = exports.ChartsTooltipMark = (0, _styles.styled)('div', {
  name: 'MuiChartsTooltip',
  slot: 'Mark',
  shouldForwardProp: prop => (0, _system.shouldForwardProp)(prop) && prop !== 'color'
})(({
  theme,
  color
}) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: '50%',
  boxShadow: theme.shadows[1],
  backgroundColor: color,
  borderColor: (theme.vars || theme).palette.background.paper,
  border: `solid ${(theme.vars || theme).palette.background.paper} ${theme.spacing(0.25)}`,
  boxSizing: 'content-box'
}));