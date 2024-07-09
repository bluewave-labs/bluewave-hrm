import { HighlightItemData, HighlightScope } from './HighlightedContext';
export declare const createIsHighlighted: (highlightScope: HighlightScope | null | undefined, highlightedItem: HighlightItemData | null) => (input: HighlightItemData) => boolean;
