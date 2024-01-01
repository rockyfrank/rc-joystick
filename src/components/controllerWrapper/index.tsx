import './index.less';

import React, { forwardRef } from 'react';

import { IControllerWrapperProps } from '../../typings';

export const ControllerWrapper: React.FC<IControllerWrapperProps> = React.memo(
  forwardRef(({ children, location, transition, style = {}, ...wrapperProps }, ref) => {
    const wrapperStyle = React.useMemo(() => {
      return {
        ...style,
        transform: `translate(${location.left}px, ${location.top}px)`,
        ...(transition && {
          transition: `transform ${transition / 1000}s`,
        }),
      };
    }, [style, location, transition]);

    return (
      <div className="controller-wrapper" style={wrapperStyle} {...wrapperProps} ref={ref}>
        {children}
      </div>
    );
  }),
);
