import React from 'react';
import { createRoot } from 'react-dom/client';
import JoyStick from '../src';

const root = createRoot(document.getElementById('app'));

const Demo = () => {
  return <JoyStick />;
};

root.render(<Demo />);
