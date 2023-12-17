import './index.less';

import classnames from 'classnames';
import React from 'react';

import { IJoystickControllerProps } from '../../typings';
import { getStyleByRadius } from '../../utils';

export const Controller: React.FC<IJoystickControllerProps> = React.memo(
  ({ className = '', radius }) => {
    const controllerCls = classnames('react-joystick-controller', className);

    const controllerStyle = getStyleByRadius(radius);

    return <div className={controllerCls} style={controllerStyle}></div>;
  },
);
