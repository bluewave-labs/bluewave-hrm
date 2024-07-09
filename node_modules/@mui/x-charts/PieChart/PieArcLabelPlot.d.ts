import * as React from 'react';
import { ComputedPieRadius, DefaultizedPieSeriesType } from '../models/seriesType/pie';
import { PieArcLabelProps } from './PieArcLabel';
export interface PieArcLabelPlotSlots {
    pieArcLabel?: React.JSXElementConstructor<PieArcLabelProps>;
}
export interface PieArcLabelPlotSlotProps {
    pieArcLabel?: Partial<PieArcLabelProps>;
}
export interface PieArcLabelPlotProps extends Pick<DefaultizedPieSeriesType, 'data' | 'faded' | 'highlighted' | 'cornerRadius' | 'paddingAngle' | 'arcLabel' | 'arcLabelMinAngle' | 'id'>, ComputedPieRadius {
    /**
     * Override the arc attributes when it is faded.
     * @default { additionalRadius: -5 }
     */
    faded?: DefaultizedPieSeriesType['faded'];
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PieArcLabelPlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PieArcLabelPlotSlotProps;
    /**
     * If `true`, animations are skipped.
     * @default false
     */
    skipAnimation?: boolean;
}
declare function PieArcLabelPlot(props: PieArcLabelPlotProps): React.JSX.Element | null;
declare namespace PieArcLabelPlot {
    var propTypes: any;
}
export { PieArcLabelPlot };
