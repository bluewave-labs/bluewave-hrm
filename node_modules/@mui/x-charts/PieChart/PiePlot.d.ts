import * as React from 'react';
import { PieArcPlotProps, PieArcPlotSlotProps, PieArcPlotSlots } from './PieArcPlot';
import { PieArcLabelPlotSlots, PieArcLabelPlotSlotProps } from './PieArcLabelPlot';
export interface PiePlotSlots extends PieArcPlotSlots, PieArcLabelPlotSlots {
}
export interface PiePlotSlotProps extends PieArcPlotSlotProps, PieArcLabelPlotSlotProps {
}
export interface PiePlotProps extends Pick<PieArcPlotProps, 'skipAnimation' | 'onItemClick'> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PiePlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PiePlotSlotProps;
}
/**
 * Demos:
 *
 * - [Pie](https://mui.com/x/react-charts/pie/)
 * - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
 *
 * API:
 *
 * - [PiePlot API](https://mui.com/x/api/charts/pie-plot/)
 */
declare function PiePlot(props: PiePlotProps): React.JSX.Element | null;
declare namespace PiePlot {
    var propTypes: any;
}
export { PiePlot };
