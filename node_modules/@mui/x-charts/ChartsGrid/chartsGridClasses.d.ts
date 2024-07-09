export interface ChartsGridClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to every line element. */
    line: string;
    /** Styles applied to x-axes. */
    horizontalLine: string;
    /** Styles applied to y-axes. */
    verticalLine: string;
}
export type ChartsGridClassKey = keyof ChartsGridClasses;
export declare function getChartsGridUtilityClass(slot: string): string;
export declare const chartsGridClasses: ChartsGridClasses;
