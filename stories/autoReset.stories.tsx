import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Joystick } from '../src/components/joystick';
import { IJoystickProps, IJoystickRef } from '../src/typings';

type IAutoRest = Pick<IJoystickProps, 'autoReset'>;

const AutoRest: React.FC<IAutoRest> = ({ autoReset }) => {
  const ref = React.useRef<IJoystickRef>(null);
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
      <Joystick autoReset={autoReset} ref={ref} />
      <div style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => ref.current?.reset()}>
        Click me to reset joystick
      </div>
    </div>
  );
};

const meta: Meta<typeof AutoRest> = {
  title: 'Example',
  component: AutoRest,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AutoRest>;

export const AutoReset: Story = {
  args: {
    autoReset: true,
  },
};
