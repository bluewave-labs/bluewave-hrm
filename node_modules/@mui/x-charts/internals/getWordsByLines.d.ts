/// <reference types="react" />
export type ChartsTextBaseline = 'hanging' | 'central' | 'auto';
export interface ChartsTextStyle extends React.CSSProperties {
    angle?: number;
    /**
     * The text baseline
     * @default 'central'
     */
    dominantBaseline?: ChartsTextBaseline;
}
export interface GetWordsByLinesParams {
    /**
     * Text displayed.
     */
    text: string;
    /**
     * Style applied to text elements.
     */
    style?: ChartsTextStyle;
    /**
     * If `true`, the line width is computed.
     * @default false
     */
    needsComputation?: boolean;
}
export declare function getWordsByLines({ style, needsComputation, text }: GetWordsByLinesParams): any[];
