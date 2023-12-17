import _throttle from 'lodash/throttle';
import React from 'react';

export const useThrottle = <T extends (...args: any) => any>(func?: T, throttle = 0) => {
  return React.useMemo(() => {
    if (func && throttle) {
      return _throttle(func, throttle);
    }
    return func;
  }, [func, throttle]);
};
