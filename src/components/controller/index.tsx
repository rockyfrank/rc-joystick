import './index.less';

import React from 'react';

import { IJoystickControllerProps } from '../../typings';
import { getStyleByRadius } from '../../utils';

export const Controller: React.FC<IJoystickControllerProps> = React.memo(
  ({ className = '', radius }) => {
    const controllerStyle = getStyleByRadius(radius);

    return <div className={className} style={controllerStyle}></div>;
  },
);
