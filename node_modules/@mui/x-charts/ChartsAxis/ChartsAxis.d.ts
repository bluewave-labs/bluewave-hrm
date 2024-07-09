import * as React from 'react';
import { ChartsAxisSlotProps, ChartsAxisSlots, ChartsXAxisProps, ChartsYAxisProps } from '../models/axis';
export interface ChartsAxisProps {
    /**
     * Indicate which axis to display the top of the charts.
     * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
     * @default null
     */
    topAxis?: null | string | ChartsXAxisProps;
    /**
     * Indicate which axis to display the bottom of the charts.
     * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
     * @default xAxisIds[0] The id of the first provided axis
     */
    bottomAxis?: null | string | ChartsXAxisProps;
    /**
     * Indicate which axis to display the left of the charts.
     * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
     * @default yAxisIds[0] The id of the first provided axis
     */
    leftAxis?: null | string | ChartsYAxisProps;
    /**
     * Indicate which axis to display the right of the charts.
     * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
     * @default null
     */
    rightAxis?: null | string | ChartsYAxisProps;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: ChartsAxisSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: ChartsAxisSlotProps;
}
/**
 * Demos:
 *
 * - [Axis](https://mui.com/x/react-charts/axis/)
 *
 * API:
 *
 * - [ChartsAxis API](https://mui.com/x/api/charts/charts-axis/)
 */
declare function ChartsAxis(props: ChartsAxisProps): React.JSX.Element;
declare namespace ChartsAxis {
    var propTypes: any;
}
export { ChartsAxis };
