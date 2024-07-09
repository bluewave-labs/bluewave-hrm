import _extends from "@babel/runtime/helpers/esm/extends";
const DEFAULT_COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
export function defaultizeColor(series, seriesIndex, colors = DEFAULT_COLORS) {
  if (series.type === 'pie') {
    return _extends({}, series, {
      data: series.data.map((d, index) => _extends({
        color: colors[index % colors.length]
      }, d))
    });
  }
  return _extends({
    color: colors[seriesIndex % colors.length]
  }, series);
}