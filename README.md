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

| prop                | description                                                                                                                                                              | type                                             | default             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ------------------- |
| baseRadius          | Joystick's base radius                                                                                                                                                   | `number`                                         | 75                  |
| controllerRadius    | Joystick controller's radius                                                                                                                                             | `number`                                         | 35                  |
| className           | Joystick container's extra className                                                                                                                                     | `string`                                         | -                   |
| controllerClassName | Joystick controller's extra className                                                                                                                                    | `string`                                         | -                   |
| insideMode          | Controller will always be inside joystick's base if `insideMode` is true                                                                                                 | `boolean`                                        | false               |
| throttle            | Throttle time for all change events (in milliseconds)                                                                                                                    | `number`                                         | 0                   |
| directionCount      | `DirectionCount.Five` for: Center、Right、Top、Left、Bottom <br> `DirectionCount.Nine` for: Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight | `DirectionCount`                                 | DirectionCount.Five |
| onChange            | Trigger when the any of angle/direction/distance state is changing                                                                                                       | `(value: IJoystickChangeValue) => void`          | -                   |
| onAngleChange       | Trigger when the angle state is changing (receive `undefined` when direction is `Center`)                                                                                | `(angle?: number) => void`                       | -                   |
| onDirectionChange   | Trigger when the direction state is changing                                                                                                                             | `(direction: Direction) => void`                 | -                   |
| onDistanceChange    | Trigger when the distance state is changing                                                                                                                              | `(distance: number) => void`                     | -                   |
| renderController    | Custom render controller                                                                                                                                                 | `(props: IJoystickControllerProps) => ReactNode` | -                   |
| renderArrows        | custom arrows render map                                                                                                                                                 | `ICustomArrowsRenderMap`                         | -                   |
