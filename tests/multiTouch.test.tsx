import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Joystick, { GhostArea } from '../src';

jest.mock('../src/utils/env', () => ({
  isMobile: () => true,
}));

function createTouch(
  target: EventTarget,
  identifier: number,
  clientX: number,
  clientY: number,
): Touch {
  return new Touch({
    identifier,
    target,
    clientX,
    clientY,
    pageX: clientX,
    pageY: clientY,
    screenX: clientX,
    screenY: clientY,
    radiusX: 1,
    radiusY: 1,
    rotationAngle: 0,
    force: 1,
  });
}

function dispatchTouchStart(changedTouches: Touch[], allTouches?: Touch[]) {
  const event = new TouchEvent('touchstart', {
    bubbles: true,
    cancelable: true,
    changedTouches,
    touches: allTouches ?? changedTouches,
  });
  document.dispatchEvent(event);
}

function dispatchTouchMove(touches: Touch[]) {
  const event = new TouchEvent('touchmove', {
    bubbles: true,
    cancelable: true,
    changedTouches: touches,
    touches,
  });
  document.dispatchEvent(event);
}

function dispatchTouchEnd(changedTouches: Touch[], remainingTouches: Touch[]) {
  const event = new TouchEvent('touchend', {
    bubbles: true,
    cancelable: true,
    changedTouches,
    touches: remainingTouches,
  });
  document.dispatchEvent(event);
}

