# 🕹️ rc-joystick

<p>
  <img src="https://img.shields.io/npm/v/rc-joystick">
  <img src="https://img.shields.io/bundlephobia/min/rc-joystick">
</p>
Joystick component built with React.
Click <a href="https://rockyfrank.github.io/rc-joystick/?path=/docs/example--docs">here</a> to see the storybook.

## 📦 Installation

### npm

```bash
npm install rc-joystick --save-dev
```

### yarn

```bash
yarn add rc-joystick
```

## 🔨 Basic usage

```tsx
import React from 'react';
import Joystick from 'rc-joystick';

export default () => {
  return <Joystick />;
};
```

## 📖 Documentation

### Joystick props interface


| Property | Description | Type | Default |
|----------|-------------|------|---------|
| className | Joystick container's extra className | `string` | - |
| controllerClassName | Joystick controller's extra className | `string` | - |
| baseRadius | Joystick base radius | `number` | 75 |
| controllerRadius | Joystick controller radius | `number` | 35 |
| insideMode | Controller will always be inside joystick's base if `insideMode` is true | `boolean` | false |
| directionCount | Direction count mode<br />**Five**: Center、Right、Top、Left、Bottom<br />**Nine**: Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight | `DirectionCount` | DirectionCount.Five |
| throttle | Trigger throttle (ms) | `number` | 0 |
| onChange | Trigger when the any of angle/direction/distance state is changing | `(val: IJoystickChangeValue) => void` | - |
| onAngleChange | Trigger when the angle state is changing | `(angle?: number) => void` | - |
| onDirectionChange | Trigger when the direction state is changing | `(direction: Direction \| keyof typeof Direction) => void` | - |
| onDistanceChange | Trigger when the distance state is changing | `(distance: number) => void` | - |
| renderController | Custom render controller | `(props: IJoystickControllerProps) => React.ReactNode` | - |
| renderArrows | Custom arrows render map | `ICustomArrowsRenderMap` | - |
| disabled | Disable joystick | `boolean` | false |
| onActiveChange | Trigger when the active state is changing | `(active: boolean) => void` | - |
| autoReset | Auto reset joystick to origin when joystick is inactive | `boolean` | false |
| lockX | Lock X axis | `boolean` | false |
| lockY | Lock Y axis | `boolean` | false |


### Joystick ref handlers


| Handler  | Description | Type |
|----------|-------------|------|
| reset | Reset joystick controller to origin | `() => void` |

