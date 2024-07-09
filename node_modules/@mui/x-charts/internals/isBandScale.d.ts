import type { ScaleBand, ScalePoint } from 'd3-scale';
import { D3Scale } from '../models/axis';
export declare function isBandScale<T extends {
    toString(): string;
}>(scale: D3Scale<T>): scale is ScaleBand<T> | ScalePoint<T>;
