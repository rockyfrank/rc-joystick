import { Direction, IRange } from '../typings';
import { DirectionCount } from './../typings/enums';

const nineDirectionAngleMap: Record<Direction, IRange[]> = {
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

const fiveDirectionAngleMap: Record<
  Exclude<
    Direction,
    Direction.BottomRight | Direction.LeftBottom | Direction.RightTop | Direction.TopLeft
  >,
  IRange[]
> = {
  [Direction.Center]: [
    {
      min: 0,
      max: 0,
    },
  ],
  [Direction.Top]: [
    {
      min: 45,
      max: 135,
    },
  ],
  [Direction.Left]: [
    {
      min: 135,
      max: 225,
    },
  ],
  [Direction.Bottom]: [
    {
      min: 225,
      max: 315,
    },
  ],
  [Direction.Right]: [
    {
      min: 315,
      max: 360,
    },
    {
      min: 0,
      max: 45,
    },
  ],
};

export const angleToDirection = (mode: DirectionCount, angle: number | undefined): Direction => {
  let direction = Direction.Center;
  if (angle === undefined) return direction;

  const directionAngleMap =
    mode === DirectionCount.Five ? fiveDirectionAngleMap : nineDirectionAngleMap;

  for (const key of Object.keys(directionAngleMap)) {
    const ranges = directionAngleMap[key as keyof typeof directionAngleMap];
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
