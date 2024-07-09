import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getChartsGridUtilityClass(slot) {
  return generateUtilityClass('MuiChartsGrid', slot);
}
export const chartsGridClasses = generateUtilityClasses('MuiChartsGrid', ['root', 'line', 'horizontalLine', 'verticalLine']);