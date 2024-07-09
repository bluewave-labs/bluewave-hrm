import * as React from 'react';
import { ChartContainerProps } from '../ChartContainer';
export interface ResponsiveChartContainerProps extends Omit<ChartContainerProps, 'width' | 'height'> {
    /**
     * The width of the chart in px. If not defined, it takes the width of the parent element.
     */
    width?: number;
    /**
     * The height of the chart in px. If not defined, it takes the height of the parent element.
     */
    height?: number;
}
declare const ResponsiveChartContainer: React.ForwardRefExoticComponent<ResponsiveChartContainerProps & React.RefAttributes<unknown>>;
export { ResponsiveChartContainer };
