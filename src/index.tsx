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
  insideMode,
  onChange,
  onAngleChange,
  onDirectionChange,
  onDistanceChange,
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
  const outerRadius = React.useMemo(() => {
    return insideMode ? baseRadius - controllerRadius : baseRadius;
  }, [insideMode, baseRadius, controllerRadius]);

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
      setDistance(Math.min(distanceToCenter, outerRadius));
      if (distanceToCenter <= outerRadius) {
        setControllerLocation({
          left: clientX - joystickLocation.left - controllerRadius,
          top: clientY - joystickLocation.top - controllerRadius,
        });
      } else {
        const ratio = outerRadius / distanceToCenter;
        const diff = insideMode ? outerRadius : outerRadius - controllerRadius;
        setControllerLocation({
          left: diffX * ratio + diff,
          top: diffY * ratio + diff,
        });
      }
      setAngle(getAngle(diffX, diffY));
    },
    [insideMode, outerRadius, centerLocation, controllerRadius, joystickLocation],
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

  React.useEffect(() => {
    onAngleChange?.(angle);
  }, [angle, onAngleChange]);

  React.useEffect(() => {
    onDirectionChange?.(direction);
  }, [direction, onDirectionChange]);

  React.useEffect(() => {
    onDistanceChange?.(distance);
  }, [distance, onDistanceChange]);

  return (
    <div className={baseCls} style={baseStyle} ref={joystickDOM}>
      <ControllerWrapper location={controllerLocation} onMouseDown={onMouseDown}>
        <Controller radius={controllerRadius} className={controllerCls} />
      </ControllerWrapper>
    </div>
  );
};

export default React.memo(Joystick);
