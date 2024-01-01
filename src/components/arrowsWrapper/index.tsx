import './index.less';

import React from 'react';

import { Direction, ICustomArrowsRenderMap, IJoystickProps } from '../../typings';
import { Down, Left, Right, Up } from '../arrows';

export interface IArrowsWrapperProps extends Pick<IJoystickProps, 'renderArrows'> {
  direction: Direction;
}

const builtInArrowsRenderMap: Required<ICustomArrowsRenderMap> = {
  [Direction.Left]: Left,
  [Direction.Right]: Right,
  [Direction.Top]: Up,
  [Direction.Bottom]: Down,
};

export const ArrowsWrapper: React.FC<IArrowsWrapperProps> = (props) => {
  const { renderArrows } = props;
  const renderMap = React.useMemo((): Required<ICustomArrowsRenderMap> => {
    return Object.assign(builtInArrowsRenderMap, renderArrows || {});
  }, [renderArrows]);

  const arrowsClassNameMap = React.useMemo(() => {
    return {
      [Direction.Left]: 'arrow-left',
      [Direction.Right]: 'arrow-right',
      [Direction.Top]: 'arrow-up',
      [Direction.Bottom]: 'arrow-down',
    };
  }, []);

  const arrows = React.useMemo(() => {
    return [Direction.Top, Direction.Right, Direction.Bottom, Direction.Left].map(
      (direction: keyof Required<ICustomArrowsRenderMap>) => {
        const Arrow = renderMap[direction];
        return Arrow ? (
          <div className={arrowsClassNameMap[direction]} key={direction}>
            <Arrow isActive={props.direction === direction} />
          </div>
        ) : null;
      },
    );
  }, [arrowsClassNameMap, props.direction, renderMap]);

  return <div className="arrows-wrapper">{arrows}</div>;
};
