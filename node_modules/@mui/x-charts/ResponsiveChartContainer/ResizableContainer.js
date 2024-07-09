"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizableContainer = void 0;
var _styles = require("@mui/material/styles");
/**
 * Wrapping div that take the shape of its parent.
 *
 * @ignore - do not document.
 */
const ResizableContainer = exports.ResizableContainer = (0, _styles.styled)('div', {
  name: 'MuiResponsiveChart',
  slot: 'Container'
})(({
  ownerState
}) => ({
  width: ownerState.width ?? '100%',
  height: ownerState.height ?? '100%',
  display: 'flex',
  position: 'relative',
  flexGrow: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&>svg': {
    width: '100%',
    height: '100%'
  }
}));