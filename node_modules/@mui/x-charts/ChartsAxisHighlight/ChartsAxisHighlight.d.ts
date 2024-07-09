import * as React from 'react';
export interface ChartsAxisHighlightClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type ChartsAxisHighlightClassKey = keyof ChartsAxisHighlightClasses;
export declare function getAxisHighlightUtilityClass(slot: string): string;
export declare const chartsAxisHighlightClasses: ChartsAxisHighlightClasses;
export declare const ChartsAxisHighlightPath: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & {
    ownerState: {
        axisHighlight: AxisHighlight;
    };
}, Pick<React.SVGProps<SVGPathElement>, keyof React.SVGProps<SVGPathElement>>, {}>;
type AxisHighlight = 'none' | 'line' | 'band';
export type ChartsAxisHighlightProps = {
    x?: AxisHighlight;
    y?: AxisHighlight;
};
/**
 * Demos:
 *
 * - [Custom components](https://mui.com/x/react-charts/components/)
 *
 * API:
 *
 * - [ChartsAxisHighlight API](https://mui.com/x/api/charts/charts-axis-highlight/)
 */
declare function ChartsAxisHighlight(props: ChartsAxisHighlightProps): React.JSX.Element;
declare namespace ChartsAxisHighlight {
    var propTypes: any;
}
export { ChartsAxisHighlight };
