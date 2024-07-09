import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getAxisUtilityClass(slot) {
  return generateUtilityClass('MuiChartsAxis', slot);
}
export const axisClasses = generateUtilityClasses('MuiChartsAxis', ['root', 'line', 'tickContainer', 'tick', 'tickLabel', 'label', 'directionX', 'directionY', 'top', 'bottom', 'left', 'right']);