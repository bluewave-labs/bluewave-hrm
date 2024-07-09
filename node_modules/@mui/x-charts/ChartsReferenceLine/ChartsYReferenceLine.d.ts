import * as React from 'react';
import { CommonChartsReferenceLineProps } from './common';
import { ChartsReferenceLineClasses } from './chartsReferenceLineClasses';
export type ChartsYReferenceLineProps<TValue extends string | number | Date = string | number | Date> = CommonChartsReferenceLineProps & {
    /**
     * The y value associated with the reference line.
     * If defined the reference line will be horizontal.
     */
    y: TValue;
};
export declare function getYReferenceLineClasses(classes?: Partial<ChartsReferenceLineClasses>): Record<"label" | "line" | "root", string>;
declare function ChartsYReferenceLine(props: ChartsYReferenceLineProps): React.JSX.Element | null;
export { ChartsYReferenceLine };
