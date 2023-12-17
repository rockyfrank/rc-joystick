import { Direction, IRange } from '../typings';

const directionAngleMap: Record<Direction, IRange[]> = {
  [Direction.Center]: [
    {
      min: 0,
      max: 0,
    },
  ],
  [Direction.Right]: [
    {
      min: 0,
      max: 22.5,
    },
    {
      min: 337.5,
      max: 360,
    },
  ],
  [Direction.RightTop]: [
    {
      min: 22.5,
      max: 67.5,
    },
  ],
  [Direction.Top]: [
    {
      min: 67.5,
      max: 112.5,
    },
  ],
  [Direction.TopLeft]: [
    {
      min: 112.5,
      max: 157.5,
    },
  ],
  [Direction.Left]: [
    {
      min: 157.5,
      max: 202.5,
    },
  ],
  [Direction.LeftBottom]: [
    {
      min: 202.5,
      max: 247.5,
    },
  ],
  [Direction.Bottom]: [
    {
      min: 247.5,
      max: 292.5,
    },
  ],
  [Direction.BottomRight]: [
    {
      min: 292.5,
      max: 337.5,
    },
  ],
};

export const angleToDirection = (angle: number | undefined): Direction => {
  let direction = Direction.Center;
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
