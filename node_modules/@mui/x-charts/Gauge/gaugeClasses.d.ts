export interface GaugeClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the arc displaying the value. */
    valueArc: string;
    /** Styles applied to the arc displaying the range of available values. */
    referenceArc: string;
    /** Styles applied to the value text. */
    valueText: string;
}
export type GaugeClassKey = keyof GaugeClasses;
export declare function getGaugeUtilityClass(slot: string): string;
export declare const gaugeClasses: GaugeClasses;
export default gaugeClasses;
