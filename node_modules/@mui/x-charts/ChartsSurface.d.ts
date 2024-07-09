import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
type ViewBox = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
export interface ChartsSurfaceProps {
    /**
     * The width of the chart in px.
     */
    width: number;
    /**
     * The height of the chart in px.
     */
    height: number;
    viewBox?: ViewBox;
    className?: string;
    title?: string;
    desc?: string;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    /**
     * If `true`, the charts will not listen to the mouse move event.
     * It might break interactive features, but will improve performance.
     * @default false
     */
    disableAxisListener?: boolean;
}
declare const ChartsSurface: React.ForwardRefExoticComponent<ChartsSurfaceProps & React.RefAttributes<SVGSVGElement>>;
export { ChartsSurface };
