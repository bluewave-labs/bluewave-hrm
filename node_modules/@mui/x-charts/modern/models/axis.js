export function isBandScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === 'band';
}
export function isPointScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === 'point';
}