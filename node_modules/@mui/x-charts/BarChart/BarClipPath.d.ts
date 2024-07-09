import * as React from 'react';
export interface BarClipPathProps {
    maskId: string;
    borderRadius?: number;
    hasNegative: boolean;
    hasPositive: boolean;
    layout?: 'vertical' | 'horizontal';
    style: {};
}
/**
 * @ignore - internal component.
 */
declare function BarClipPath(props: BarClipPathProps): React.JSX.Element | null;
export { BarClipPath };
