import { scaleOrdinal, scaleThreshold, scaleSequential } from 'd3-scale';
export function getSequentialColorScale(config) {
  if (config.type === 'piecewise') {
    return scaleThreshold(config.thresholds, config.colors);
  }
  return scaleSequential([config.min ?? 0, config.max ?? 100], config.color);
}
export function getOrdinalColorScale(config) {
  if (config.values) {
    return scaleOrdinal(config.values, config.colors).unknown(config.unknownColor ?? null);
  }
  return scaleOrdinal(config.colors.map((_, index) => index), config.colors).unknown(config.unknownColor ?? null);
}
export function getColorScale(config) {
  return config.type === 'ordinal' ? getOrdinalColorScale(config) : getSequentialColorScale(config);
}