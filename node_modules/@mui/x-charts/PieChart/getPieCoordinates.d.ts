import { DrawingArea } from '../context/DrawingProvider';
import { DefaultizedPieSeriesType } from '../models/seriesType/pie';
export declare function getPieCoordinates(series: Pick<DefaultizedPieSeriesType, 'cx' | 'cy'>, drawing: Pick<DrawingArea, 'width' | 'height'>): {
    cx: number;
    cy: number;
    availableRadius: number;
};
