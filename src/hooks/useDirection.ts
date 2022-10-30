import { Direction, IRange } from '../typings';

const directionAngleMap: Record<Direction, IRange[]> = {
  [Direction.C]: [
    {
      min: 0,
      max: 0,
    },
  ],
  [Direction.R]: [
    {
      min: 0,
      max: 22.5,
    },
    {
      min: 337.5,
      max: 360,
    },
  ],
  [Direction.RT]: [
    {
      min: 22.5,
      max: 67.5,
    },
  ],
  [Direction.T]: [
    {
      min: 67.5,
      max: 112.5,
    },
  ],
  [Direction.TL]: [
    {
      min: 112.5,
      max: 157.5,
    },
  ],
  [Direction.L]: [
    {
      min: 157.5,
      max: 202.5,
    },
  ],
  [Direction.LB]: [
    {
      min: 202.5,
      max: 247.5,
    },
  ],
  [Direction.B]: [
    {
      min: 247.5,
      max: 292.5,
    },
  ],
  [Direction.BR]: [
    {
      min: 292.5,
      max: 337.5,
    },
  ],
};

export const useDirection = (angle: number | undefined): Direction => {
  let direction = Direction.C;
  if (angle === undefined) return direction;

  for (const key of Object.keys(directionAngleMap)) {
    const ranges = directionAngleMap[key as Direction];
    const isInclude = ranges.some(({ min, max }) => {
      return angle >= min && angle < max;
    });
    if (isInclude) {
      direction = key as Direction;
      break;
    }
  }

  return direction;
};
