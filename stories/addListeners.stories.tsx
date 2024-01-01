import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Joystick } from '../src/components/joystick';
import { DirectionCountMode, IJoystickChangeValue, IJoystickProps } from '../src/typings';

type IAddListenersDemo = Pick<IJoystickProps, 'throttle' | 'directionCountMode'>;

const AddListenersDemo: React.FC<IAddListenersDemo> = ({ throttle = 0, directionCountMode }) => {
  const [value, setValue] = React.useState<IJoystickChangeValue>();

  return (
    <div
      style={{
        width: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Joystick onChange={setValue} throttle={throttle} directionCountMode={directionCountMode} />
      <div style={{ width: '100%', userSelect: 'none' }}>
        <div style={{ marginTop: 48 }}>angle: {value?.angle}</div>
        <div>direction: {value?.direction}</div>
        <div>distance: {value?.distance}</div>
        {throttle > 0 && <div>throttle: {throttle}ms</div>}
      </div>
    </div>
  );
};

const meta: Meta<typeof AddListenersDemo> = {
  title: 'Example',
  component: AddListenersDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AddListenersDemo>;

export const AddListener: Story = {};
export const ThrottleTrigger: Story = {
  args: {
    throttle: 200,
  },
};

export const NineDirection: Story = {
  args: {
    directionCountMode: DirectionCountMode.Nine,
  },
};
