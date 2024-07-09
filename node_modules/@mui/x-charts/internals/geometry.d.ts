/**
 * Return the minimal translation along the x-axis to avoid overflow of a rectangle of a given width, height, and rotation.
 * This assumes that all rectangles have the same height and angle between -90 and 90.
 * Otherwise it would be problematic because you need the height/width of the next rectangle to do the correct computation.
 * @param width the side along the x-axis.
 * @param height the side along the y-axis.
 * @param angle the rotation in degrees.
 */
export declare function getMinXTranslation(width: number, height: number, angle?: number): number;
