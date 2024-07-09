import * as React from 'react';
export type ChartsClipPathProps = {
    id: string;
    offset?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
};
/**
 * API:
 *
 * - [ChartsClipPath API](https://mui.com/x/api/charts/charts-clip-path/)
 */
declare function ChartsClipPath(props: ChartsClipPathProps): React.JSX.Element;
declare namespace ChartsClipPath {
    var propTypes: any;
}
export { ChartsClipPath };
