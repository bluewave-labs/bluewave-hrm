export function getLabel(value, location) {
  return typeof value === 'function' ? value(location) : value;
}