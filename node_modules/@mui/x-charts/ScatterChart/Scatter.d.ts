import * as React from 'react';
import { DefaultizedScatterSeriesType, ScatterItemIdentifier } from '../models/seriesType/scatter';
import { D3Scale } from '../models/axis';
export interface ScatterProps {
    series: DefaultizedScatterSeriesType;
    xScale: D3Scale;
    yScale: D3Scale;
    markerSize: number;
    color: string;
    colorGetter?: (dataIndex: number) => string;
    /**
     * Callback fired when clicking on a scatter item.
     * @param {MouseEvent} event Mouse event recorded on the `<svg/>` element.
     * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
     */
    onItemClick?: (event: React.MouseEvent<SVGElement, MouseEvent>, scatterItemIdentifier: ScatterItemIdentifier) => void;
}
/**
 * Demos:
 *
 * - [Scatter](https://mui.com/x/react-charts/scatter/)
 * - [Scatter demonstration](https://mui.com/x/react-charts/scatter-demo/)
 *
 * API:
 *
 * - [Scatter API](https://mui.com/x/api/charts/scatter/)
 */
declare function Scatter(props: ScatterProps): React.JSX.Element;
declare namespace Scatter {
    var propTypes: any;
}
export { Scatter };
