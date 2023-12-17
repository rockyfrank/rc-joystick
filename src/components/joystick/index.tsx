import './index.less';

import classnames from 'classnames';
import React from 'react';

import { useThrottle } from '../../hooks/useThrottle';
import { IJoystickProps, ILocation } from '../../typings';
import { angleToDirection, getAngle, getDOMLocation, getStyleByRadius } from '../../utils';
import { Controller } from '../controller';
import { ControllerWrapper } from '../controllerWrapper';

type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

export const Joystick: React.FC<IJoystickProps> = React.memo((props) => {
  const {
    className = '',
    controllerClassName = '',
    baseRadius = 75,
    controllerRadius = 35,
    insideMode,
    throttle = 0,
    renderController,
  } = props;
  const joystickDOM = React.useRef<HTMLDivElement | null>(null);
  const [angle, setAngle] = React.useState<number | undefined>();
  const [distance, setDistance] = React.useState<number>(0);
  const direction = angleToDirection(angle);
  const joystickLocation = React.useRef<ILocation>({
    left: 0,
    top: 0,
  });
  const isControlling = React.useRef(false);
  const [controllerTransition, setControllerTransition] = React.useState(0);

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

  const updateJoystickLocation = React.useCallback(() => {
    joystickLocation.current = getDOMLocation(joystickDOM.current);
  }, []);

  const baseCls = classnames('react-joystick', className);
  const controllerCls = classnames('react-joystick-controller', controllerClassName);

  const baseStyle = getStyleByRadius(baseRadius);

  const updateControllerLocation = React.useCallback(
    (e: MouseEvent) => {
      const centerLocation = {
        left: joystickLocation.current.left + baseRadius,
        top: joystickLocation.current.top + baseRadius,
      };
      const { clientX, clientY } = e;
      const diffX = clientX - centerLocation.left;
      const diffY = clientY - centerLocation.top;
      const distanceToCenter = Math.sqrt(diffX * diffX + diffY * diffY);
      setDistance(Math.min(distanceToCenter, outerRadius));
      if (distanceToCenter <= outerRadius) {
        setControllerLocation({
          left: clientX - joystickLocation.current.left - controllerRadius,
          top: clientY - joystickLocation.current.top - controllerRadius,
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
    [insideMode, outerRadius, controllerRadius, baseRadius, joystickLocation],
  );

  const onMouseDown = React.useCallback<MouseEventHandler>(
    (e) => {
      setControllerTransition(0);
      isControlling.current = true;
      updateJoystickLocation();
      updateControllerLocation(e.nativeEvent);
    },
    [updateControllerLocation, updateJoystickLocation],
  );

  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isControlling.current) return;
      updateControllerLocation(e);
    };

    const onMouseUp = () => {
      if (!isControlling.current) return;
      isControlling.current = false;
      setAngle(undefined);
      setDistance(0);
      setControllerLocation(initialControllerLocation);
      setControllerTransition(200);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateControllerLocation, initialControllerLocation]);

  const onChange = useThrottle(props.onChange, throttle);
  const onAngleChange = useThrottle(props.onAngleChange, throttle);
  const onDirectionChange = useThrottle(props.onDirectionChange, throttle);
  const onDistanceChange = useThrottle(props.onDistanceChange, throttle);

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

  const controller = React.useMemo(() => {
    if (renderController) {
      return renderController({
        radius: controllerRadius,
        className: controllerCls,
      });
    }

    return <Controller radius={controllerRadius} className={controllerCls} />;
  }, [controllerCls, controllerRadius, renderController]);

  return (
    <div className={baseCls} style={baseStyle} ref={joystickDOM}>
      <ControllerWrapper
        location={controllerLocation}
        onMouseDown={onMouseDown}
        transition={controllerTransition}
      >
        {controller}
      </ControllerWrapper>
    </div>
  );
});
