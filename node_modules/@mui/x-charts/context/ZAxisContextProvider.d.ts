import * as React from 'react';
import { DatasetType } from '../models/seriesType/config';
import { MakeOptional } from '../models/helpers';
import { ZAxisConfig, ZAxisDefaultized } from '../models/z-axis';
export type ZAxisContextProviderProps = {
    /**
     * The configuration of the z-axes.
     */
    zAxis?: MakeOptional<ZAxisConfig, 'id'>[];
    /**
     * An array of objects that can be used to populate series and axes data using their `dataKey` property.
     */
    dataset?: DatasetType;
    children: React.ReactNode;
};
type DefaultizedZAxisConfig = {
    [axisKey: string]: ZAxisDefaultized;
};
export declare const ZAxisContext: React.Context<{
    /**
     * Mapping from z-axis key to scaling configuration.
     */
    zAxis: DefaultizedZAxisConfig;
    /**
     * The z-axes IDs sorted by order they got provided.
     */
    zAxisIds: string[];
}>;
declare function ZAxisContextProvider(props: ZAxisContextProviderProps): React.JSX.Element;
declare namespace ZAxisContextProvider {
    var propTypes: any;
}
export { ZAxisContextProvider };
