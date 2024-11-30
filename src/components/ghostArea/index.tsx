import './index.less';

import classNames from 'classnames';
import React, { MouseEventHandler, PropsWithChildren, TouchEventHandler } from 'react';

import { GhostAreaInstanceContext, GhostContext } from '../../context';
import { IGhostContextValue, ILocation } from '../../typings';
import { isMobile } from '../../utils/env';

export interface IGhostAreaProps extends Pick<React.CSSProperties, 'width' | 'height'> {
  className?: string;
}

export const GhostArea: React.FC<PropsWithChildren<IGhostAreaProps>> = ({
  children,
  className,
  width,
  height,
}) => {
  const area = React.useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = React.useState<ILocation | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const onDragStart = React.useCallback((clientX: number, clientY: number) => {
    if (!area.current) return;
    const { left, top, width: w, height: h } = area.current.getBoundingClientRect();
    const nextLeft = clientX - left;
    const nextTop = clientY - top;
    const isValid = nextTop >= 0 && nextTop <= h && w >= 0 && nextLeft <= w;

    if (!isValid) return;
    setActiveLocation({
      left: nextLeft,
      top: nextTop,
    });
    setIsActive(true);
  }, []);

  const onMouseDown = React.useCallback<MouseEventHandler>(
    (e) => {
      if (isMobile()) return;
      onDragStart(e.clientX, e.clientY);
    },
    [onDragStart],
  );

  const onTouchStart = React.useCallback<TouchEventHandler>(
    ({ touches }) => {
      if (!isMobile()) return;
      const touch = touches[0];
      onDragStart(touch.clientX, touch.clientY);
    },
    [onDragStart],
  );

  const ghostProviderValue = React.useMemo((): IGhostContextValue => {
    return {
      isActive,
      ghost: true,
    };
  }, [isActive]);

  const ghostAreaInstanceValue = React.useMemo(() => {
    return {
      getGhostArea: () => area.current,
    };
  }, []);

  const onMouseUp = React.useCallback(() => {
    setIsActive(false);
  }, []);

  React.useEffect(() => {
    const eventName = isMobile() ? 'touchend' : 'mouseup';
    document.addEventListener(eventName, onMouseUp);

    return () => {
      document.removeEventListener(eventName, onMouseUp);
    };
  }, [onMouseUp]);

  const cls = React.useMemo(() => {
    return classNames('react-joystick-ghost-area', className);
  }, [className]);

  const style = React.useMemo((): React.CSSProperties => {
    return { height, width };
  }, [height, width]);

  return (
    <div
      ref={area}
      className={cls}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={style}
    >
      <div
        className="react-joystick-wrapper"
        style={{ left: activeLocation?.left, top: activeLocation?.top }}
      >
        <GhostAreaInstanceContext.Provider value={ghostAreaInstanceValue}>
          <GhostContext.Provider value={ghostProviderValue}>{children}</GhostContext.Provider>
        </GhostAreaInstanceContext.Provider>
      </div>
    </div>
  );
};
