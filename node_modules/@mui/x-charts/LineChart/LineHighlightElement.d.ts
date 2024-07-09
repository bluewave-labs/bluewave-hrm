import * as React from 'react';
import { SeriesId } from '../models/seriesType/common';
export interface LineHighlightElementClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type HighlightElementClassKey = keyof LineHighlightElementClasses;
interface LineHighlightElementOwnerState {
    id: SeriesId;
    color: string;
    x: number;
    y: number;
    classes?: Partial<LineHighlightElementClasses>;
}
export declare function getHighlightElementUtilityClass(slot: string): string;
export declare const lineHighlightElementClasses: LineHighlightElementClasses;
export type LineHighlightElementProps = LineHighlightElementOwnerState & Omit<React.SVGProps<SVGCircleElement>, 'ref' | 'id'>;
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [LineHighlightElement API](https://mui.com/x/api/charts/line-highlight-element/)
 */
declare function LineHighlightElement(props: LineHighlightElementProps): React.JSX.Element;
declare namespace LineHighlightElement {
    var propTypes: any;
}
export { LineHighlightElement };
