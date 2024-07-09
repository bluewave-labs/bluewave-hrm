import * as React from 'react';
import { LineElementProps, LineElementSlotProps, LineElementSlots } from './LineElement';
import { LineItemIdentifier } from '../models/seriesType/line';
export interface LinePlotSlots extends LineElementSlots {
}
export interface LinePlotSlotProps extends LineElementSlotProps {
}
export interface LinePlotProps extends React.SVGAttributes<SVGSVGElement>, Pick<LineElementProps, 'slots' | 'slotProps' | 'skipAnimation'> {
    /**
     * Callback fired when a line item is clicked.
     * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
     * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
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
 * - [LinePlot API](https://mui.com/x/api/charts/line-plot/)
 */
declare function LinePlot(props: LinePlotProps): React.JSX.Element;
declare namespace LinePlot {
    var propTypes: any;
}
export { LinePlot };
