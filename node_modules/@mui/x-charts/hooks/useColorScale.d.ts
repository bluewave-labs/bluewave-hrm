import { AxisScaleComputedConfig, ScaleName } from '../models/axis';
export declare function useXColorScale<S extends ScaleName>(identifier?: number | string): AxisScaleComputedConfig[S]['colorScale'] | undefined;
export declare function useYColorScale<S extends ScaleName>(identifier?: number | string): AxisScaleComputedConfig[S]['colorScale'] | undefined;
export declare function useZColorScale<S extends ScaleName>(identifier?: number | string): AxisScaleComputedConfig[S]['colorScale'] | undefined;
