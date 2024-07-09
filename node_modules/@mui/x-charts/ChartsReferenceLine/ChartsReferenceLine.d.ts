import * as React from 'react';
import { ChartsXReferenceLineProps } from './ChartsXReferenceLine';
import { ChartsYReferenceLineProps } from './ChartsYReferenceLine';
import { XOR } from '../internals/utils';
type ChartsReferenceLineProps<TValue extends string | number | Date = string | number | Date> = XOR<ChartsXReferenceLineProps<TValue>, ChartsYReferenceLineProps<TValue>>;
declare function ChartsReferenceLine(props: ChartsReferenceLineProps): React.JSX.Element;
declare namespace ChartsReferenceLine {
    var propTypes: any;
}
export { ChartsReferenceLine };
