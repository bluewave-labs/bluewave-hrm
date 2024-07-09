import * as React from 'react';
import { PieArcProps } from './PieArc';
import { ComputedPieRadius, DefaultizedPieSeriesType, DefaultizedPieValueType, PieItemIdentifier } from '../models/seriesType/pie';
export interface PieArcPlotSlots {
    pieArc?: React.JSXElementConstructor<PieArcProps>;
}
export interface PieArcPlotSlotProps {
    pieArc?: Partial<PieArcProps>;
}
export interface PieArcPlotProps extends Pick<DefaultizedPieSeriesType, 'data' | 'faded' | 'highlighted' | 'cornerRadius' | 'paddingAngle' | 'id'>, ComputedPieRadius {
    /**
     * Override the arc attributes when it is faded.
     * @default { additionalRadius: -5 }
     */
    faded?: DefaultizedPieSeriesType['faded'];
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PieArcPlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PieArcPlotSlotProps;
    /**
     * Callback fired when a pie item is clicked.
     * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
     * @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
     * @param {DefaultizedPieValueType} item The pie item.
     */
    onItemClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>, pieItemIdentifier: PieItemIdentifier, item: DefaultizedPieValueType) => void;
    /**
     * If `true`, animations are skipped.
     * @default false
     */
    skipAnimation?: boolean;
}
declare function PieArcPlot(props: PieArcPlotProps): React.JSX.Element | null;
declare namespace PieArcPlot {
    var propTypes: any;
}
export { PieArcPlot };
