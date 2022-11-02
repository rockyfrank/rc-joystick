import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Joystick from '../src';
import { Direction } from '../src/typings';

const Demo = () => {
  const [distance, setDistance] = React.useState<number>(0);
  const [angle, setAngle] = React.useState<number | undefined>();
  const [direction, setDirection] = React.useState<Direction>(Direction.C);

  return (
    <div className="demo-page">
      <div className="demo-item">
        <Joystick
          baseRadius={100}
          insideMode
          onDistanceChange={setDistance}
          onDirectionChange={setDirection}
          onAngleChange={setAngle}
        />
        <div>angle: {angle}</div>
        <div>distance: {distance}</div>
        <div>direction: {direction}</div>
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('app'));
