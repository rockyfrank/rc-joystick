import { Direction, DirectionCount } from './enums';

export interface IJoystickChangeValue {
  direction: Direction;
  angle: number | undefined;
  distance: number;
}

export interface IJoystickProps {
  /**
   * @description Joystick container's extra className
   */
  className?: string;
  /**
   * @description Joystick controller's extra className
   */
  controllerClassName?: string;
  /**
   * @description Joystick base radius
   * @default 75
   */
  baseRadius?: number;
  /**
   * @description Joystick controller radius
   * @default 35
   */
  controllerRadius?: number;
  /**
   * @description Controller will always be inside joystick's base if `insideMode` is true
   * @default false
   */
  insideMode?: boolean;
  /**
   * @description Direction count mode
   * **Five**: Center、Right、Top、Left、Bottom
   * **Nine**: Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight
   * @default DirectionCount.Five
   */
  directionCount?: DirectionCount;
  /**
   * @description Trigger throttle (ms)
   * @default 0
   */
  throttle?: number;
  /**
   * @description Trigger when the any of angle/direction/distance state is changing
   */
  onChange?: (val: IJoystickChangeValue) => void;
  /**
   * @description Trigger when the angle state is changing
   */
  onAngleChange?: (angle?: number) => void;
  /**
   * @description Trigger when the direction state is changing
   */
  onDirectionChange?: (direction: Direction | keyof typeof Direction) => void;
  /**
   * @description Trigger when the distance state is changing
   */
  onDistanceChange?: (distance: number) => void;
  /**
   * @description Custom render controller
   */
  renderController?: (props: IJoystickControllerProps) => React.ReactNode;
  /**
   * @description Custom arrows render map
   */
  renderArrows?: ICustomArrowsRenderMap;
  /**
   * @description Disable joystick
   * @default false
   */
  disabled?: boolean;
  /**
   * @description Trigger when the active state is changing
   */
  onActiveChange?: (active: boolean) => void;
  /**
   * @description Auto reset joystick to origin when joystick is inactive
   * @default false
   */
  autoReset?: boolean;
  /**
   * @description Lock X axis
   * @default false
   */
  lockX?: boolean;
  /**
   * @description Lock Y axis
   * @default false
   */
  lockY?: boolean;
}

export interface IBaseArrowProps {
  isActive: boolean;
}

export interface ICustomArrowsRenderMap {
  [Direction.Top]?: React.FC<IBaseArrowProps>;
  [Direction.Right]?: React.FC<IBaseArrowProps>;
  [Direction.Bottom]?: React.FC<IBaseArrowProps>;
  [Direction.Left]?: React.FC<IBaseArrowProps>;
}

export interface IJoystickControllerProps {
  radius: number;
  className?: string;
}

export interface IControllerWrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  location: ILocation;
  /**
   * Transition time for controller to return to origin (unit: ms)
   */
  transition?: number;
}

export interface ILocation {
  top: number;
  left: number;
}

export interface IRange {
  min: number;
  max: number;
}

export interface IGhostContextValue {
  isActive: boolean;
  ghost: boolean;
}

export interface IJoystickRef {
  /**
   * @description Reset joystick to origin
   */
  reset: () => void;
}
