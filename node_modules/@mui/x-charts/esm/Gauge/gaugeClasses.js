import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getGaugeUtilityClass(slot) {
  return generateUtilityClass('MuiGauge', slot);
}
export const gaugeClasses = generateUtilityClasses('MuiGauge', ['root', 'valueArc', 'referenceArc', 'valueText']);
export default gaugeClasses;