import * as React from 'react';
import { ChartsSurfaceProps } from '../ChartsSurface';
import { DrawingProviderProps } from '../context/DrawingProvider';
import { GaugeProviderProps } from './GaugeProvider';
export interface GaugeContainerProps extends Omit<ChartsSurfaceProps, 'width' | 'height' | 'children'>, Omit<DrawingProviderProps, 'svgRef' | 'width' | 'height' | 'children'>, Omit<GaugeProviderProps, 'children'> {
    /**
     * The width of the chart in px. If not defined, it takes the width of the parent element.
     */
    width?: number;
    /**
     * The height of the chart in px. If not defined, it takes the height of the parent element.
     */
    height?: number;
    children?: React.ReactNode;
}
declare const GaugeContainer: React.ForwardRefExoticComponent<GaugeContainerProps & React.RefAttributes<unknown>>;
export { GaugeContainer };
