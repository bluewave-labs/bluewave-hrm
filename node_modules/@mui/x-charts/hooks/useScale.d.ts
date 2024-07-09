import { AxisScaleConfig, D3Scale, ScaleName } from '../models/axis';
/**
 * For a given scale return a function that map value to their position.
 * Useful when dealing with specific scale such as band.
 * @param scale The scale to use
 * @returns (value: any) => number
 */
export declare function getValueToPositionMapper(scale: D3Scale): (value: any) => number;
export declare function useXScale<S extends ScaleName>(identifier?: number | string): AxisScaleConfig[S]['scale'];
export declare function useYScale<S extends ScaleName>(identifier?: number | string): AxisScaleConfig[S]['scale'];
