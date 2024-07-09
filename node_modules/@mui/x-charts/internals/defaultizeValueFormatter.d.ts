import { SeriesId, SeriesValueFormatter } from '../models/seriesType/common';
export declare function defaultizeValueFormatter<TValue, ISeries extends {
    valueFormatter?: SeriesValueFormatter<TValue>;
}>(series: Record<SeriesId, ISeries>, defaultValueFormatter: SeriesValueFormatter<TValue>): Record<SeriesId, ISeries & {
    valueFormatter: SeriesValueFormatter<TValue>;
}>;
