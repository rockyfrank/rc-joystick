import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Joystick } from '../src/components/joystick';
import { IJoystickProps, IJoystickRef } from '../src/typings';

type IMultiJoystick = Pick<IJoystickProps, 'autoReset'>;

const MultiJoystickDemo: React.FC<IMultiJoystick> = () => {
  const ref1 = React.useRef<IJoystickRef>(null);
  const ref2 = React.useRef<IJoystickRef>(null);
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 40,
      }}
    >
      <Joystick ref={ref1} />
      <Joystick ref={ref2} />
    </div>
  );
};

const meta: Meta<typeof MultiJoystickDemo> = {
  title: 'MultiJoystick',
  component: MultiJoystickDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MultiJoystickDemo>;

export const MultiJoystick: Story = {};
