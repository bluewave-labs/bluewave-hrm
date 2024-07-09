import * as React from 'react';
import { LineHighlightElementProps } from './LineHighlightElement';
export interface LineHighlightPlotSlots {
    lineHighlight?: React.JSXElementConstructor<LineHighlightElementProps>;
}
export interface LineHighlightPlotSlotProps {
    lineHighlight?: Partial<LineHighlightElementProps>;
}
export interface LineHighlightPlotProps extends React.SVGAttributes<SVGSVGElement> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: LineHighlightPlotSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: LineHighlightPlotSlotProps;
}
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [LineHighlightPlot API](https://mui.com/x/api/charts/line-highlight-plot/)
 */
declare function LineHighlightPlot(props: LineHighlightPlotProps): React.JSX.Element | null;
declare namespace LineHighlightPlot {
    var propTypes: any;
}
export { LineHighlightPlot };
