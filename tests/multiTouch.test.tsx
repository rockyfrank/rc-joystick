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
