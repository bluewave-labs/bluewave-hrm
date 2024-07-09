import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import composeClasses from '@mui/utils/composeClasses';
export function getBarLabelUtilityClass(slot) {
  return generateUtilityClass('MuiBarLabel', slot);
}
export const barLabelClasses = generateUtilityClasses('MuiBarLabel', ['root', 'highlighted', 'faded']);
export const useUtilityClasses = ownerState => {
  const {
    classes,
    seriesId,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ['root', `series-${seriesId}`, isHighlighted && 'highlighted', isFaded && 'faded']
  };
  return composeClasses(slots, getBarLabelUtilityClass, classes);
};