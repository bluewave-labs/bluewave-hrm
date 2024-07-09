import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getLegendUtilityClass(slot) {
  return generateUtilityClass('MuiChartsLegend', slot);
}
export const legendClasses = generateUtilityClasses('MuiChartsLegend', ['root', 'series', 'mark', 'label', 'column', 'row']);