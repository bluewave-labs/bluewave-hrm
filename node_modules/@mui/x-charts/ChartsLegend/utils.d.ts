import { FormattedSeries } from '../context/SeriesContextProvider';
export type AnchorX = 'left' | 'right' | 'middle';
export type AnchorY = 'top' | 'bottom' | 'middle';
export type AnchorPosition = {
    horizontal: AnchorX;
    vertical: AnchorY;
};
export type Direction = 'row' | 'column';
export declare function getSeriesToDisplay(series: FormattedSeries): import("../models/seriesType/config").LegendParams[];
