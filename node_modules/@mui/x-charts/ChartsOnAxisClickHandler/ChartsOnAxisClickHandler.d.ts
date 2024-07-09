import * as React from 'react';
type AxisData = {
    dataIndex: number;
    axisValue?: number | Date | string;
    seriesValues: Record<string, number | null | undefined>;
};
export interface ChartsOnAxisClickHandlerProps {
    /**
     * The function called for onClick events.
     * The second argument contains information about all line/bar elements at the current mouse position.
     * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
     * @param {null | AxisData} data The data about the clicked axis and items associated with it.
     */
    onAxisClick?: (event: MouseEvent, data: null | AxisData) => void;
}
declare function ChartsOnAxisClickHandler(props: ChartsOnAxisClickHandlerProps): React.JSX.Element;
declare namespace ChartsOnAxisClickHandler {
    var propTypes: any;
}
export { ChartsOnAxisClickHandler };
