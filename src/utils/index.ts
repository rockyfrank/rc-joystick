import { ILocation } from '../typings';

export const getAngle = (diffX: number, diffY: number): number | undefined => {
  const distanceToCenter = Math.sqrt(diffX * diffX + diffY * diffY);
  if (distanceToCenter === 0) return undefined;

  const angle = Math.acos(diffX / distanceToCenter);
  return diffY > 0 ? 360 - (angle * 180) / Math.PI : (angle * 180) / Math.PI;
};

export const getDOMLocation = (dom: HTMLDivElement | null): ILocation => {
  if (!dom) {
    return {
      top: 0,
      left: 0,
    };
  }

  const { top, left } = dom.getBoundingClientRect();
  return {
    top,
    left,
  };
};

export const getStyleByRadius = (radius: number) => {
  const diameter = radius * 2;
  return {
    width: diameter,
    height: diameter,
  };
};

export { angleToDirection } from './angleToDirection';