describe('Multi-instance touch support', () => {
  it('should render two joystick instances', () => {
    const { container } = render(
      <div>
        <Joystick />
        <Joystick />
      </div>,
    );
    const joysticks = container.querySelectorAll('.react-joystick');
    expect(joysticks).toHaveLength(2);
    const controllers = container.querySelectorAll('.react-joystick-controller');
    expect(controllers).toHaveLength(2);
  });

  it('should only activate the touched joystick', () => {
    const onActiveChange1 = jest.fn();
    const onActiveChange2 = jest.fn();

    const { container } = render(
      <div>
        <Joystick onActiveChange={onActiveChange1} />
        <Joystick onActiveChange={onActiveChange2} />
      </div>,
    );

    const controllers = container.querySelectorAll('.react-joystick-controller');
    const ctrl1 = controllers[0];

    act(() => {
      const touch = createTouch(ctrl1, 0, 100, 100);
      dispatchTouchStart([touch]);
    });

    expect(onActiveChange1).toHaveBeenCalledWith(true);
    expect(onActiveChange2).not.toHaveBeenCalled();
  });

  it('should track separate touches for two joysticks simultaneously', () => {
    const onActiveChange1 = jest.fn();
    const onActiveChange2 = jest.fn();

    const { container } = render(
      <div>
        <Joystick onActiveChange={onActiveChange1} />
        <Joystick onActiveChange={onActiveChange2} />
      </div>,
    );

    const controllers = container.querySelectorAll('.react-joystick-controller');
    const ctrl1 = controllers[0];
    const ctrl2 = controllers[1];

    const touch1 = createTouch(ctrl1, 0, 100, 100);

    act(() => {
      dispatchTouchStart([touch1]);
    });

    expect(onActiveChange1).toHaveBeenCalledWith(true);
    expect(onActiveChange2).not.toHaveBeenCalled();

    const touch2 = createTouch(ctrl2, 1, 300, 300);

    act(() => {
      dispatchTouchStart([touch2], [touch1, touch2]);
    });

    expect(onActiveChange2).toHaveBeenCalledWith(true);
  });

  it('should only move the joystick matching the touch identifier', () => {
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();

    const { container } = render(
      <div>
        <Joystick onChange={onChange1} />
        <Joystick onChange={onChange2} />
      </div>,
    );

    const controllers = container.querySelectorAll('.react-joystick-controller');
    const ctrl1 = controllers[0];
    const ctrl2 = controllers[1];

    const touch1 = createTouch(ctrl1, 0, 100, 100);
    const touch2 = createTouch(ctrl2, 1, 300, 300);

    act(() => {
      dispatchTouchStart([touch1]);
    });
    act(() => {
      dispatchTouchStart([touch2], [touch1, touch2]);
    });

    onChange1.mockClear();
    onChange2.mockClear();

    const movedTouch1 = createTouch(ctrl1, 0, 130, 100);
    act(() => {
      dispatchTouchMove([movedTouch1, touch2]);
    });

    expect(onChange1).toHaveBeenCalled();
    const lastCall1 = onChange1.mock.calls[onChange1.mock.calls.length - 1][0];
    expect(lastCall1.distance).toBeGreaterThan(0);
    expect(lastCall1.angle).toBeDefined();
  });

  it('should not deactivate joystick 2 when releasing joystick 1', () => {
    const onActiveChange1 = jest.fn();
    const onActiveChange2 = jest.fn();

    const { container } = render(
      <div>
        <Joystick onActiveChange={onActiveChange1} />
        <Joystick onActiveChange={onActiveChange2} />
      </div>,
    );

    const controllers = container.querySelectorAll('.react-joystick-controller');
    const ctrl1 = controllers[0];
    const ctrl2 = controllers[1];

    const touch1 = createTouch(ctrl1, 0, 100, 100);
    const touch2 = createTouch(ctrl2, 1, 300, 300);

    act(() => {
      dispatchTouchStart([touch1]);
    });
    act(() => {
      dispatchTouchStart([touch2], [touch1, touch2]);
    });

    onActiveChange1.mockClear();
    onActiveChange2.mockClear();

    act(() => {
      dispatchTouchEnd([touch1], [touch2]);
    });

    expect(onActiveChange1).toHaveBeenCalledWith(false);
    expect(onActiveChange2).not.toHaveBeenCalled();
  });

  it('should ignore a second touch on the same joystick', () => {
    const onActiveChange = jest.fn();

    const { container } = render(<Joystick onActiveChange={onActiveChange} />);

    const ctrl = container.querySelector('.react-joystick-controller')!;
    const touch1 = createTouch(ctrl, 0, 100, 100);

    act(() => {
      dispatchTouchStart([touch1]);
    });

    expect(onActiveChange).toHaveBeenCalledTimes(1);
    expect(onActiveChange).toHaveBeenCalledWith(true);

    const touch2 = createTouch(ctrl, 1, 120, 120);
    act(() => {
      dispatchTouchStart([touch2], [touch1, touch2]);
    });

    expect(onActiveChange).toHaveBeenCalledTimes(1);
  });

  it('should allow reactivation after touch release', () => {
    const onActiveChange = jest.fn();

    const { container } = render(<Joystick onActiveChange={onActiveChange} />);

    const ctrl = container.querySelector('.react-joystick-controller')!;
    const touch1 = createTouch(ctrl, 0, 100, 100);

    act(() => {
      dispatchTouchStart([touch1]);
    });

    expect(onActiveChange).toHaveBeenCalledWith(true);

    act(() => {
      dispatchTouchEnd([touch1], []);
    });

    expect(onActiveChange).toHaveBeenCalledWith(false);

    onActiveChange.mockClear();

    const touch2 = createTouch(ctrl, 2, 100, 100);
    act(() => {
      dispatchTouchStart([touch2]);
    });

    expect(onActiveChange).toHaveBeenCalledWith(true);
  });

  it('should call preventDefault on touchstart and touchmove to prevent zoom', () => {
    const { container } = render(<Joystick />);
    const ctrl = container.querySelector('.react-joystick-controller')!;

    const touch = createTouch(ctrl, 0, 100, 100);
    const startEvent = new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true,
      changedTouches: [touch],
      touches: [touch],
    });

    const startPreventDefault = jest.spyOn(startEvent, 'preventDefault');

    act(() => {
      document.dispatchEvent(startEvent);
    });

    expect(startPreventDefault).toHaveBeenCalled();

    const movedTouch = createTouch(ctrl, 0, 130, 100);
    const moveEvent = new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      changedTouches: [movedTouch],
      touches: [movedTouch],
    });

    const movePreventDefault = jest.spyOn(moveEvent, 'preventDefault');

    act(() => {
      document.dispatchEvent(moveEvent);
    });

    expect(movePreventDefault).toHaveBeenCalled();
  });

  it('should not respond to touch on unrelated elements', () => {
    const onActiveChange = jest.fn();

    render(
      <div>
        <div className="unrelated">other content</div>
        <Joystick onActiveChange={onActiveChange} />
      </div>,
    );

    const unrelated = document.querySelector('.unrelated')!;
    const touch = createTouch(unrelated, 0, 100, 100);

    act(() => {
      dispatchTouchStart([touch]);
    });

    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it('should not respond to touch when disabled', () => {
    const onActiveChange = jest.fn();

    const { container } = render(<Joystick onActiveChange={onActiveChange} disabled />);

    const ctrl = container.querySelector('.react-joystick-controller')!;
    const touch = createTouch(ctrl, 0, 100, 100);

    act(() => {
      dispatchTouchStart([touch]);
    });

    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it('should early return touchmove when no active touch', () => {
    render(<Joystick />);
    const ctrl = document.querySelector('.react-joystick-controller')!;

    const touch = createTouch(ctrl, 99, 100, 100);
    const moveEvent = new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      changedTouches: [touch],
      touches: [touch],
    });
    const spy = jest.spyOn(moveEvent, 'preventDefault');

    act(() => {
      document.dispatchEvent(moveEvent);
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should early return touchend when no active touch', () => {
    const onActiveChange = jest.fn();
    render(<Joystick onActiveChange={onActiveChange} />);
    const ctrl = document.querySelector('.react-joystick-controller')!;

    const touch = createTouch(ctrl, 99, 100, 100);

    act(() => {
      dispatchTouchEnd([touch], []);
    });

    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it('should ignore touchmove with non-matching identifier', () => {
    const onChange = jest.fn();
    const { container } = render(<Joystick onChange={onChange} />);
    const ctrl = container.querySelector('.react-joystick-controller')!;

    const touch = createTouch(ctrl, 0, 100, 100);
    act(() => {
      dispatchTouchStart([touch]);
    });

    onChange.mockClear();

    const wrongTouch = createTouch(ctrl, 99, 130, 100);
    const moveEvent = new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      changedTouches: [wrongTouch],
      touches: [wrongTouch],
    });
    const spy = jest.spyOn(moveEvent, 'preventDefault');

    act(() => {
      document.dispatchEvent(moveEvent);
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should ignore touchend with non-matching identifier', () => {
    const onActiveChange = jest.fn();
    const { container } = render(<Joystick onActiveChange={onActiveChange} />);
    const ctrl = container.querySelector('.react-joystick-controller')!;

    const touch = createTouch(ctrl, 0, 100, 100);
    act(() => {
      dispatchTouchStart([touch]);
    });

    onActiveChange.mockClear();

    const wrongTouch = createTouch(ctrl, 99, 100, 100);
    act(() => {
      dispatchTouchEnd([wrongTouch], [touch]);
    });

    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it('should ignore mouse events in mobile mode', () => {
    const onActiveChange = jest.fn();
    const { container } = render(<Joystick onActiveChange={onActiveChange} />);
    const ctrl = container.querySelector('.react-joystick-controller')!;

    fireEvent.mouseDown(ctrl);
    expect(onActiveChange).not.toHaveBeenCalled();
  });
});

function mockGhostAreaBounds(el: HTMLElement) {
  el.getBoundingClientRect = jest.fn(() => ({
    left: 0,
    top: 0,
    width: 400,
    height: 400,
    right: 400,
    bottom: 400,
    x: 0,
    y: 0,
    toJSON: () => {},
  }));
}

function touchstartOnElement(el: HTMLElement, touches: Touch[]) {
  const event = new TouchEvent('touchstart', {
    bubbles: true,
    cancelable: true,
    changedTouches: touches,
    touches,
  });
  el.dispatchEvent(event);
}

describe('GhostArea touch support (mobile)', () => {
  it('should handle touch start on ghost area and activate joystick', () => {
    const onActiveChange = jest.fn();
    const { container } = render(
      <GhostArea width={400} height={400}>
        <Joystick onActiveChange={onActiveChange} />
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    expect(ghostArea).toBeTruthy();

    // GhostArea's own onTouchStart handler (React event, uses fireEvent on the element)
    // Need to set up the ghost area's getBoundingClientRect for validation
    ghostArea.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 400,
      height: 400,
      right: 400,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Trigger ghost area's React onTouchStart
    act(() => {
      const touchEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [createTouch(ghostArea, 0, 200, 200)],
        changedTouches: [createTouch(ghostArea, 0, 200, 200)],
      });
      ghostArea.dispatchEvent(touchEvent);
    });

    expect(container.querySelector<HTMLDivElement>('.react-joystick')).toHaveClass('ghost-active');

    // Now trigger joystick's document-level touchstart with ghost area as target
    const touch = createTouch(ghostArea, 0, 200, 200);
    act(() => {
      dispatchTouchStart([touch]);
    });

    expect(onActiveChange).toHaveBeenCalledWith(true);

    // Touch end
    act(() => {
      dispatchTouchEnd([touch], []);
    });

    // Ghost area deactivation via touchend on document
    act(() => {
      document.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
    });

    expect(container.querySelector<HTMLDivElement>('.react-joystick')).not.toHaveClass(
      'ghost-active',
    );
  });
});

describe('GhostArea multi-joystick (maxJoystickCount)', () => {
  it('should render maxJoystickCount slot wrappers', () => {
    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={3}>
        <Joystick />
      </GhostArea>,
    );

    const wrappers = container.querySelectorAll('.react-joystick-wrapper');
    expect(wrappers).toHaveLength(3);

    const joysticks = container.querySelectorAll('.react-joystick');
    expect(joysticks).toHaveLength(3);
  });

  it('should activate each joystick slot at its touch location', () => {
    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        <Joystick />
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    const joysticks = container.querySelectorAll<HTMLDivElement>('.react-joystick');

    // First finger
    act(() => {
      touchstartOnElement(ghostArea, [createTouch(ghostArea, 0, 100, 150)]);
    });

    expect(joysticks[0]).toHaveClass('ghost-active');
    expect(joysticks[1]).not.toHaveClass('ghost-active');

    // Second finger
    act(() => {
      touchstartOnElement(ghostArea, [createTouch(ghostArea, 1, 300, 250)]);
    });

    expect(joysticks[0]).toHaveClass('ghost-active');
    expect(joysticks[1]).toHaveClass('ghost-active');

    // Verify wrapper positions match touch coords
    const wrappers = container.querySelectorAll<HTMLDivElement>('.react-joystick-wrapper');
    expect((wrappers[0] as HTMLDivElement).style.left).toBe('100px');
    expect((wrappers[0] as HTMLDivElement).style.top).toBe('150px');
    expect((wrappers[1] as HTMLDivElement).style.left).toBe('300px');
    expect((wrappers[1] as HTMLDivElement).style.top).toBe('250px');
  });

  it('should call onActiveChange only for the touched slot', () => {
    const cb0 = jest.fn();
    const cb1 = jest.fn();

    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        {(index) => <Joystick onActiveChange={index === 0 ? cb0 : cb1} />}
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    // Activate slot 0 via touch 0
    const touch0 = createTouch(ghostArea, 0, 100, 100);
    act(() => {
      touchstartOnElement(ghostArea, [touch0]);
    });
    act(() => {
      dispatchTouchStart([touch0]);
    });

    expect(cb0).toHaveBeenCalledWith(true);
    expect(cb1).not.toHaveBeenCalled();

    // Activate slot 1 via touch 1
    const touch1 = createTouch(ghostArea, 1, 300, 300);
    act(() => {
      touchstartOnElement(ghostArea, [touch1]);
    });
    act(() => {
      dispatchTouchStart([touch1], [touch0, touch1]);
    });

    expect(cb1).toHaveBeenCalledWith(true);
  });

  it('should not exceed maxJoystickCount active slots', () => {
    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        <Joystick />
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    act(() => {
      touchstartOnElement(ghostArea, [createTouch(ghostArea, 0, 100, 100)]);
    });
    act(() => {
      touchstartOnElement(ghostArea, [createTouch(ghostArea, 1, 200, 200)]);
    });
    // Third touch — should be ignored (maxJoystickCount = 2)
    act(() => {
      touchstartOnElement(ghostArea, [createTouch(ghostArea, 2, 300, 300)]);
    });

    const activeJoysticks = container.querySelectorAll('.react-joystick.ghost-active');
    expect(activeJoysticks).toHaveLength(2);
  });

  it('should deactivate only the released slot', () => {
    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        <Joystick />
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    const touch0 = createTouch(ghostArea, 0, 100, 100);
    const touch1 = createTouch(ghostArea, 1, 300, 300);

    act(() => {
      touchstartOnElement(ghostArea, [touch0]);
    });
    act(() => {
      touchstartOnElement(ghostArea, [touch1]);
    });

    const joysticks = container.querySelectorAll<HTMLDivElement>('.react-joystick');
    expect(joysticks[0]).toHaveClass('ghost-active');
    expect(joysticks[1]).toHaveClass('ghost-active');

    // Release touch 0
    act(() => {
      dispatchTouchEnd([touch0], [touch1]);
    });

    expect(joysticks[0]).not.toHaveClass('ghost-active');
    expect(joysticks[1]).toHaveClass('ghost-active');
  });

  it('should deactivate joystick via onActiveChange when touch ends', () => {
    const cb0 = jest.fn();
    const cb1 = jest.fn();

    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        {(index) => <Joystick onActiveChange={index === 0 ? cb0 : cb1} />}
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    const touch0 = createTouch(ghostArea, 0, 100, 100);
    const touch1 = createTouch(ghostArea, 1, 300, 300);

    act(() => {
      touchstartOnElement(ghostArea, [touch0]);
    });
    act(() => {
      dispatchTouchStart([touch0]);
    });
    act(() => {
      touchstartOnElement(ghostArea, [touch1]);
    });
    act(() => {
      dispatchTouchStart([touch1], [touch0, touch1]);
    });

    cb0.mockClear();
    cb1.mockClear();

    // Release only touch 1
    act(() => {
      dispatchTouchEnd([touch1], [touch0]);
    });

    expect(cb1).toHaveBeenCalledWith(false);
    expect(cb0).not.toHaveBeenCalled();
  });

  it('should reuse a freed slot for a subsequent touch', () => {
    const cb0 = jest.fn();

    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={1}>
        {(index) => <Joystick onActiveChange={index === 0 ? cb0 : undefined} />}
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    const touch0 = createTouch(ghostArea, 0, 100, 100);

    act(() => {
      touchstartOnElement(ghostArea, [touch0]);
    });
    act(() => {
      dispatchTouchStart([touch0]);
    });

    expect(cb0).toHaveBeenCalledWith(true);

    act(() => {
      dispatchTouchEnd([touch0], []);
    });

    expect(cb0).toHaveBeenCalledWith(false);
    cb0.mockClear();

    // New touch should claim slot 0 again
    const touch1 = createTouch(ghostArea, 1, 200, 200);
    act(() => {
      touchstartOnElement(ghostArea, [touch1]);
    });
    act(() => {
      dispatchTouchStart([touch1]);
    });

    expect(cb0).toHaveBeenCalledWith(true);
  });

  it('should support function children passing slot index', () => {
    const receivedIndices: number[] = [];

    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        {(index) => {
          receivedIndices.push(index);
          return <Joystick />;
        }}
      </GhostArea>,
    );

    // Both slots are rendered at mount; indices should be 0 and 1
    expect(container.querySelectorAll('.react-joystick')).toHaveLength(2);
    expect(receivedIndices).toEqual(expect.arrayContaining([0, 1]));
  });

  it('should move only the joystick matching the touch', () => {
    const onChange0 = jest.fn();
    const onChange1 = jest.fn();

    const { container } = render(
      <GhostArea width={400} height={400} maxJoystickCount={2}>
        {(index) => <Joystick onChange={index === 0 ? onChange0 : onChange1} />}
      </GhostArea>,
    );

    const ghostArea = container.querySelector<HTMLDivElement>('.react-joystick-ghost-area')!;
    mockGhostAreaBounds(ghostArea);

    const touch0 = createTouch(ghostArea, 0, 100, 100);
    const touch1 = createTouch(ghostArea, 1, 300, 300);

    act(() => {
      touchstartOnElement(ghostArea, [touch0]);
    });
    act(() => {
      dispatchTouchStart([touch0]);
    });
    act(() => {
      touchstartOnElement(ghostArea, [touch1]);
    });
    act(() => {
      dispatchTouchStart([touch1], [touch0, touch1]);
    });

    onChange0.mockClear();
    onChange1.mockClear();

    // Move only touch 1
    const movedTouch1 = createTouch(ghostArea, 1, 350, 300);
    act(() => {
      dispatchTouchMove([touch0, movedTouch1]);
    });

    expect(onChange1).toHaveBeenCalled();
    const lastCall = onChange1.mock.calls[onChange1.mock.calls.length - 1][0];
    expect(lastCall.distance).toBeGreaterThan(0);

    // onChange0 should not have been called by this move
    expect(onChange0).not.toHaveBeenCalled();
  });
});
