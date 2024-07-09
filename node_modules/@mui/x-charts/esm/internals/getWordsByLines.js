import _extends from "@babel/runtime/helpers/esm/extends";
import { getStringSize } from './domUtils';
export function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split('\n').map(subText => _extends({
    text: subText
  }, needsComputation ? getStringSize(subText, style) : {
    width: 0,
    height: 0
  }));
}