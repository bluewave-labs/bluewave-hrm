import * as React from 'react';
import type { CompletedBarData } from '../types';
import { BarLabelItemProps } from './BarLabelItem';
type BarLabelPlotProps = {
    bars: CompletedBarData[];
    skipAnimation?: boolean;
    barLabel?: BarLabelItemProps['barLabel'];
};
/**
 * @ignore - internal component.
 */
declare function BarLabelPlot(props: BarLabelPlotProps): React.JSX.Element;
export { BarLabelPlot };
