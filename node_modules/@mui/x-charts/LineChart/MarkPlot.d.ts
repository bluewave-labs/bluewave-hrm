import * as React from 'react';
import { MarkElementProps } from './MarkElement';
import { LineItemIdentifier } from '../models/seriesType/line';
export interface MarkPlotSlots {
    mark?: React.JSXElementConstructor<MarkElementProps>;
}
export interface MarkPlotSlotProps {
    mark?: Partial<MarkElementProps>;
}
export interface MarkPlotProps extends React.SVGAttributes<SVGSVGElement>, Pick<MarkElementProps, 'skipAnimation'> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: MarkPlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: MarkPlotSlotProps;
    /**
     * Callback fired when a line mark item is clicked.
     * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
     * @param {LineItemIdentifier} lineItemIdentifier The line mark item identifier.
     */
    onItemClick?: (event: React.MouseEvent<SVGElement, MouseEvent>, lineItemIdentifier: LineItemIdentifier) => void;
}
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [MarkPlot API](https://mui.com/x/api/charts/mark-plot/)
 */
declare function MarkPlot(props: MarkPlotProps): React.JSX.Element | null;
declare namespace MarkPlot {
    var propTypes: any;
}
export { MarkPlot };
