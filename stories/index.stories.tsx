import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Joystick } from '../src/components/joystick';

const meta: Meta<typeof Joystick> = {
  title: 'Example',
  component: Joystick,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Joystick>;

export const Basic: Story = {};

export const InsideMode: Story = {
  args: {
    insideMode: true,
  },
};

export const CustomSize: Story = {
  args: {
    baseRadius: 30,
    controllerRadius: 20,
  },
};

export const CustomRenderController: Story = {
  args: {
    renderController: ({ radius, className }) => {
      return (
        <div
          style={{
            height: radius * 2,
            width: radius * 2,
            opacity: 0.7,
          }}
          className={className}
        />
      );
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange(val) {
      console.log('onChange', val);
    },
  },
};

export const LockX: Story = {
  args: {
    lockX: true,
  },
};

export const LockY: Story = {
  args: {
    lockY: true,
  },
};
