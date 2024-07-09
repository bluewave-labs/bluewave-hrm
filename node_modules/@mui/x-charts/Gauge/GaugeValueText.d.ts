import * as React from 'react';
import { ChartsTextProps } from '../ChartsText';
export interface GaugeFormatterParams {
    value: number | null;
    valueMin: number;
    valueMax: number;
}
export interface GaugeValueTextProps extends Omit<ChartsTextProps, 'text'> {
    text?: string | ((params: GaugeFormatterParams) => string | null);
}
declare function GaugeValueText(props: GaugeValueTextProps): React.JSX.Element | null;
declare namespace GaugeValueText {
    var propTypes: any;
}
export { GaugeValueText };
