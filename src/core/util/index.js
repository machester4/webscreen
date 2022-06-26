/**
 * Transform a screen location
 * from percentage to pixels
 * @param {number} x - The X Coordinate
 * @param {number} y - The X Coordinate
 * @param {object} size - The screen size
 * @param {number} size.width
 * @param {number} size.height
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @returns {Point} - The location of the event
 */
export function transformFromPixelsToPercent(x, y, size) {
  const { width, height } = size;
  const percentX = parseFloat((x * 100) / width).toFixed(2);
  const percentY = parseFloat((y * 100) / height).toFixed(2);
  return { x: percentX, y: percentY };
}