import * as React from 'react';
import { ChartItemIdentifier, ChartSeriesType } from '../models/seriesType/config';
export interface InteractionProviderProps {
    children: React.ReactNode;
}
export type ItemInteractionData<T extends ChartSeriesType> = ChartItemIdentifier<T>;
export type AxisInteractionData = {
    x: null | {
        value: number | Date | string;
        index?: number;
    };
    y: null | {
        value: number | Date | string;
        index?: number;
    };
};
type InteractionActions<T extends ChartSeriesType = ChartSeriesType> = {
    type: 'enterItem';
    data: ItemInteractionData<T>;
} | {
    type: 'leaveItem';
    data: Partial<ItemInteractionData<T>>;
} | {
    type: 'exitChart';
} | {
    type: 'updateVoronoiUsage';
    useVoronoiInteraction: boolean;
} | {
    type: 'updateAxis';
    data: AxisInteractionData;
};
type InteractionState = {
    /**
     * The item currently interacting.
     */
    item: null | ItemInteractionData<ChartSeriesType>;
    /**
     * The x- and y-axes currently interacting.
     */
    axis: AxisInteractionData;
    /**
     * Set to `true` when `VoronoiHandler` is active.
     * Used to prevent collision with mouseEnter events.
     */
    useVoronoiInteraction: boolean;
    dispatch: React.Dispatch<InteractionActions>;
};
export declare const InteractionContext: React.Context<InteractionState>;
declare function InteractionProvider(props: InteractionProviderProps): React.JSX.Element;
export { InteractionProvider };
