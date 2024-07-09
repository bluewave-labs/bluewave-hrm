import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { ItemInteractionData } from '../context/InteractionProvider';
import { ChartSeriesDefaultized, ChartSeriesType } from '../models/seriesType/config';
import { ChartsTooltipClasses } from './chartsTooltipClasses';
export type ChartsItemContentProps<T extends ChartSeriesType = ChartSeriesType> = {
    /**
     * The data used to identify the triggered item.
     */
    itemData: ItemInteractionData<T>;
    /**
     * The series linked to the triggered axis.
     */
    series: ChartSeriesDefaultized<T>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes: ChartsTooltipClasses;
    /**
     * Get the color of the item with index `dataIndex`.
     * @param {number} dataIndex The data index of the item.
     * @returns {string} The color to display.
     */
    getColor: (dataIndex: number) => string;
    sx?: SxProps<Theme>;
};
declare function ChartsItemTooltipContent<T extends ChartSeriesType>(props: {
    itemData: ItemInteractionData<T>;
    content?: React.ElementType<ChartsItemContentProps<T>>;
    contentProps?: Partial<ChartsItemContentProps<T>>;
    sx?: SxProps<Theme>;
    classes: ChartsItemContentProps<T>['classes'];
}): React.JSX.Element;
declare namespace ChartsItemTooltipContent {
    var propTypes: any;
}
export { ChartsItemTooltipContent };
