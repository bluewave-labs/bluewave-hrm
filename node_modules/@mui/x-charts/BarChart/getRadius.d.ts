type GetRadiusData = {
    hasNegative: boolean;
    hasPositive: boolean;
    borderRadius?: number;
    layout?: 'vertical' | 'horizontal';
};
type GetRadiusCorner = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
/**
 * Returns if the corner should have a radius or not based on the layout and the data.
 * @param {GetRadiusCorner} corner The corner to check.
 * @param {GetRadiusData} cornerData The data for the corner.
 * @returns {number} The radius for the corner.
 */
export declare const getRadius: (corner: GetRadiusCorner, { hasNegative, hasPositive, borderRadius, layout }: GetRadiusData) => number;
export {};
