import './index.less';

import classnames from 'classnames';
import React from 'react';

import { Controller, ControllerWrapper } from './components';
import { useDirection, useStyleByRadius } from './hooks';
import { IJoystickProps, ILocation } from './typings';
import { getAngle } from './utils';

type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const Joystick: React.FC<IJoystickProps> = ({
  className = '',
  controllerClassName = '',
  baseRadius = 75,
  controllerRadius = 35,
  onChange,
}) => {
  const joystickDOM = React.useRef<HTMLDivElement | null>(null);
  const [angle, setAngle] = React.useState<number | undefined>();
  const [isControlling, setIsControlling] = React.useState<boolean>(false);
  const [distance, setDistance] = React.useState<number>(0);
  const direction = useDirection(angle);
  const [joystickLocation, setJoystickLocation] = React.useState<ILocation>({
    left: 0,
    top: 0,
  });

  const initialControllerLocation = React.useMemo<ILocation>(() => {
    const diff = baseRadius - controllerRadius;
    return {
      top: diff,
      left: diff,
    };
  }, [baseRadius, controllerRadius]);

  const [controllerLocation, setControllerLocation] =
    React.useState<ILocation>(initialControllerLocation);

  const centerLocation = React.useMemo<ILocation>(() => {
    return {
      left: joystickLocation.left + baseRadius,
      top: joystickLocation.top + baseRadius,
    };
  }, [joystickLocation, baseRadius]);

  // init joystick location
  React.useEffect(() => {
    if (!joystickDOM.current) return;
    const { top, left } = joystickDOM.current.getBoundingClientRect();
    setJoystickLocation({ top, left });
  }, []);

  const baseCls = classnames('react-joystick', className);
  const controllerCls = classnames(controllerClassName);

  const baseStyle = useStyleByRadius(baseRadius);

  const updateControllerLocation = React.useCallback(
    (location: Pick<MouseEvent, 'clientX' | 'clientY'>) => {
      const { clientX, clientY } = location;
      const diffX = clientX - centerLocation.left;
      const diffY = clientY - centerLocation.top;
      const distanceToCenter = Math.sqrt(diffX * diffX + diffY * diffY);
      setDistance(Math.min(distanceToCenter, baseRadius));
      if (distanceToCenter <= baseRadius) {
        setControllerLocation({
          left: Math.round(clientX - joystickLocation.left - controllerRadius),
          top: Math.round(clientY - joystickLocation.top - controllerRadius),
        });
      } else {
        const ratio = baseRadius / distanceToCenter;
        setControllerLocation({
          left: Math.round(diffX * ratio + baseRadius - controllerRadius),
          top: Math.round(diffY * ratio + baseRadius - controllerRadius),
        });
      }
      setAngle(getAngle(diffX, diffY));
    },
    [baseRadius, centerLocation, controllerRadius, joystickLocation],
  );

  const onMouseDown = React.useCallback<MouseEventHandler>(
    (e) => {
      setIsControlling(true);
      updateControllerLocation(e);
    },
    [updateControllerLocation],
  );

  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isControlling) return;
      updateControllerLocation(e);
    };

    const onMouseUp = () => {
      if (!isControlling) return;
      setIsControlling(false);
      setAngle(undefined);
      setDistance(0);
      setControllerLocation(initialControllerLocation);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateControllerLocation, isControlling, initialControllerLocation]);

  React.useEffect(() => {
    onChange?.({
      angle,
      direction,
      distance,
    });
  }, [direction, angle, distance, onChange]);

  return (
    <div className={baseCls} style={baseStyle} ref={joystickDOM}>
      <ControllerWrapper location={controllerLocation} onMouseDown={onMouseDown}>
        <Controller radius={controllerRadius} className={controllerCls} />
      </ControllerWrapper>
    </div>
  );
};

export default React.memo(Joystick);
