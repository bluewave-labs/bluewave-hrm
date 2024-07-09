import * as React from 'react';
import { HighlightItemData } from './HighlightedContext';
export type HighlightedProviderProps = {
    children: React.ReactNode;
    /**
     * The item currently highlighted. Turns highlighting into a controlled prop.
     */
    highlightedItem?: HighlightItemData | null;
    /**
     * The callback fired when the highlighted item changes.
     *
     * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
     */
    onHighlightChange?: (highlightedItem: HighlightItemData | null) => void;
};
declare function HighlightedProvider({ children, highlightedItem: highlightedItemProps, onHighlightChange, }: HighlightedProviderProps): React.JSX.Element;
declare namespace HighlightedProvider {
    var propTypes: any;
}
export { HighlightedProvider };
