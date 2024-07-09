import * as React from 'react';
import { GaugeContainerProps } from './GaugeContainer';
import { GaugeClasses } from './gaugeClasses';
import { GaugeValueTextProps } from './GaugeValueText';
export interface GaugeProps extends GaugeContainerProps, Pick<GaugeValueTextProps, 'text'> {
    classes?: Partial<GaugeClasses>;
    children?: React.ReactNode;
}
declare function Gauge(props: GaugeProps): React.JSX.Element;
declare namespace Gauge {
    var propTypes: any;
}
export { Gauge };
