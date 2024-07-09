"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsRTL = void 0;
var _styles = require("@mui/material/styles");
const useIsRTL = () => {
  const theme = (0, _styles.useTheme)();
  return theme.direction === 'rtl';
};
exports.useIsRTL = useIsRTL;