export const getAngle = (diffX: number, diffY: number): number | undefined => {
  const distanceToCenter = Math.sqrt(diffX * diffX + diffY * diffY);
  if (distanceToCenter === 0) return undefined;

  const angle = Math.acos(diffX / distanceToCenter);
  return diffY > 0 ? 360 - (angle * 180) / Math.PI : (angle * 180) / Math.PI;
};
