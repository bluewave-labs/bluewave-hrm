import { ComputedPieRadius, DefaultizedPieSeriesType, DefaultizedPieValueType } from '../../models/seriesType/pie';
export interface AnimatedObject {
    innerRadius: number;
    outerRadius: number;
    arcLabelRadius: number;
    cornerRadius: number;
    startAngle: number;
    endAngle: number;
    paddingAngle: number;
}
export interface ValueWithHighlight extends DefaultizedPieValueType, AnimatedObject {
    isFaded: boolean;
    isHighlighted: boolean;
}
export declare function useTransformData(series: Pick<DefaultizedPieSeriesType, 'cornerRadius' | 'paddingAngle' | 'id' | 'highlighted' | 'faded' | 'data'> & ComputedPieRadius): ValueWithHighlight[];
