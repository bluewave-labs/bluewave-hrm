import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getReferenceLineUtilityClass(slot) {
  return generateUtilityClass('MuiChartsReferenceLine', slot);
}
export const referenceLineClasses = generateUtilityClasses('MuiChartsReferenceLine', ['root', 'vertical', 'horizontal', 'line', 'label']);