/**
 * Returns the ratio of the arc bounding box and its center.
 * @param startAngle The start angle (in deg)
 * @param endAngle The end angle (in deg)
 */
export declare function getArcRatios(startAngle: number, endAngle: number): {
    cx: number;
    cy: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
export declare function getAvailableRadius(cx: number, cy: number, width: number, height: number, { minX, maxX, minY, maxY, }: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}): number;
