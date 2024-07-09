import * as React from 'react';
import { CommonChartsReferenceLineProps } from './common';
import { ChartsReferenceLineClasses } from './chartsReferenceLineClasses';
export type ChartsXReferenceLineProps<TValue extends string | number | Date = string | number | Date> = CommonChartsReferenceLineProps & {
    /**
     * The x value associated with the reference line.
     * If defined the reference line will be vertical.
     */
    x: TValue;
};
export declare function getXReferenceLineClasses(classes?: Partial<ChartsReferenceLineClasses>): Record<"label" | "line" | "root", string>;
declare function ChartsXReferenceLine(props: ChartsXReferenceLineProps): React.JSX.Element | null;
export { ChartsXReferenceLine };
