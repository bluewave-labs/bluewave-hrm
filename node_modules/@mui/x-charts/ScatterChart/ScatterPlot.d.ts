import * as React from 'react';
import { ScatterProps } from './Scatter';
export interface ScatterPlotSlots {
    scatter?: React.JSXElementConstructor<ScatterProps>;
}
export interface ScatterPlotSlotProps {
    scatter?: Partial<ScatterProps>;
}
export interface ScatterPlotProps extends Pick<ScatterProps, 'onItemClick'> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: ScatterPlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: ScatterPlotSlotProps;
}
/**
 * Demos:
 *
 * - [Scatter](https://mui.com/x/react-charts/scatter/)
 * - [Scatter demonstration](https://mui.com/x/react-charts/scatter-demo/)
 *
 * API:
 *
 * - [ScatterPlot API](https://mui.com/x/api/charts/scatter-plot/)
 */
declare function ScatterPlot(props: ScatterPlotProps): React.JSX.Element | null;
declare namespace ScatterPlot {
    var propTypes: any;
}
export { ScatterPlot };
