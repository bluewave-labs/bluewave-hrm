import { Series } from 'd3-shape';
import type { BarSeriesType, LineSeriesType } from '../models/seriesType';
import type { StackOffsetType, StackOrderType } from '../models/stacking';
import { SeriesId } from '../models/seriesType/common';
type StackableSeries = Record<SeriesId, BarSeriesType> | Record<SeriesId, LineSeriesType>;
type FormatterParams = {
    series: StackableSeries;
    seriesOrder: SeriesId[];
    defaultStrategy?: {
        stackOrder?: StackOrderType;
        stackOffset?: StackOffsetType;
    };
};
export type StackingGroupsType = {
    ids: SeriesId[];
    stackingOrder: (series: Series<any, any>) => number[];
    stackingOffset: (series: Series<any, any>, order: Iterable<number>) => void;
}[];
export declare const StackOrder: {
    [key in StackOrderType]: (series: Series<any, any>) => number[];
};
export declare const StackOffset: {
    [key in StackOffsetType]: (series: Series<any, any>, order: Iterable<number>) => void;
};
/**
 * Takes a set of series and groups their ids
 * @param series the object of all bars series
 * @returns an array of groups, including the ids, the stacking order, and the stacking offset.
 */
export declare const getStackingGroups: (params: FormatterParams) => StackingGroupsType;
export {};
