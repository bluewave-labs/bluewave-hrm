export default function getColor(series) {
  return dataIndex => {
    return series.data[dataIndex].color;
  };
}