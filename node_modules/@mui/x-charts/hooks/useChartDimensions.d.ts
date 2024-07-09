import { LayoutConfig } from '../models/layout';
declare const useChartDimensions: (width: number, height: number, margin: LayoutConfig['margin']) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
export default useChartDimensions;
