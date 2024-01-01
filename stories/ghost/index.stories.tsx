import './index.less';

import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Joystick, { GhostArea } from '../../src/index';

const GhostModeDemo = () => {
  return (
    <GhostArea className="ghost-mode-demo" width={400} height={400}>
      <Joystick />
    </GhostArea>
  );
};

const meta: Meta<typeof GhostModeDemo> = {
  title: 'Example',
  component: GhostModeDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof GhostModeDemo>;

export const GhostMode: Story = {};
