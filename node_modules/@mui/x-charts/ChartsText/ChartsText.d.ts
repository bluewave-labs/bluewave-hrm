import * as React from 'react';
import { GetWordsByLinesParams } from '../internals/getWordsByLines';
export interface ChartsTextProps extends Omit<React.SVGTextElementAttributes<SVGTextElement>, 'width' | 'ref' | 'style' | 'dominantBaseline'>, GetWordsByLinesParams {
    /**
     * Height of a text line (in `em`).
     */
    lineHeight?: number;
    ownerState?: any;
}
/**
 * Helper component to manage multiline text in SVG
 */
declare function ChartsText(props: ChartsTextProps): React.JSX.Element;
declare namespace ChartsText {
    var propTypes: any;
}
export { ChartsText };
