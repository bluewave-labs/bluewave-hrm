export interface ChartsLegendClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to a series element. */
    series: string;
    /** Styles applied to series mark element. */
    mark: string;
    /** Styles applied to the series label. */
    label: string;
    /** Styles applied to the legend with column layout. */
    column: string;
    /** Styles applied to the legend with row layout. */
    row: string;
}
export type ChartsLegendClassKey = keyof ChartsLegendClasses;
export declare function getLegendUtilityClass(slot: string): string;
export declare const legendClasses: ChartsLegendClasses;
