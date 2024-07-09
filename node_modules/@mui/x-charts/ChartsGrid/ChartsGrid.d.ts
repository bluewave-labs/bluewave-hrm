import * as React from 'react';
import { ChartsGridClasses } from './chartsGridClasses';
export interface ChartsGridProps {
    /**
     * Displays vertical grid.
     */
    vertical?: boolean;
    /**
     * Displays horizontal grid.
     */
    horizontal?: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ChartsGridClasses>;
}
/**
 * Demos:
 *
 * - [Axis](https://mui.com/x/react-charts/axis/)
 *
 * API:
 *
 * - [ChartsGrid API](https://mui.com/x/api/charts/charts-axis/)
 */
declare function ChartsGrid(props: ChartsGridProps): React.JSX.Element;
declare namespace ChartsGrid {
    var propTypes: any;
}
export { ChartsGrid };
