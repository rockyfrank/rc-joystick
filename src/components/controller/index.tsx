import './index.less';

import classnames from 'classnames';
import React from 'react';

import { useStyleByRadius } from '../../hooks';
import { IJoystickControllerProps } from '../../typings';

const Controller: React.FC<IJoystickControllerProps> = ({ className = '', radius }) => {
  const controllerCls = classnames('react-joystick-controller', className);

  const controllerStyle = useStyleByRadius(radius);

  return <div className={controllerCls} style={controllerStyle}></div>;
};

export default React.memo(Controller);
