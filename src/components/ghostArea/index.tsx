import './index.less';

import classNames from 'classnames';
import React, { MouseEventHandler, TouchEventHandler } from 'react';

import {
  GhostAreaInstanceContext,
  GhostAreaManagementContext,
  GhostContext,
  SlotIndexContext,
} from '../../context';
import { IGhostContextValue, ILocation } from '../../typings';
import { isMobile } from '../../utils/env';

interface SlotState {
  touchId: number | null;
  location: ILocation | null;
}

export interface IGhostAreaProps extends Pick<React.CSSProperties, 'width' | 'height'> {
  className?: string;
  /**
   * @description Maximum number of simultaneously active joysticks inside the area.
   * Each finger touch (up to this limit) spawns its own joystick instance.
   * @default 1
   */
  maxJoystickCount?: number;
  children?: React.ReactNode | ((index: number) => React.ReactNode);
}

export const GhostArea: React.FC<IGhostAreaProps> = ({
  children,
  className,
  width,
  height,
  maxJoystickCount = 1,
}) => {
  const area = React.useRef<HTMLDivElement>(null);

  // Synchronously updated before the event bubbles to document listeners in Joystick.
  const touchAssignments = React.useRef<Map<number, number>>(new Map());

  const [slots, setSlots] = React.useState<SlotState[]>(() => {
    return Array.from({ length: maxJoystickCount }, () => ({ touchId: null, location: null }));
  });

  // Reset slots when maxJoystickCount changes.
  React.useEffect(() => {
    setSlots(Array.from({ length: maxJoystickCount }, () => ({ touchId: null, location: null })));
    touchAssignments.current.clear();
  }, [maxJoystickCount]);

  const getLocation = React.useCallback((clientX: number, clientY: number): ILocation | null => {
    if (!area.current) return null;
    const { left, top, width: w, height: h } = area.current.getBoundingClientRect();
    const nextLeft = clientX - left;
    const nextTop = clientY - top;
    if (nextTop < 0 || nextTop > h || nextLeft < 0 || nextLeft > w) return null;
    return { left: nextLeft, top: nextTop };
  }, []);

  const onMouseDown = React.useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (isMobile()) return;
      const location = getLocation(e.clientX, e.clientY);
      if (!location) return;
      // Mouse always uses slot 0.
      setSlots((prev) => {
        const next = [...prev];
        next[0] = { touchId: null, location };
        return next;
      });
    },
    [getLocation],
  );

  const onTouchStart = React.useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      if (!isMobile()) return;
      const updates: Array<{ slotIndex: number; touchId: number; location: ILocation }> = [];
      const usedSlots = new Set(touchAssignments.current.values());

      for (const touch of Array.from(e.changedTouches)) {
        if (touchAssignments.current.has(touch.identifier)) continue;

        // Find the first free slot index.
        let emptySlot = -1;
        for (let i = 0; i < maxJoystickCount; i++) {
          if (!usedSlots.has(i)) {
            emptySlot = i;
            usedSlots.add(i);
            break;
          }
        }
        if (emptySlot === -1) break;

        const location = getLocation(touch.clientX, touch.clientY);
        if (!location) continue;

        // Update the ref synchronously so Joystick's document listener (which fires
        // during the same event's bubble phase) can read the assignment immediately.
        touchAssignments.current.set(touch.identifier, emptySlot);
        updates.push({ slotIndex: emptySlot, touchId: touch.identifier, location });
      }

      if (updates.length > 0) {
        setSlots((prev) => {
          const next = [...prev];
          for (const { slotIndex, touchId, location } of updates) {
            next[slotIndex] = { touchId, location };
          }
          return next;
        });
      }
    },
    [getLocation, maxJoystickCount],
  );

  const onMouseUp = React.useCallback(() => {
    setSlots((prev) => {
      const next = [...prev];
      next[0] = { touchId: null, location: null };
      return next;
    });
  }, []);

  React.useEffect(() => {
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isMobile()) return;
      const clearedSlots: number[] = [];
      for (const touch of Array.from(e.changedTouches)) {
        const slotIndex = touchAssignments.current.get(touch.identifier);
        if (slotIndex === undefined) continue;
        touchAssignments.current.delete(touch.identifier);
        clearedSlots.push(slotIndex);
      }
      if (clearedSlots.length > 0) {
        setSlots((prev) => {
          const next = [...prev];
          for (const slotIndex of clearedSlots) {
            next[slotIndex] = { touchId: null, location: null };
          }
          return next;
        });
      }
    };

    if (isMobile()) {
      document.addEventListener('touchend', handleTouchEnd);
      return () => document.removeEventListener('touchend', handleTouchEnd);
    } else {
      document.addEventListener('mouseup', onMouseUp);
      return () => document.removeEventListener('mouseup', onMouseUp);
    }
  }, [onMouseUp]);

  const ghostAreaInstanceValue = React.useMemo(() => ({ getGhostArea: () => area.current }), []);

  const managementContextValue = React.useMemo(() => ({ touchAssignments }), []);

  const cls = React.useMemo(() => classNames('react-joystick-ghost-area', className), [className]);
  const style = React.useMemo((): React.CSSProperties => ({ height, width }), [height, width]);

  const renderChildren = (slotIndex: number): React.ReactNode => {
    if (typeof children === 'function') {
      return (children as (i: number) => React.ReactNode)(slotIndex);
    }
    return children;
  };

  return (
    <div
      ref={area}
      className={cls}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={style}
    >
      <GhostAreaInstanceContext.Provider value={ghostAreaInstanceValue}>
        <GhostAreaManagementContext.Provider value={managementContextValue}>
          {slots.map((slot, slotIndex) => {
            const ghostContextValue: IGhostContextValue = {
              ghost: true,
              isActive: slot.touchId !== null || (slotIndex === 0 && slot.location !== null),
            };
            return (
              <GhostContext.Provider key={slotIndex} value={ghostContextValue}>
                <SlotIndexContext.Provider value={slotIndex}>
                  <div
                    className="react-joystick-wrapper"
                    style={{ left: slot.location?.left, top: slot.location?.top }}
                  >
                    {renderChildren(slotIndex)}
                  </div>
                </SlotIndexContext.Provider>
              </GhostContext.Provider>
            );
          })}
        </GhostAreaManagementContext.Provider>
      </GhostAreaInstanceContext.Provider>
    </div>
  );
};
