import './index.less';

import React from 'react';

import { IControllerWrapperProps } from '../../typings';

const ControllerWrapper: React.FC<IControllerWrapperProps> = ({
  children,
  location,
  style = {},
  ...wrapperProps
}) => {
  const wrapperStyle = React.useMemo(() => {
    return {
      ...style,
      transform: `translate(${location.left}px, ${location.top}px)`,
    };
  }, [style, location]);

  return (
    <div className="controller-wrapper" style={wrapperStyle} {...wrapperProps}>
      {children}
    </div>
  );
};

export default React.memo(ControllerWrapper);
