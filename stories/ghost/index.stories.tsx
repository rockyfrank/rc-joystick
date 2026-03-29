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

const MultiGhostDemo = () => {
  const [outputs, setOutputs] = React.useState<string[]>(['–', '–']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <GhostArea className="ghost-mode-demo" width={400} height={400} maxJoystickCount={2}>
        {(index) => (
          <Joystick
            onChange={(val) =>
              setOutputs((prev) => {
                const next = [...prev];
                next[index] = `angle: ${val.angle?.toFixed(0) ?? '–'}  dist: ${val.distance.toFixed(
                  0,
                )}`;
                return next;
              })
            }
          />
        )}
      </GhostArea>
      {outputs.map((text, i) => (
        <div key={i} style={{ fontFamily: 'monospace', fontSize: 13 }}>
          Joystick {i + 1}: {text}
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof GhostModeDemo> = {
  title: 'Ghost',
  component: GhostModeDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof GhostModeDemo>;

export const GhostMode: Story = {};

export const MultiJoystick: StoryObj<typeof MultiGhostDemo> = {
  render: () => <MultiGhostDemo />,
};
