import './index.less';

import classNames from 'classnames';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

import { GhostContext } from '../../context';
import { IGhostContextValue, ILocation } from '../../typings';

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

  const onMouseDown = React.useCallback<MouseEventHandler>((e) => {
    if (!area.current) return;
    const { left, top, width: w, height: h } = area.current.getBoundingClientRect();
    const nextLeft = e.clientX - left;
    const nextTop = e.clientY - top;
    const isValid = nextTop >= 0 && nextTop <= h && w >= 0 && nextLeft <= w;

    if (!isValid) return;
    setActiveLocation({
      left: nextLeft,
      top: nextTop,
    });
    setIsActive(true);
  }, []);

  const ghostProviderValue = React.useMemo((): IGhostContextValue => {
    return {
      isActive,
      ghost: true,
      getGhostArea: () => area.current,
    };
  }, [isActive]);

  const onMouseUp = React.useCallback(() => {
    setIsActive(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);

  const cls = React.useMemo(() => {
    return classNames('react-joystick-ghost-area', className);
  }, [className]);

  const style = React.useMemo((): React.CSSProperties => {
    return { height, width };
  }, [height, width]);

  return (
    <div ref={area} className={cls} onMouseDown={onMouseDown} style={style}>
      <div
        className="react-joystick-wrapper"
        style={{ left: activeLocation?.left, top: activeLocation?.top }}
      >
        <GhostContext.Provider value={ghostProviderValue}>{children}</GhostContext.Provider>
      </div>
    </div>
  );
};
