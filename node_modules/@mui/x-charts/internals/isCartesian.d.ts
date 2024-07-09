import { ChartSeriesType, CartesianChartSeriesType, ChartSeriesDefaultized } from '../models/seriesType/config';
export declare function isCartesianSeriesType(seriesType: string): seriesType is CartesianChartSeriesType;
export declare function isCartesianSeries(series: ChartSeriesDefaultized<ChartSeriesType> & {
    getColor: (dataIndex: number) => string;
}): series is ChartSeriesDefaultized<CartesianChartSeriesType> & {
    getColor: (dataIndex: number) => string;
};
