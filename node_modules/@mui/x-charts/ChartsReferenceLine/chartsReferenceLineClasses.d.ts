export interface ChartsReferenceLineClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if the reference line is vertical. */
    vertical: string;
    /** Styles applied to the root element if the reference line is horizontal. */
    horizontal: string;
    /** Styles applied to the reference line. */
    line: string;
    /** Styles applied to the reference label. */
    label: string;
}
export type ChartsReferenceLineClassKey = keyof ChartsReferenceLineClasses;
export declare function getReferenceLineUtilityClass(slot: string): string;
export declare const referenceLineClasses: ChartsReferenceLineClasses;
