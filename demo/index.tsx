import React from 'react';
import { createRoot } from 'react-dom/client';

import Joystick from '../src';

const root = createRoot(document.getElementById('app'));

const Demo = () => {
  return <Joystick />;
};

root.render(<Demo />);
