import { Direction } from './enums';

export interface IChangeValue {
  direction: Direction;
  angle: number | undefined;
  distance: number;
}

export interface IJoystickProps {
  className?: string;
  controllerClassName?: string;
  baseRadius?: number;
  controllerRadius?: number;
  onChange?: (val: IChangeValue) => void;
  onAngleChange?: (angle?: number) => void;
  onDirectionChange?: (direction: Direction) => void;
  onDistanceChange?: (distance: number) => void;
}

export interface IJoystickControllerProps {
  radius: number;
  className?: string;
}

export interface IControllerWrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  location: ILocation;
}

export interface ILocation {
  top: number;
  left: number;
}

export interface IRange {
  min: number;
  max: number;
}
