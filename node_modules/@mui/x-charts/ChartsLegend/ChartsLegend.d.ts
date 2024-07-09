import * as React from 'react';
import { AnchorPosition, Direction } from './utils';
import { ChartsLegendClasses } from './chartsLegendClasses';
import { LegendRendererProps } from './DefaultChartsLegend';
export interface ChartsLegendSlots {
    /**
     * Custom rendering of the legend.
     * @default DefaultChartsLegend
     */
    legend?: React.JSXElementConstructor<LegendRendererProps>;
}
export interface ChartsLegendSlotProps {
    legend?: Partial<LegendRendererProps>;
}
export type ChartsLegendProps = {
    /**
     * The position of the legend.
     */
    position?: AnchorPosition;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ChartsLegendClasses>;
    /**
     * Set to true to hide the legend.
     * @default false
     */
    hidden?: boolean;
    /**
     * The direction of the legend layout.
     * The default depends on the chart.
     */
    direction?: Direction;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: ChartsLegendSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: ChartsLegendSlotProps;
};
declare function ChartsLegend(inProps: ChartsLegendProps): React.JSX.Element;
declare namespace ChartsLegend {
    var propTypes: any;
}
export { ChartsLegend };
