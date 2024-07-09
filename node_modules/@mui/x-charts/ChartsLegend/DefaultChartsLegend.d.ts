import * as React from 'react';
import { DrawingArea } from '../context/DrawingProvider';
import { AnchorPosition, Direction } from './utils';
import { FormattedSeries } from '../context/SeriesContextProvider';
import { LegendParams } from '../models/seriesType/config';
import { DefaultizedProps } from '../models/helpers';
import { ChartsTextStyle } from '../ChartsText';
import { CardinalDirections } from '../models/layout';
import type { ChartsLegendProps } from './ChartsLegend';
export type ChartsLegendRootOwnerState = {
    position: AnchorPosition;
    direction: Direction;
    drawingArea: DrawingArea;
    offsetX?: number;
    offsetY?: number;
    seriesNumber: number;
};
export declare const ChartsLegendRoot: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.SVGProps<SVGGElement>, keyof React.SVGProps<SVGGElement>>, {}>;
export interface LegendRendererProps extends DefaultizedProps<Omit<ChartsLegendProps, 'slots' | 'slotProps'>, 'direction' | 'position'> {
    series: FormattedSeries;
    seriesToDisplay: LegendParams[];
    drawingArea: DrawingArea;
    classes: Record<'mark' | 'series' | 'root', string>;
    /**
     * Style applied to legend labels.
     * @default theme.typography.subtitle1
     */
    labelStyle?: ChartsTextStyle;
    /**
     * Width of the item mark (in px).
     * @default 20
     */
    itemMarkWidth?: number;
    /**
     * Height of the item mark (in px).
     * @default 20
     */
    itemMarkHeight?: number;
    /**
     * Space between the mark and the label (in px).
     * @default 5
     */
    markGap?: number;
    /**
     * Space between two legend items (in px).
     * @default 10
     */
    itemGap?: number;
    /**
     * Legend padding (in px).
     * Can either be a single number, or an object with top, left, bottom, right properties.
     * @default 10
     */
    padding?: number | Partial<CardinalDirections<number>>;
}
declare function DefaultChartsLegend(props: LegendRendererProps): React.JSX.Element | null;
declare namespace DefaultChartsLegend {
    var propTypes: any;
}
export { DefaultChartsLegend };
