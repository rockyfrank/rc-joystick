import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Joystick, { Direction, DirectionCount, GhostArea, IJoystickRef } from '../src';

describe('Joystick test cases ', () => {
  it('should render correctly', () => {
    render(<Joystick />);
    const joystick = document.querySelector('.react-joystick');
    const controller = document.querySelector('.react-joystick-controller');
    const arrowsWrapper = document.querySelector('.arrows-wrapper');
    expect(joystick).toBeInTheDocument();
    expect(joystick).toHaveStyle({
      width: '150px',
      height: '150px',
    });
    expect(controller).toHaveStyle({
      width: '70px',
      height: '70px',
    });
    expect(arrowsWrapper).toBeInTheDocument();
    expect(arrowsWrapper?.children.length).toBe(4);
  });

  it('should render custom className', () => {
    render(<Joystick className="custom-joystick" />);
    expect(document.querySelector('.react-joystick.custom-joystick')).toBeInTheDocument();
  });

  it('should render custom controller className', () => {
    render(<Joystick controllerClassName="custom-controller" />);
    expect(
      document.querySelector('.react-joystick-controller.custom-controller'),
    ).toBeInTheDocument();
  });

  it('should render custom radius', () => {
    render(<Joystick baseRadius={100} controllerRadius={50} />);
    const joystick = document.querySelector('.react-joystick');
    const controller = document.querySelector('.react-joystick-controller');
    expect(joystick).toHaveStyle({
      width: '200px',
      height: '200px',
    });
    expect(controller).toHaveStyle({
      width: '100px',
      height: '100px',
    });
  });

  it('should render custom arrows', () => {
    render(
      <Joystick
        renderArrows={{
          [Direction.Right]: () => <div>Custom Right Arrow</div>,
        }}
      />,
    );
    expect(screen.getByText('Custom Right Arrow')).toBeInTheDocument();
  });

  it('should render custom controller', () => {
    render(<Joystick renderController={() => <div>Custom Controller</div>} />);
    expect(screen.getByText('Custom Controller')).toBeInTheDocument();
  });

  it('should be transformed correctly', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 200, y: 35 }, target: controller },
    ]);
    const controllerWrapper = document.querySelector('.controller-wrapper');
    expect(controllerWrapper).toHaveStyle({
      transform: 'translate(115px, 40px)',
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        distance: 75,
        angle: 0,
        direction: 'Right',
      }),
    );
  });

  it('should trigger onChange with five different direction', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} directionCount={DirectionCount.Five} />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    const directions: Array<{
      end: { x: number; y: number };
      direction: Direction;
    }> = [
      {
        end: { x: 35, y: 35 },
        direction: Direction.Center,
      },
      {
        end: { x: 70, y: 35 },
        direction: Direction.Right,
      },
      {
        end: { x: 71, y: 0 },
        direction: Direction.Right,
      },
      {
        end: { x: 69, y: 0 },
        direction: Direction.Top,
      },
      {
        end: { x: 35, y: 0 },
        direction: Direction.Top,
      },
      {
        end: { x: 1, y: 0 },
        direction: Direction.Top,
      },
      {
        end: { x: 0, y: 1 },
        direction: Direction.Left,
      },
      {
        end: { x: 0, y: 35 },
        direction: Direction.Left,
      },
      {
        end: { x: 0, y: 69 },
        direction: Direction.Left,
      },
      {
        end: { x: 1, y: 70 },
        direction: Direction.Bottom,
      },
      {
        end: { x: 35, y: 70 },
        direction: Direction.Bottom,
      },
      {
        end: { x: 69, y: 70 },
        direction: Direction.Bottom,
      },
      {
        end: { x: 70, y: 69 },
        direction: Direction.Right,
      },
    ];

    for (const direction of directions) {
      await user.pointer([
        { coords: { x: 35, y: 35 }, target: controller },
        { keys: '[MouseLeft>]', target: controller },
        { coords: direction.end, target: controller },
      ]);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          direction: direction.direction,
        }),
      );
    }
  });

  it('should trigger onChange with nine different direction', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} directionCount={DirectionCount.Nine} />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    const directions: Array<{
      end: { x: number; y: number };
      direction: Direction;
    }> = [
      {
        end: { x: 35, y: 35 },
        direction: Direction.Center,
      },
      {
        end: { x: 70, y: 35 },
        direction: Direction.Right,
      },
      {
        end: { x: 70, y: 0 },
        direction: Direction.RightTop,
      },
      {
        end: { x: 35, y: 0 },
        direction: Direction.Top,
      },
      {
        end: { x: 0, y: 0 },
        direction: Direction.TopLeft,
      },
      {
        end: { x: 0, y: 35 },
        direction: Direction.Left,
      },
      {
        end: { x: 0, y: 70 },
        direction: Direction.LeftBottom,
      },
      {
        end: { x: 35, y: 70 },
        direction: Direction.Bottom,
      },
      {
        end: { x: 70, y: 70 },
        direction: Direction.BottomRight,
      },
    ];

    for (const direction of directions) {
      await user.pointer([
        { coords: { x: 35, y: 35 }, target: controller },
        { keys: '[MouseLeft>]', target: controller },
        { coords: direction.end, target: controller },
      ]);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          direction: direction.direction,
        }),
      );
    }
  });

  it('should render inside mode', async () => {
    render(<Joystick insideMode />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 200, y: 35 }, target: controller },
    ]);
    const controllerWrapper = document.querySelector('.controller-wrapper');
    expect(controllerWrapper).toHaveStyle({
      transform: 'translate(80px, 40px)',
    });
  });

  it('should trigger onChanges correctly', async () => {
    const onChange = jest.fn();
    const onAngleChange = jest.fn();
    const onActiveChange = jest.fn();
    const onDirectionChange = jest.fn();
    const onDistanceChange = jest.fn();
    render(
      <Joystick
        onChange={onChange}
        onAngleChange={onAngleChange}
        onDirectionChange={onDirectionChange}
        onDistanceChange={onDistanceChange}
        onActiveChange={onActiveChange}
      />,
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onAngleChange).toHaveBeenCalledTimes(1);
    expect(onDirectionChange).toHaveBeenCalledTimes(1);
    expect(onDistanceChange).toHaveBeenCalledTimes(1);
    expect(onActiveChange).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        distance: 0,
        angle: undefined,
        direction: 'Center',
      }),
    );
    expect(onAngleChange).toHaveBeenCalledWith(undefined);
    expect(onDirectionChange).toHaveBeenCalledWith('Center');
    expect(onDistanceChange).toHaveBeenCalledWith(0);

    const user = userEvent.setup();
    const controller = document.querySelector('.react-joystick-controller')!;
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 35, y: 0 }, target: controller },
    ]);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        distance: 35,
        angle: 90,
        direction: 'Top',
      }),
    );
    expect(onAngleChange).toHaveBeenCalledWith(90);
    expect(onDirectionChange).toHaveBeenCalledWith('Top');
    expect(onDistanceChange).toHaveBeenCalledWith(35);
    expect(onActiveChange).toHaveBeenCalledWith(true);
    await user.pointer([{ keys: '[/MouseLeft]' }]);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        distance: 0,
        angle: undefined,
        direction: 'Center',
      }),
    );
    expect(onAngleChange).toHaveBeenCalledWith(undefined);
    expect(onDirectionChange).toHaveBeenCalledWith('Center');
    expect(onDistanceChange).toHaveBeenCalledWith(0);
    expect(onActiveChange).toHaveBeenCalledWith(false);
  });

  it('should handle disabled state', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} disabled />);
    const controller = document.querySelector('.react-joystick-controller')!;
    expect(document.querySelector('.react-joystick.react-joystick-disabled')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 50, y: 50 }, target: controller },
      { keys: '[/MouseLeft]' },
    ]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should properly throttle callbacks', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} throttle={100} />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();

    // 模拟快速移动摇杆
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 35, y: 0 }, target: controller },
    ]);

    // 立即检查，应该只调用一次
    expect(onChange).toHaveBeenCalledTimes(1);

    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 0, y: 0 }, target: controller },
    ]);
    // 由于节流，回调不应该立即被调用
    expect(onChange).toHaveBeenCalledTimes(1);

    // 等待节流时间过去
    setTimeout(() => {
      // 节流时间后，回调应该被调用
      expect(onChange).toHaveBeenCalledTimes(2);
    }, 150);
  });

  it('should lock x axis', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} lockX />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 0, y: 70 }, target: controller },
    ]);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        direction: 'Bottom',
        distance: 35,
      }),
    );
  });

  it('should lock y axis', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} lockY />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 70, y: 0 }, target: controller },
    ]);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        direction: 'Right',
        distance: 35,
      }),
    );
  });

  it('should lock both x and y axis', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} lockX lockY />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 0, y: 0 }, target: controller },
    ]);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: 'Center',
      }),
    );
  });

  it('should auto reset when joystick is inactive', async () => {
    const onChange = jest.fn();
    render(<Joystick onChange={onChange} autoReset />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 0, y: 0 }, target: controller },
      { keys: '[/MouseLeft]' },
    ]);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: 'Center',
        distance: 0,
        angle: undefined,
      }),
    );
  });

  it('should not auto reset when joystick is inactive when set autoReset to false', async () => {
    const onChange = jest.fn();
    const joystickRef = React.createRef<IJoystickRef>();
    render(<Joystick onChange={onChange} autoReset={false} ref={joystickRef} />);
    const controller = document.querySelector('.react-joystick-controller')!;
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 35, y: 35 }, target: controller },
      { keys: '[MouseLeft>]', target: controller },
      { coords: { x: 70, y: 35 }, target: controller },
      { keys: '[/MouseLeft]' },
    ]);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: 'Right',
        distance: 35,
        angle: 0,
      }),
    );
    act(() => {
      joystickRef.current?.reset();
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: 'Center',
        distance: 0,
        angle: undefined,
      }),
    );
  });

  it('should render ghost mode correctly', async () => {
    render(
      <GhostArea width={400} height={400}>
        <Joystick />
      </GhostArea>,
    );
    const ghostArea = document.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    expect(ghostArea).toBeInTheDocument();
    expect(ghostArea).toHaveStyle({
      width: '400px',
      height: '400px',
    });

    expect(document.querySelector<HTMLDivElement>('.react-joystick')).toHaveClass('ghost');
    const user = userEvent.setup();
    await user.pointer([
      { coords: { x: 0, y: 0 }, target: ghostArea },
      { keys: '[MouseLeft>]', target: ghostArea },
    ]);
    expect(document.querySelector<HTMLDivElement>('.react-joystick')).toHaveClass('ghost-active');
    await user.pointer([{ keys: '[/MouseLeft]' }]);
    expect(document.querySelector<HTMLDivElement>('.react-joystick')).not.toHaveClass(
      'ghost-active',
    );
    await user.pointer([
      { coords: { x: -10, y: -10 }, target: ghostArea },
      { keys: '[MouseLeft>]', target: ghostArea },
    ]);
    expect(document.querySelector<HTMLDivElement>('.react-joystick')).not.toHaveClass(
      'ghost-active',
    );
  });
});
