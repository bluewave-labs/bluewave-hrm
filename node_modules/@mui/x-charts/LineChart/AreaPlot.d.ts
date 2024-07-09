import * as React from 'react';
import { AreaElementProps, AreaElementSlotProps, AreaElementSlots } from './AreaElement';
import { LineItemIdentifier } from '../models/seriesType/line';
export interface AreaPlotSlots extends AreaElementSlots {
}
export interface AreaPlotSlotProps extends AreaElementSlotProps {
}
export interface AreaPlotProps extends React.SVGAttributes<SVGSVGElement>, Pick<AreaElementProps, 'slots' | 'slotProps' | 'skipAnimation'> {
    /**
     * Callback fired when a line area item is clicked.
     * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
     * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
     */
    onItemClick?: (event: React.MouseEvent<SVGElement, MouseEvent>, lineItemIdentifier: LineItemIdentifier) => void;
}
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Areas demonstration](https://mui.com/x/react-charts/areas-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [AreaPlot API](https://mui.com/x/api/charts/area-plot/)
 */
declare function AreaPlot(props: AreaPlotProps): React.JSX.Element;
declare namespace AreaPlot {
    var propTypes: any;
}
export { AreaPlot };
