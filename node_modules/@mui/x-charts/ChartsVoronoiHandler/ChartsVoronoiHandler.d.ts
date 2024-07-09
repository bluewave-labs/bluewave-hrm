import * as React from 'react';
import { ScatterItemIdentifier } from '../models';
export type ChartsVoronoiHandlerProps = {
    /**
     * Defines the maximal distance between a scatter point and the pointer that triggers the interaction.
     * If `undefined`, the radius is assumed to be infinite.
     */
    voronoiMaxRadius?: number | undefined;
    /**
     * Callback fired when clicking on a scatter item.
     * @param {MouseEvent} event Mouse event caught at the svg level
     * @param {ScatterItemIdentifier} scatterItemIdentifier Identify which item got clicked
     */
    onItemClick?: (event: MouseEvent, scatterItemIdentifier: ScatterItemIdentifier) => void;
};
declare function ChartsVoronoiHandler(props: ChartsVoronoiHandlerProps): React.JSX.Element;
declare namespace ChartsVoronoiHandler {
    var propTypes: any;
}
export { ChartsVoronoiHandler };
