import './index.less';

import classnames from 'classnames';
import React from 'react';

import { GhostAreaInstanceContext, GhostContext } from '../../context';
import { useThrottle } from '../../hooks/useThrottle';
import { DirectionCount, IJoystickProps, ILocation } from '../../typings';
import { angleToDirection, getAngle, getStyleByRadius } from '../../utils';
import { isMobile } from '../../utils/env';
import { ArrowsWrapper } from '../arrowsWrapper';
import { Controller } from '../controller';
import { ControllerWrapper } from '../controllerWrapper';

export const Joystick: React.FC<IJoystickProps> = React.memo((props) => {
  const {
    className = '',
    controllerClassName = '',
    baseRadius = 75,
    controllerRadius = 35,
    insideMode,
    throttle = 0,
    renderController,
    directionCount = DirectionCount.Five,
  } = props;
  const [angle, setAngle] = React.useState<number | undefined>();
  const [distance, setDistance] = React.useState<number>(0);
  const controllerWrapper = React.useRef<HTMLDivElement | null>(null);

  const direction = React.useMemo(() => {
    return angleToDirection(directionCount, angle);
  }, [angle, directionCount]);

  const touchPoint = React.useRef<ILocation>({
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
  const { ghost, isActive } = React.useContext(GhostContext);
  const { getGhostArea } = React.useContext(GhostAreaInstanceContext);
  const baseCls = classnames('react-joystick', className, {
    ghost,
    'ghost-active': isActive,
  });
  const controllerCls = classnames('react-joystick-controller', controllerClassName);

  const baseStyle = getStyleByRadius(baseRadius);

  const updateControllerLocation = React.useCallback(
    (clientX: number, clientY: number) => {
      const diffX = clientX - touchPoint.current.left;
      const diffY = clientY - touchPoint.current.top;
      const distanceToCenter = Math.sqrt(diffX * diffX + diffY * diffY);
      setDistance(Math.min(distanceToCenter, outerRadius));
      if (distanceToCenter <= outerRadius) {
        setControllerLocation({
          left: diffX + (baseRadius - controllerRadius),
          top: diffY + (baseRadius - controllerRadius),
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
    [outerRadius, baseRadius, controllerRadius, insideMode],
  );

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent | Touch) => {
      const isClickGhostArea = e.target === getGhostArea();
      const isClickController =
        (e.target as HTMLDivElement)?.parentNode === controllerWrapper.current;

      if (isClickGhostArea || isClickController) {
        isControlling.current = true;
        setControllerTransition(0);
        touchPoint.current = {
          left: e.clientX,
          top: e.clientY,
        };
        updateControllerLocation(e.clientX, e.clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent | Touch) => {
      if (!isControlling.current) return;
      updateControllerLocation(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      if (!isControlling.current) return;
      isControlling.current = false;
      setAngle(undefined);
      setDistance(0);
      setControllerLocation(initialControllerLocation);
      setControllerTransition(200);
    };

    const onMouseDown = (e: MouseEvent | Touch) => {
      if (isMobile()) return;
      handleMouseDown(e);
    };

    const onMouseMove = (e: MouseEvent | Touch) => {
      if (isMobile()) return;
      handleMouseMove(e);
    };

    const onMouseUp = () => {
      if (isMobile()) return;
      handleMouseUp();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isMobile()) return;
      handleMouseDown(e.touches[0]);
    };

    const onTouchMove = ({ touches }: TouchEvent) => {
      if (!isMobile()) return;
      handleMouseMove(touches[0]);
    };

    const onTouchEnd = () => {
      if (!isMobile()) return;
      handleMouseUp();
    };

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateControllerLocation, initialControllerLocation, getGhostArea]);

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
    <div className={baseCls} style={baseStyle}>
      <ArrowsWrapper renderArrows={props.renderArrows} direction={direction} />
      <ControllerWrapper
        location={controllerLocation}
        transition={controllerTransition}
        ref={controllerWrapper}
      >
        {controller}
      </ControllerWrapper>
    </div>
  );
});
