const mergeMinMax = (acc, val) => {
  if (acc[0] === null || acc[1] === null) {
    return val;
  }
  if (val[0] === null || val[1] === null) {
    return acc;
  }
  return [Math.min(acc[0], val[0]), Math.max(acc[1], val[1])];
};
export const getExtremumX = params => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter(seriesId => series[seriesId].xAxisKey === axis.id || series[seriesId].xAxisKey === undefined && isDefaultAxis).reduce((acc, seriesId) => {
    const seriesMinMax = series[seriesId].data.reduce((accSeries, {
      x
    }) => {
      const val = [x, x];
      return mergeMinMax(accSeries, val);
    }, [null, null]);
    return mergeMinMax(acc, seriesMinMax);
  }, [null, null]);
};
export const getExtremumY = params => {
  const {
    series,
    axis,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter(seriesId => series[seriesId].yAxisKey === axis.id || series[seriesId].yAxisKey === undefined && isDefaultAxis).reduce((acc, seriesId) => {
    const seriesMinMax = series[seriesId].data.reduce((accSeries, {
      y
    }) => {
      const val = [y, y];
      return mergeMinMax(accSeries, val);
    }, [null, null]);
    return mergeMinMax(acc, seriesMinMax);
  }, [null, null]);
};