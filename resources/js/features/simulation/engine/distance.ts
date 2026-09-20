export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function clampPosition(
  x: number,
  y: number,
  minX: number = 4,
  maxX: number = 96,
  minY: number = 10,
  maxY: number = 90
): { x: number; y: number } {
  return {
    x: Math.min(maxX, Math.max(minX, x)),
    y: Math.min(maxY, Math.max(minY, y)),
  };
}